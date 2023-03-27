import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import catImage from "../images/cats-header.jpg";
import dogImage from "../images/dogs-header.jpg";
import catDogImage from "../images/cat-dog-header.jpg";

const Navbar = (props) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div></div>
      <div className="container">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/people">
          <h1>People</h1>
        </Link>
        <Link to="/services">
          <h1>Services</h1>
        </Link>
        {user && (
          <Link to="/pets">
            <h1>Pets</h1>
          </Link>
        )}
        {user && (
          <Link to="/playdates">
            <h1>Playdates</h1>
          </Link>
        )}

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
        <div className="persPref">
          Personalise this website
          <div className="userPreference">
            <button
              className="button-13"
              onClick={() => props.onButtonClick(catImage)}
            >
              Cat
            </button>
            <button
              className="button-13"
              onClick={() => props.onButtonClick(dogImage)}
            >
              Dog
            </button>
            <button
              className="button-13"
              onClick={() => props.onButtonClick(catDogImage)}
            >
              Both
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
