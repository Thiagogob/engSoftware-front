import React, { useState } from "react";
import "./style.css";
import oncaPintada from "/static/images/oncapintada.png";
import arara from "/static/images/arara.png";
import capivara from "/static/images/capivara.png";
import cobra from "/static/images/cobra.png";
import crocodilo from "/static/images/crocodilo.png";
import flamingo from "/static/images/flamingo.png";
import juburu from "/static/images/juburu.png";
import macaco from "/static/images/macaco.png";

function Level1() {
  //propriedades
  const [showFinalResults, setFinalResults] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(3);

  const questions = [
    {
      text: "Qual o nome desse animal:",
      image: <img src={oncaPintada}/>,
      options: [
        { id: 0, text: "Onça-pintada", isCorrect: false },
        { id: 1, text: "Flamingo", isCorrect: false },
        { id: 2, text: "Arara", isCorrect: false },
      ],
    },
    {
      text: "Qual o som desse animal: ",
      image: <img src={oncaPintada}/>,
      options: [
        { id: 0, text: "1787", isCorrect: true },
        { id: 1, text: "1776", isCorrect: false },
        { id: 2, text: "1774", isCorrect: false },
      ],
    },
    {
      text: "Qual o nome desse animal:",
      image: <img src={macaco}/>,
      options: [
        { id: 0, text: "Macaco", isCorrect: true },
        { id: 1, text: "Cobra", isCorrect: false },
        { id: 2, text: "Juburu", isCorrect: false },
      ],
    },
    {
      text: "Qual o som desse animal: ",
      image: <img src={macaco}/>,
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
      ],
    },
    {
      text: "Qual o nome desse animal:",
      image: <img src={flamingo}/>,
      options: [
        { id: 0, text: "Flamingo", isCorrect: false },
        { id: 1, text: "Arara", isCorrect: true },
        { id: 2, text: "Crocodilo", isCorrect: true },
      ],
    },
    {
        text: "Qual o som desse animal:",
        image: <img src={flamingo}/>,
        options: [
          { id: 0, text: "Flamingo", isCorrect: false },
          { id: 1, text: "Arara", isCorrect: true },
          { id: 2, text: "Crocodilo", isCorrect: true },
        ],
      },
  ];


  return (
    <div className="container">
      <div className="jumbotron jumbotron-fluid animal-jumbotron">
      <h2 className="score-text">Quantidade de Pontos: {score}</h2>
        {showFinalResults ? (
          <div className="final-result d-flex justify-content-center">
            <button>Sair</button>
            <button>Fase 2</button>
          </div>
        ) : (
          <div className="question-card">
            <div className="animal-img d-flex justify-content-center">
                {questions[currentQuestion].image}
            </div>
            <p className="lead project-text d-flex justify-content-center question-text">
              {questions[currentQuestion].text}
            </p>

            <ul className="d-flex justify-content-center list-style">
              {questions[currentQuestion].options.map((option) =>{
                return (
                    <li type="button"
                    className="btn btn-primary btn-decoration mx-auto btn-animal btn-decoration" key={option.id}>{option.text}</li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Level1;
