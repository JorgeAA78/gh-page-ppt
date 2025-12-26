import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { getDatabase } from "./firebase";
import { GameMove, whoWins } from "./game";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post("/api/users", async (req: Request, res: Response) => {
  const { name } = req.body as { name?: string };
  if (!name) return res.status(400).json({ error: "name is required" });

  const userId = nanoid();
  const db = getDatabase();
  await db.ref(`users/${userId}`).set({ name, createdAt: Date.now() });
  res.json({ userId });
});

app.post("/api/rooms", async (req: Request, res: Response) => {
  const { userId, name } = req.body as { userId?: string; name?: string };
  if (!userId) return res.status(400).json({ error: "userId is required" });
  if (!name) return res.status(400).json({ error: "name is required" });

  const db = getDatabase();

  const roomId = nanoid();
  const shortCode = String(Math.floor(1000 + Math.random() * 9000));

  await db.ref(`roomCodes/${shortCode}`).set(roomId);
  await db.ref(`rooms/${roomId}`).set({
    createdAt: Date.now(),
    ownerId: userId,
    status: "waiting",
    players: {
      [userId]: { name, online: true },
    },
    score: {
      [userId]: 0,
    },
    matchScore: {
      [userId]: 0,
    },
    matchFinished: false,
    matchWinnerId: null,
    currentGame: null,
    lastResult: null,
  });

  res.json({ roomId, shortCode });
});

app.post("/api/rooms/join", async (req: Request, res: Response) => {
  const { userId, name, shortCode } = req.body as {
    userId?: string;
    name?: string;
    shortCode?: string;
  };

  if (!userId) return res.status(400).json({ error: "userId is required" });
  if (!name) return res.status(400).json({ error: "name is required" });
  if (!shortCode) return res.status(400).json({ error: "shortCode is required" });

  const db = getDatabase();
  const roomIdSnap = await db.ref(`roomCodes/${shortCode}`).get();
  const roomId = roomIdSnap.val();
  if (!roomId) return res.status(404).json({ error: "room not found" });

  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnap = await roomRef.get();
  const room = roomSnap.val();
  if (!room) return res.status(404).json({ error: "room not found" });

  const players = room.players || {};
  const playerIds = Object.keys(players);
  if (!players[userId] && playerIds.length >= 2) {
    return res.status(409).json({ error: "room is full" });
  }

  await roomRef.child(`players/${userId}`).set({ name, online: true });
  await roomRef
    .child(`score/${userId}`)
    .transaction((cur: number | null) => (typeof cur === "number" ? cur : 0));
  await roomRef
    .child(`matchScore/${userId}`)
    .transaction((cur: number | null) => (typeof cur === "number" ? cur : 0));

  res.json({ roomId });
});

app.post("/api/rooms/:roomId/start", async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { userId } = req.body as { userId?: string };
  if (!userId) return res.status(400).json({ error: "userId is required" });

  const db = getDatabase();
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnap = await roomRef.get();
  const room = roomSnap.val();
  if (!room) return res.status(404).json({ error: "room not found" });

  const players = room.players || {};
  const playerIds = Object.keys(players);
  if (playerIds.length < 2) return res.status(409).json({ error: "need 2 players" });

  // Si el match ya terminó (mejor de 3), reseteamos el marcador del match.
  if (room.matchFinished) {
    const nextMatchScore: any = {};
    for (const pid of playerIds) nextMatchScore[pid] = 0;
    await roomRef.update({
      matchScore: nextMatchScore,
      matchFinished: false,
      matchWinnerId: null,
    });
  }

  const roundId = String(Date.now());
  const currentGame: any = { roundId };
  for (const pid of playerIds) {
    currentGame[pid] = { choice: "", start: true };
  }

  await roomRef.update({
    status: "playing",
    currentGame,
    lastResult: null,
  });

  res.json({ ok: true, roundId });
});

app.post("/api/rooms/:roomId/play", async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { userId, choice } = req.body as { userId?: string; choice?: GameMove };
  if (!userId) return res.status(400).json({ error: "userId is required" });
  if (!choice) return res.status(400).json({ error: "choice is required" });

  const db = getDatabase();
  const roomRef = db.ref(`rooms/${roomId}`);
  const roomSnap = await roomRef.get();
  const room = roomSnap.val();
  if (!room) return res.status(404).json({ error: "room not found" });

  const currentGame = room.currentGame;
  if (!currentGame) return res.status(409).json({ error: "game not started" });

  const roundId = currentGame.roundId;

  await roomRef.child(`currentGame/${userId}/choice`).set(choice);

  const updatedSnap = await roomRef.child("currentGame").get();
  const updatedGame = updatedSnap.val();

  const playerIds = Object.keys(room.players || {});
  if (playerIds.length < 2) return res.status(409).json({ error: "need 2 players" });

  const [p1, p2] = playerIds;
  const c1 = updatedGame?.[p1]?.choice;
  const c2 = updatedGame?.[p2]?.choice;

  const completedRound = Boolean(c1 && c2);
  if (!completedRound) {
    return res.json({ ok: true, completedRound: false });
  }

  const result = whoWins(c1, c2);
  let winnerId: string | null = null;

  if (result === "win") winnerId = p1;
  if (result === "loss") winnerId = p2;

  if (winnerId) {
    await roomRef
      .child(`score/${winnerId}`)
      .transaction((cur: number | null) => (typeof cur === "number" ? cur + 1 : 1));

    await roomRef
      .child(`matchScore/${winnerId}`)
      .transaction((cur: number | null) => (typeof cur === "number" ? cur + 1 : 1));
  }

  const afterRoomSnap = await roomRef.get();
  const afterRoom = afterRoomSnap.val();
  const matchScore = afterRoom?.matchScore || {};
  const p1Match = typeof matchScore[p1] === "number" ? matchScore[p1] : 0;
  const p2Match = typeof matchScore[p2] === "number" ? matchScore[p2] : 0;
  const matchFinished = p1Match >= 3 || p2Match >= 3;
  const matchWinnerId = matchFinished ? (p1Match >= 3 ? p1 : p2) : null;

  if (matchFinished) {
    await roomRef.update({ matchFinished: true, matchWinnerId });
  }

  await roomRef.child("lastResult").set({
    roundId,
    winnerId,
    matchFinished,
    matchWinnerId,
    p1: { userId: p1, choice: c1 },
    p2: { userId: p2, choice: c2 },
  });

  res.json({ ok: true, completedRound: true, winnerId, matchFinished, matchWinnerId });
});

app.get("/api/rooms/:roomId", async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const db = getDatabase();
  const snap = await db.ref(`rooms/${roomId}`).get();
  const room = snap.val();
  if (!room) return res.status(404).json({ error: "room not found" });
  res.json(room);
});

export default app;
export { app };

// En Vercel, la función serverless se encarga del server HTTP.
if (!process.env.VERCEL) {
  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${port}`);
  });
}
