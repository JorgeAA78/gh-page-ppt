type GameMove = "piedra" | "papel" | "tijera" | "";
type GameResult = "win" | "loss" | "tie";

type State = {
  currentGame: {
    playerPlay: GameMove;
    computerPlay: GameMove;
  };
  history: {
    player: number;
    computer: number;
  };
};

const state = {
  data: {
    currentGame: {
      playerPlay: "",
      computerPlay: "",
    },
    history: { player: 0, computer: 0 },
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
};

export { state };
