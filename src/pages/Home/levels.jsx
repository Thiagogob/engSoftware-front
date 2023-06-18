import "./style.css";
import StyledLink from '../../components/StyledLink'
import YouTube from 'react-youtube'
import { useState } from "react";
import styled from "styled-components";

const opts = {
  height: '518',
  width: '921',
};

const Levels = () => {
  const [video, setVideo] = useState(false)

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <h1 className="my-3 project-text">Seleção de Fase: <span className="badge badge-secondary"></span></h1>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-4 card-border">
            <img src={"/static/images/level1.png"} className="card-img-top img-level" alt="..."></img>
            <div className="card-body card-bg">
              <h5 className="card-title d-flex justify-content-center">Fase 1</h5>
              <p className="card-text justify-card-text">Nessa fase, o jogador é apresentado a diferentes espécies de animais da fauna brasileira e é desafiado a identificá-los pelo nome e pelo som que eles emitem.</p>
              <div className="d-flex justify-content-center"><a href="/level1"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 1</button></a></div>
            </div>
          </div>
          <div className="col-1"></div>
          <div className="col-4 card-border">
            <img src={"/static/images/level2.png"} className="card-img-top img-level" alt="..."></img>
            <div className="card-body card-bg">
              <h5 className="card-title d-flex justify-content-center">Fase 2</h5>
              <p className="card-text justify-card-text">Nessa fase, o jogador é desafiado a encontrar e fotografar diferentes espécies de animais que habitam as florestas, pantanais, e outros ecossistemas do Brasil.</p>
              <div className="d-flex justify-content-center"><a href="/level2"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 2</button></a></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
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
  )
}

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
`

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
`

export default Levels;
