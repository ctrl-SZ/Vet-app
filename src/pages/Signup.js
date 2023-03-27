import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [postcode, setPostcode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(
      firstname,
      lastname,
      phone,
      address,
      suburb,
      postcode,
      email,
      password
    );
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <label>First name:</label>
      <input
        type="string"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />
      <label>Last name:</label>
      <input
        type="string"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />
      <label>Phone:</label>
      <input
        type="string"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
      />
      <label>Address:</label>
      <input
        type="string"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <label>Suburb:</label>
      <input
        type="string"
        onChange={(e) => setSuburb(e.target.value)}
        value={suburb}
      />
      <label>Postcode:</label>
      <input
        type="string"
        onChange={(e) => setPostcode(e.target.value)}
        value={postcode}
      />
      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
