import { Link } from "react-router-dom";
import "./homepage.css";

const Homepage = () => {
  return (
    <section className="tumpang">
      <div className="hero-banner">
        <Link to="/create" className="tumpang-btn tumpang__create">
          Tumpang others
        </Link>

        <Link to="/find" className="tumpang-btn tumpang__find">
          Get tumpang-ed
        </Link>
      </div>
    </section>
  );
};

export default Homepage;
