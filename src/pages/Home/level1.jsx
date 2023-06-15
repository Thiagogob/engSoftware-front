import React, { useState } from "react";
import "./style.css";
import oncaPintada from "/static/images/oncapintadaFix.png";
import arara from "/static/images/araraFix.png";
import capivara from "/static/images/capivaraFix.png";
import cobra from "/static/images/cobraFix.png";
import crocodilo from "/static/images/crocodiloFix.png";
import flamingo from "/static/images/flamingoFix.png";
import juburu from "/static/images/juburuFix.png";
import macaco from "/static/images/macacoFix.png";
import { Link } from "react-router-dom";

function Level1() {
  //propriedades
  const [showFinalResults, setFinalResults] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const correctAudio = new Audio("/static/images/correct.mp3");
  const wrongAudio = new Audio("/static/images/errado.mp3");
  const oncaAudio = new Audio("/static/images/somOnca.mp3");
  const macacoAudio = new Audio("/static/images/somMacaco.mp3");
  const flamingoAudio = new Audio("/static/images/somFlamingo.mp3");
  const questions = [
    {
      text: "Qual o nome desse animal:",
      image: <img src={oncaPintada} />,
      options: [
        { id: 0, text: "Onça-pintada", isCorrect: true, colorClass: "option-color-0" },
        { id: 1, text: "Flamingo", isCorrect: false, colorClass: "option-color-1" },
        { id: 2, text: "Tamanduá", isCorrect: false, colorClass: "option-color-2" },
      ],
    },
    {
      text: "Qual o som desse animal:",
      image: <img src={oncaPintada} />,
      options: [
        { id: 0, text: <img src="/static/images/checkFinal.png" />, isCorrect: true, colorClass: "option-color-0" },
        { id: 1, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-1" },
        { id: 2, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-2" },
      ],
    },
    {
      text: "Qual o nome desse animal:",
      image: <img src={macaco} />,
      options: [
        { id: 0, text: "Cobra", isCorrect: false, colorClass: "option-color-0" },
        { id: 1, text: "Macaco", isCorrect: true, colorClass: "option-color-1" },
        { id: 2, text: "Juburu", isCorrect: false, colorClass: "option-color-2" },
      ],
    },
    {
      text: "Qual o som desse animal:",
      image: <img src={macaco} />,
      options: [
        { id: 3, text: <img src="/static/images/checkFinal.png" />, isCorrect: true, colorClass: "option-color-0" },
        { id: 4, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-1" },
        { id: 5, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-2" },
      ],
    },
    {
      text: "Qual o nome desse animal:",
      image: <img src={flamingo} />,
      options: [
        { id: 0, text: "Flamingo", isCorrect: true, colorClass: "option-color-0" },
        { id: 1, text: "Arara", isCorrect: false, colorClass: "option-color-1" },
        { id: 2, text: "Crocodilo", isCorrect: false, colorClass: "option-color-2" },
      ],
    },
    {
      text: "Qual o som desse animal:",
      image: <img src={flamingo} />,
      options: [
        { id: 6, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-0" },
        { id: 7, text: <img src="/static/images/checkFinal.png" />, isCorrect: false, colorClass: "option-color-1" },
        { id: 8, text: <img src="/static/images/checkFinal.png" />, isCorrect: true, colorClass: "option-color-2" },
      ],
    },
  ];

  //funcoes auxiliares
  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      correctAudio.play();
    }
    else {
      wrongAudio.play();
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
    else {
      setFinalResults(true);
    }

  }

  const soundClicked = (id) => {
    if (id == 0) {
      oncaAudio.play();
      setTimeout(() => {
        oncaAudio.pause();
      }, 2000);
      oncaAudio.currentTime = 0;

    }
    if (id == 1) {
      macacoAudio.play();
      setTimeout(() => {
        macacoAudio.pause();
      }, 2000);
      macacoAudio.currentTime = 0;
    }
    if (id == 2) {
      flamingoAudio.play();
      setTimeout(() => {
        flamingoAudio.pause();
      }, 2000);
      flamingoAudio.currentTime = 0;
    }
    if (id == 3) {
      macacoAudio.play();
      setTimeout(() => {
        macacoAudio.pause();
      }, 2000);
      macacoAudio.currentTime = 0;
    }
    if (id == 4) {
      oncaAudio.play();
      setTimeout(() => {
        oncaAudio.pause();
      }, 2000);
      oncaAudio.currentTime = 0;
    }
    if (id == 5) {
      flamingoAudio.play();
      setTimeout(() => {
        flamingoAudio.pause();
      }, 2000);
      flamingoAudio.currentTime = 0;
    }
    if (id == 6) {
      oncaAudio.play();
      setTimeout(() => {
        oncaAudio.pause();
      }, 2000);
      oncaAudio.currentTime = 0;
    }
    if (id == 7) {
      macacoAudio.play();
      setTimeout(() => {
        macacoAudio.pause();
      }, 2000);
      macacoAudio.currentTime = 0;
    }
    if (id == 8) {
      flamingoAudio.play();
      setTimeout(() => {
        flamingoAudio.pause();
      }, 2000);
      flamingoAudio.currentTime = 0;
    }
  }


  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid animal-jumbotron">
        {showHowToPlay ? (
          <div className="d-flex align-items-center justify-content-center">
            <div className="how-to-play">
              <h1 className="d-flex justify-content-center">Como Jogar: </h1>
              <ul className="justify-content-between">
                <li>1. Perguntas sobre animais aparecerão na tela</li>
                <li>2. Você deve clicar na opção que achar correta</li>
                <li>3. Decida a opção correta de acordo com seus conhecimentos</li>
                <li>4. Para aprender sobre animais, clique no botão amarelo</li>
              </ul>
              <div className="row d-flex justify-content-around">
                <button type="button" className="btn btn-success" onClick={() => setHowToPlay(false)}>Jogar Fase 1</button>
                <Link href="/learn"><button type="button" className="btn btn-warning font-weight-bold">Estudar animais</button></Link>
                <Link href="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
              </div>
            </div>
          </div>
        )
          :
          (
            <div>
              {showFinalResults ? (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="final-result">
                    <h1 className="d-flex justify-content-center">Resultado Final</h1>
                    <h2 className="d-flex justify-content-center">
                      {score} de {questions.length} questões corretas - ({((score / questions.length) * 100).toFixed(2)}%)
                    </h2>
                    <div className="row d-flex justify-content-around">
                      <a href="/level1"><button type="button" className="btn btn-primary">Recomeçar</button></a>
                      <a href="/level2"><button type="button" className="btn btn-primary">Jogar Fase 2</button></a>
                      <a href="/home"><button type="button" className="btn btn-danger btn-exit">Sair</button></a>
                    </div>
                  </div>
                </div>
              ) : (

                <div className="question-card">
                  <h2 className="score-text">Quantidade de Pontos: {score}</h2>
                  <div className="animal-img d-flex justify-content-center">
                    {questions[currentQuestion].image}
                  </div>
                  <p className="lead project-text d-flex justify-content-center question-text">
                    {questions[currentQuestion].text}
                  </p>
                  <ul className="d-flex justify-content-center list-style justify-content-around">
                    {questions[currentQuestion].options.map((option) => {
                      if (currentQuestion % 2 === 0) {
                        return (
                          <li
                            type="button"
                            className={`btn btn-primary btn-decoration mx-auto btn-animal btn-decoration ${option.colorClass}`}
                            onClick={() => optionClicked(option.isCorrect)}
                            key={option.id}
                          >
                            {option.text}
                          </li>
                        );
                      } else return (
                        <div>
                          <div className="row d-flex justify-content-center justify-content-around">
                            <button type="button" className="btn btn-light" onClick={() => soundClicked(option.id)}><img src="/static/images/playIcon.png" /></button>
                          </div>
                          <li
                            type="button"
                            className={`btn btn-primary btn-decoration mx-auto btn-animal btn-decoration ${option.colorClass}`}
                            onClick={() => optionClicked(option.isCorrect)}
                            key={option.id}
                          >
                            {option.text}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}

export default Level1;
