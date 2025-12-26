type GameMove = "piedra" | "papel" | "tijera" | "";
type GameResult = "win" | "loss" | "tie";

type OnlineRoom = {
  createdAt?: number;
  ownerId?: string;
  status?: "waiting" | "playing";
  players?: Record<string, { name: string; online: boolean }>;
  score?: Record<string, number>;
  matchScore?: Record<string, number>;
  matchFinished?: boolean;
  matchWinnerId?: string | null;
  currentGame?: any;
  lastResult?: any;
};

 const defaultApiBaseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
 const apiBaseUrl = String(process.env.API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, "");

 async function readApiResponse(res: Response) {
   const contentType = res.headers.get("content-type") || "";
   const isJson = contentType.includes("application/json");
   if (isJson) {
     return await res.json();
   }
   const text = await res.text();
   try {
     return JSON.parse(text);
   } catch {
     return { error: text || res.statusText };
   }
 }

type State = {
  currentGame: {
    playerPlay: GameMove;
    computerPlay: GameMove;
  };
  history: {
    player: number;
    computer: number;
  };
  online: {
    apiBaseUrl: string;
    userId: string;
    name: string;
    roomId: string;
    shortCode: string;
    room: OnlineRoom | null;
  };
};

const state = {
  data: {
    currentGame: {
      playerPlay: "",
      computerPlay: "",
    },
    history: { player: 0, computer: 0 },
    online: {
      apiBaseUrl,
      userId: "",
      name: "",
      roomId: "",
      shortCode: "",
      room: null,
    },
  } as State,
  listeners: [] as Function[],

  init() {
    // Score is no longer loaded from localStorage to ensure it resets on every new session.
  },

  getState() {
    return this.data;
  },

  setState(newState: State) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    // localStorage.setItem("saved-state", JSON.stringify(this.data.history)); // Removed to prevent score persistence.
    console.log("State updated:", this.data);
  },

  subscribe(callback: () => void) {
    this.listeners.push(callback);
  },

  setPlayerMove(move: GameMove) {
    const currentState = this.getState();
    currentState.currentGame.playerPlay = move;
    this.setComputerMove();
  },

  setComputerMove() {
    const moves: GameMove[] = ["piedra", "papel", "tijera"];
    const randomMove = moves[Math.floor(Math.random() * 3)];
    const currentState = this.getState();
    currentState.currentGame.computerPlay = randomMove;
    this.pushToHistory(currentState.currentGame.playerPlay as GameMove, randomMove);
  },

  whoWins(playerPlay: GameMove, computerPlay: GameMove): GameResult {
    if (playerPlay === computerPlay) return "tie";
    const win = (
      (playerPlay === "piedra" && computerPlay === "tijera") ||
      (playerPlay === "papel" && computerPlay === "piedra") ||
      (playerPlay === "tijera" && computerPlay === "papel")
    );
    return win ? "win" : "loss";
  },

  pushToHistory(playerPlay: GameMove, computerPlay: GameMove) {
    const currentState = this.getState();
    const result = this.whoWins(playerPlay, computerPlay);

    if (result === "win") {
      currentState.history.player++;
    }
    if (result === "loss") {
      currentState.history.computer++;
    }
    this.setState(currentState);
  },

  resetHistory() {
    const currentState = this.getState();
    currentState.history.player = 0;
    currentState.history.computer = 0;
    this.setState(currentState);
  },

  async createOnlineUser(name: string) {
    const currentState = this.getState();
    const res = await fetch(`${currentState.online.apiBaseUrl}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error creating user (${res.status})`);

    currentState.online.userId = data.userId;
    currentState.online.name = name;
    this.setState(currentState);
  },

  async createRoom() {
    const currentState = this.getState();
    const res = await fetch(`${currentState.online.apiBaseUrl}/api/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentState.online.userId, name: currentState.online.name }),
    });
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error creating room (${res.status})`);

    currentState.online.roomId = data.roomId;
    currentState.online.shortCode = data.shortCode;
    this.setState(currentState);
    await this.fetchRoom();
  },

  async joinRoom(shortCode: string) {
    const currentState = this.getState();
    const res = await fetch(`${currentState.online.apiBaseUrl}/api/rooms/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: currentState.online.userId,
        name: currentState.online.name,
        shortCode,
      }),
    });
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error joining room (${res.status})`);

    currentState.online.roomId = data.roomId;
    currentState.online.shortCode = shortCode;
    this.setState(currentState);
    await this.fetchRoom();
  },

  async fetchRoom() {
    const currentState = this.getState();
    if (!currentState.online.roomId) throw new Error("Missing roomId");

    const res = await fetch(`${currentState.online.apiBaseUrl}/api/rooms/${currentState.online.roomId}`);
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error fetching room (${res.status})`);

    currentState.online.room = data;
    this.setState(currentState);
  },

  async startGame() {
    const currentState = this.getState();
    if (!currentState.online.roomId) throw new Error("Missing roomId");
    if (!currentState.online.userId) throw new Error("Missing userId");

    const res = await fetch(`${currentState.online.apiBaseUrl}/api/rooms/${currentState.online.roomId}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentState.online.userId }),
    });
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error starting game (${res.status})`);

    await this.fetchRoom();
  },

  isRoomOwner() {
    const s = this.getState();
    return Boolean(s.online.room && s.online.userId && s.online.room.ownerId === s.online.userId);
  },

  async playOnline(choice: Exclude<GameMove, "">) {
    const currentState = this.getState();
    if (!currentState.online.roomId) throw new Error("Missing roomId");
    if (!currentState.online.userId) throw new Error("Missing userId");

    const res = await fetch(`${currentState.online.apiBaseUrl}/api/rooms/${currentState.online.roomId}/play`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentState.online.userId, choice }),
    });
    const data = await readApiResponse(res);
    if (!res.ok) throw new Error(data?.error || `Error playing (${res.status})`);

    await this.fetchRoom();
  },

  async waitForRoundResult(roundId: string, opts?: { timeoutMs?: number; pollMs?: number }) {
    const timeoutMs = opts?.timeoutMs ?? 30000;
    const pollMs = opts?.pollMs ?? 1200;
    const startedAt = Date.now();

    while (Date.now() - startedAt < timeoutMs) {
      await this.fetchRoom();
      const s = this.getState();
      const room = s.online.room;
      const last = room?.lastResult;

      const lastRoundId = last?.roundId;
      if (last && typeof last === "object") {
        if (lastRoundId) {
          if (String(lastRoundId) === String(roundId)) return;
        } else {
          // Fallback: si el backend viejo no manda roundId, asumimos que cualquier lastResult es el de la ronda actual
          return;
        }
      }
      await new Promise((r) => setTimeout(r, pollMs));
    }

    throw new Error("Timeout waiting for round result");
  },
};

export { state };
