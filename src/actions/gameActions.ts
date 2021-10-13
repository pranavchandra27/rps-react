import {
  UPDATE_PLAYER_SCORE,
  UPDATE_COMPUTER_SCORE,
  RESET_SCORES,
  SET_PLAYER_NAME,
  LOGOUT,
  UPDATE_MOVES,
  SET_GAME_STARTED,
} from "utils/gameTypes";

export const updatePlayerScore = (score: number) => {
  return {
    type: UPDATE_PLAYER_SCORE,
    payload: score,
  };
};

export const updateComputerScore = (score: number) => {
  return {
    type: UPDATE_COMPUTER_SCORE,
    payload: score,
  };
};

export const setPlayerName = (name: string) => {
  return {
    type: SET_PLAYER_NAME,
    payload: name,
  };
};

export const setGameStarted = (isStarted: boolean) => {
  return {
    type: SET_GAME_STARTED,
    payload: isStarted,
  };
};

export const resetScores = () => {
  return {
    type: RESET_SCORES,
  };
};

export const updateMoves = (moves: number) => {
  return {
    type: UPDATE_MOVES,
    payload: moves,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
