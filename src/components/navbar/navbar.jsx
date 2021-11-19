import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Tumpang</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
