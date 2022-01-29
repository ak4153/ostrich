//reducer for setting global state

export const actionTypes = {
  SET_USER: "SET_USER",
  SIGN_OUT: "SIGN_OUT",
};

export const initialState = {
  user: null,
  message: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        message: null,
        user: action.user,
      };
    case actionTypes.SIGN_OUT:
      return {
        message: "signed-out",
        user: null,
      };
    default:
      return state;
  }
};
export default reducer;
