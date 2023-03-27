import { createContext, useReducer } from "react";

export const PlaydatesContext = createContext();

export const playdatesReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYDATES":
      return {
        playdates: action.payload,
      };
    case "CREATE_PLAYDATE":
      return {
        playdates: [action.payload, ...state.playdates],
      };
    case "DELETE_PLAYDATE":
      return {
        playdates: state.playdates.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PlaydatesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playdatesReducer, {
    playdates: null,
  });

  return (
    <PlaydatesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PlaydatesContext.Provider>
  );
};
