import { useEffect } from "react";
import { usePlaydatesContext } from "../hooks/usePlaydatesContext";
import { useAuthContext } from "../hooks/useAuthContext";

//import petsearch form
import PetSearchForm from "../components/petSearchForm";

//components
import PlaydateDetails from "../components/PlaydateDetails";
import PlaydateForm from "../components/PlaydateForm";

const Playdates = () => {
  const { playdates, dispatch } = usePlaydatesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPlaydates = async () => {
      const response = await fetch("/api/playdates", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_PLAYDATES", payload: json });
      }
    };
    if (user) {
      fetchPlaydates();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div>
        <PetSearchForm />
      </div>
      <div className="playdates">
        <h2>Playdates</h2>
        {playdates &&
          playdates.map((playdate) => (
            <PlaydateDetails playdate={playdate} key={playdate._id} />
          ))}
      </div>

      <PlaydateForm />
    </div>
  );
};

export default Playdates;
