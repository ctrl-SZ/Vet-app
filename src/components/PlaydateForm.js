import { useState } from "react";
import { usePlaydatesContext } from "../hooks/usePlaydatesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PlaydateForm = () => {
  const { dispatch } = usePlaydatesContext();
  const { user } = useAuthContext();

  const [sender, setSender] = useState(user.email);
  // const [reciever, setReciever] = useState('')
  const [message, setMessage] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    // const pet = {sender, reciever, message}
    const pet = { sender, message };
    const response = await fetch("/api/playdates/", {
      method: "POST",
      body: JSON.stringify(pet),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setSender("");
      setMessage("");
      setError(null);
      setEmptyFields([]);
      console.log("New playdate added");
      // console.log(emptyFields);
      dispatch({ type: "CREATE_PLAYDATE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Request a Playdate</h3>
      <label>Message: </label>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className={emptyFields.includes("message") ? "error" : ""}
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PlaydateForm;
