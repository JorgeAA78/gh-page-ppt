export type GameMove = "piedra" | "papel" | "tijera";
export type GameResult = "win" | "loss" | "tie";

export function whoWins(playerOne: GameMove, playerTwo: GameMove): GameResult {
  if (playerOne === playerTwo) return "tie";

  const p1wins =
    (playerOne === "piedra" && playerTwo === "tijera") ||
    (playerOne === "papel" && playerTwo === "piedra") ||
    (playerOne === "tijera" && playerTwo === "papel");

  return p1wins ? "win" : "loss";
}
