import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index.js";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby neutra paleo tilde farm-to-table roof party iPhone twee
            heirloom locavore af street art dreamcatcher. Next level vice irony
            waistcoat 8-bit mumblecore gluten-free mixtape mustache tumblr
            chambray unicorn.
          </p>
          <Link to="/register">
            <button className="btn btn-hero">Login / Register</button>
          </Link>
        </div>
        <img src={main} alt="Landing-Image" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
