import { SET_USER } from "utils/gameTypes";

export const setUserData = (data: any) => {
  return {
    type: SET_USER,
    payload: data,
  };
};
