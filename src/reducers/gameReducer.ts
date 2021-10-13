import {
  RESET_SCORES,
  UPDATE_COMPUTER_SCORE,
  UPDATE_PLAYER_SCORE,
  SET_PLAYER_NAME,
  UPDATE_MOVES,
  LOGOUT,
  SET_GAME_STARTED,
} from "utils/gameTypes";

export type StatePropTypes = {
  playerName: string;
  playerScore: number;
  computerScore: number;
  movesLeft: number;
  isGameStarted: boolean;
};

const intialState: StatePropTypes = {
  playerName: "",
  playerScore: 0,
  computerScore: 0,
  movesLeft: 5,
  isGameStarted: false,
};

const gameReducer = (state = intialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PLAYER_SCORE:
      return { ...state, playerScore: payload };
    case UPDATE_COMPUTER_SCORE:
      return { ...state, computerScore: payload };
    case SET_PLAYER_NAME:
      return { ...state, playerName: payload };
    case SET_GAME_STARTED:
      return { ...state, isGameStarted: payload };
    case UPDATE_MOVES:
      return { ...state, movesLeft: payload };
    case RESET_SCORES:
      return { ...state, playerScore: 0, computerScore: 0, movesLeft: 5 };
    case LOGOUT:
      return { playerName: "", playerScore: 0, computerScore: 0, movesLeft: 5 };
    default:
      return state;
  }
};

export default gameReducer;
