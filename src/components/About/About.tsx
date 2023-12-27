import { Link } from "react-router-dom";
import "./About.styles.css";
const About = () => {
  return (
    <div className="about">
      <p>тут митапы и там ну митапы некоторые митапы крч) </p>
      <Link to={"/registration"} className="login__link">
        Регистрация
      </Link>
    </div>
  );
};

export default About;
