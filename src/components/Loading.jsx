import styled, { keyframes } from "styled-components";

const Loading = () => (
  <LoadingContainer>
    <div className='container'>
      <div className="ring"></div>
      <span>carregando...</span>
    </div>
  </LoadingContainer>
);

const ringAnimte = keyframes`
  0% {
    transform: rotate(0deg);
    box-shadow: 1px 5px 2px #e65c00;
  }
  50% {
    transform: rotate(180deg);
    box-shadow: 1px 5px 2px #18b201;
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 1px 5px 2px #0456c8;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .ring {
    position: absolute;
    width: 14rem;
    height: 14rem;
    border-radius: 14rem;
    background-color: rgba(0, 0, 0, 0.8);
    animation: ${ringAnimte} 2s linear infinite;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    }
  }

  span {
    color: #FBFBFB;
    z-index: 50;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
  }
`;

export default Loading;