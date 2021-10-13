import { SET_USER } from "utils/gameTypes";

export type UserStatePropTypes = {
  user: any;
};

const intialState: UserStatePropTypes = {
  user: null,
};

const userReducer = (state = intialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default userReducer;
