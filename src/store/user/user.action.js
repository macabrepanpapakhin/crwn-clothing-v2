import { USERS_ACTIONS_TYPES } from "./user-reducer";

export const setCurrentUser = (user) => ({
  type: USERS_ACTIONS_TYPES.SET_CURRENT_USER,
  payload: user,
});
