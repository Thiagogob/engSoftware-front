import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import StyledLink from "../components/StyledLink";

const owners = [
  { name: "Gabriel Stawny", github: "https://github.com/gastawny" },
  { name: "João Francisco Agottani", github: "https://github.com/joaoFrAgo" },
  { name: "Pablo Santos Costa", github: "https://github.com/PabloRenan157" },
  { name: "Thiago Guimarães Belém", github: "https://github.com/Thiagogob" },
];

const Owners = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center gap-12 bg-zinc-900 bg-opacity-90 rounded-xl p-8 w-3/5">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-white text-4xl tracking-widest font-bold">Criadores</h1>
            <ul className="flex gap-12">
              {owners.map((owner) => (
                <li className="flex flex-col items-center gap-2" key={owner.github}>
                  <Link to={owner.github} target="_blank" rel="noopener noreferrer">
                    <Github />
                  </Link>
                  <h2 className="text-white text-xl font-margarine tracking-wide text-center">
                    {owner.name}
                  </h2>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-white text-4xl tracking-widest font-bold">Sobre este jogo</h1>
            <p className="text-white text-base 2xl:text-lg text-justify">
              Este projeto consiste em um jogo voltado para crianças que sofrem de
              doenças mentais. Esse jogo faz parte de um projeto na Universidade
              Tecnológica Federal do Paraná
              <Link
                to="http://www.utfpr.edu.br/"
                className="text-teal-300 hover:text-teal-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}(UTFPR)
              </Link>
              , como parte da disciplina de Engenharia
              de Software (CC53D) ministrada pela Professora
              <Link className="text-teal-300 hover:text-teal-600"
                to="https://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4137685H6&tokenCaptchar=03AL8dmw9IJ_eiMG8SpRlQ8AnhIC2hhw00IhGDebi5B0bTwyb8L5OVRlGldABxEdpIj5Ugs2c4dG5jCbCkjWKDc2NWL08O3QKDQFpysuwbXytMtnp2ooAfXgqpBLKXcs9VFi4cn4dnsUq2Q7TmUfk2pFSQgY49Tot069ttzioQ4j1btZpBO7l-mJNZ8Wh2k-xK_VVc9BsG1ddOu4myMEhpn2H-iB1ZofFWwkY0uG0G7vSmmhHxw7Zsyk7iQSTQDb6_NA6-nAKNF6eXNFn8Pa3QInSNjTj1ZOZmd4k5yTPISnRr7gHZdjHAKqfkV9ndQ0zgBCbpZF8bSnPxPTjmjn2XAEmJPMOrIYS8gp2sFbh3xq6NM9fbBrQnocPiOu8lHFO0AUqZyjbrWgqCFik5I9hUIeOCdWwwqrzynVqDM0VIBhI5GSRfA1xonxEa-i-7JDyvJAL-ysT9e1zfeEH6YgW5mmKKzvrK9LxhCVgDk7mAf_V1VfBcaexocZO0uJNChNYsBIEg7mdtDW1KrY816hSXlnLHe2K_OrrdqPiuoY8tkZbsGXgbFWKMsKM85fVEHwoK1Qx6NEz1gUqgIDhEfJ9y94wbS6Gilu9RcmgawJvbO8WaCf5cyglQ-1RDmsIj5Ox1m8NkdL-M5mxk"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}Eliana Claudia Mayumi Ishikawa.
              </Link>
            </p>
          </div>
        </div>
      </div >
      <div className="absolute top-4 right-4">
        <StyledLink to='/'>Voltar ao início</StyledLink>
      </div>
    </>
  );
};

const animation = keyframes`
  0% {
    stroke-width: 0;
    stroke-dasharray: 1 100;
    fill: transparent;
  }

  25% {
    stroke-width: 1;
  }

  60%,
  100% {
    stroke-width: 0.3;
    stroke-dasharray: 100 1;
  }
`;

const Github = styled(BsGithub)`
  width: 4rem;
  height: auto;
  cursor: pointer;
  color: rgb(20, 184, 166);

  a:hover & {
    opacity: 1;
    fill: #fbfbfb;

    path {
      animation: ${animation} 3s ease alternate;
    }
  }

`;

export default Owners;