import "./style.css";
import StyledLink from "../../components/StyledLink";
import YouTube from "react-youtube";
import { useState } from "react";
import styled from "styled-components";
import StyledButtonLink from "../../components/StyledButtonLink";

const opts = {
  height: "518",
  width: "921",
};

const Levels = () => {
  const [video, setVideo] = useState(false);

  return (
    <>
      <h1 className="project-text text-5xl 2xl:text-7xl absolute left-1/2 -translate-x-1/2 top-6 2xl:top-16 text-center ">Seleção de Fase: </h1>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] flex justify-between gap-8 w-3/5 2xl:w-1/2 mx-auto">
        <div className="flex-1">
          <img src={"/static/images/level1.png"} className="card-img-top img-level" alt="..."></img>
          <div className="relative p-3 bg-white h-2/5">
            <h5 className="mb-2 text-center font-black text-2xl">Fase 1</h5>
            <p className="text-justify text-base 2xl:text-lg">Nessa fase, o jogador é apresentado a diferentes espécies de animais da fauna brasileira e é desafiado a identificá-los pelo nome e pelo som que eles emitem.</p>
            <div className="absolute bottom-4 left-0 flex justify-center w-full mt-4">
              <StyledButtonLink to="/level1" className="bg-[#28a745] hover:bg-[#0a4914]">Jogar Fase 1</StyledButtonLink>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img src={"/static/images/level2.png"} className="card-img-top img-level" alt="..."></img>
          <div className="relative p-3 bg-white h-2/5">
            <h5 className="mb-2 text-center font-black text-2xl">Fase 2</h5>
            <p className="text-justify text-base 2xl:text-lg">Nessa fase, o jogador é desafiado a encontrar e fotografar diferentes espécies de animais que habitam as florestas, pantanais, e outros ecossistemas do Brasil.</p>
            <div className="absolute bottom-4 left-0 flex justify-center w-full mt-4">
              <StyledButtonLink to="/level2" className="bg-[#28a745] hover:bg-[#0a4914]">Jogar Fase 2</StyledButtonLink>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <StyledLink to='/'>Voltar ao início</StyledLink>
      </div>
      <ButtonStyled onClick={() => setVideo(currentVideo => !currentVideo)}>Tutorial</ButtonStyled>
      {video && <VideoContainer>
        <div>
          <button onClick={() => setVideo(false)}>Fechar</button>
          <YouTube opts={opts} videoId="KroK7Hw9zHs" onReady={e => e.target.pauseVideo()} />
        </div>
      </VideoContainer>}
    </>
  );
};

const ButtonStyled = styled.button`
 background-color: #111111;
  color: #FBFBFB;
  padding: .75rem 1.5rem;
  letter-spacing: .25rem;
  border-radius: 5px;
  font-weight: 500;
  font-size: 1.5rem;
  transition: ease-in-out 200ms;
  border: none;
  text-transform: uppercase;
  position: absolute;
  right: 1rem;
  top: 5rem;

  &:hover {
    text-decoration: none;
    background-color: #333;
    color: #FBFBFB;
  }
`;

const VideoContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;

  div {
    background-color: #222;
    padding: 2rem 1rem 1rem;
    border-radius: 5px;

    button {
      position: absolute;
      right: 2rem;
      top: .75rem;
      background-color: #FBFBFB;
      border-radius: 5px;
      font-size: 1.6rem;
      letter-spacing: .1rem;
      transition: 200ms ease-in-out;

      &:hover {
        background-color: #999;
      }
    }
  }
`;

export default Levels;
