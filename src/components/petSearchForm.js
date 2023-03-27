import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const PetSearchForm = () => {
  const [petBreed, setPetBreed] = useState("");
  const [pets, setPets] = useState([]);
  const { user } = useAuthContext();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/api/pets/?petBreed=${petBreed}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPets(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pet-breed">Pet Breed:</label>
        <input
          type="text"
          id="pet-breed"
          name="petBreed"
          value={petBreed}
          onChange={(event) => setPetBreed(event.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Pet Breed</th>
            <th>Pet Name</th>
            <th>Pet Age</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td>{pet.petBreed}</td>
              <td>{pet.petName}</td>
              <td>{pet.petAge}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetSearchForm;
