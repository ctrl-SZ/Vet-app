import { PlaydatesContext } from "../context/PlaydatesContext";
import { useContext } from "react";

export const usePlaydatesContext = () => {
  const context = useContext(PlaydatesContext);

  if (!context) {
    throw Error(
      "usePetsContext must be used inside an PlaydatesContextProvider"
    );
  }

  return context;
};
