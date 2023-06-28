import { Link } from "react-router-dom";
import StyledLink from "../components/StyledLink";

const Home = () => (
  <div className="container w-full">
    <div className="bg-transparent absolute top-1/4 left-40 2xl:left-1/4">
      <h1 className="text-7xl mb-6 font-margarine font-bold text-white drop-shadow-letter">
        Fauna Snapshot
      </h1>
      <Link to="/levels" className="text-white font-margarine bg-zinc-200 border-solid border-2 border-zinc-300 border-opacity-40 text-4xl tracking-widest bg-opacity-20 px-52 py-2 rounded-2xl duration-300 hover:no-underline hover:bg-opacity-40">
        Jogar
      </Link>
    </div>
    <nav className="absolute right-4 top-4">
      <ul className="flex gap-8">
        <li><StyledLink to='login'>Aluno</StyledLink></li>
        <li><StyledLink to='admin'>Professor</StyledLink></li>
      </ul>
    </nav>
    <StyledLink to='creditos' className="absolute bottom-4 right-4">Créditos</StyledLink>
  </div>
);

export default Home;
