// Global State
const INITIAL_STATE = {
  users: [],
  current_user: {},
};

// returning state
// this function will run when we call dispatch  and pass data and that data will recieve here
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SETUSER":
      return {
        ...state,
        current_user: action.payload,
      };
    case "SETFIREBASEUSERS":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
