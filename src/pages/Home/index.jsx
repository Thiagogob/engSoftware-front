import "./style.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import StyledLink from "../../components/StyledLink";

const Home = () => (
  <div className="container">
    <div className="menu-box jumbotron">
      <h1 className="display-4 project-text my-4">Fauna Snapshot</h1>
      <Link to="/levels"><button type="button" className="btn btn-outline-secondary btn-play my-2">JOGAR</button></Link>
    </div>
    <NavBar>
      <ul><StyledLink className="link" to='login'>Aluno</StyledLink></ul>
      <ul><StyledLink className="link" to='admin'>Professor</StyledLink></ul>
    </NavBar>
  </div>
);

const NavBar = styled.nav`
  position: absolute;
  right: 1rem;
  top: 1rem;
  display: flex;
  gap: 2rem;

  ul {
    margin: 0;
    padding: 0;
  }
`

export default Home;
