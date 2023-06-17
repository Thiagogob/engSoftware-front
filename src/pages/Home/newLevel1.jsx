import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAnimals } from "../../hooks/useAnimals";
import { generateAnimalsOptions } from "../../utils/generateAnimalsOptions";
import { drawAnimals } from "../../utils/drawAnimals";
import { shuffleArray } from '../../utils/shuffleArray'
import { v4 } from 'uuid'

const NewLevel1 = () => {
  const [showFinalResults, setFinalResults] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const { animals } = useAnimals()
  const [tasks, setTasks] = useState([])

  const correctAudio = new Audio("/static/sounds/correct.mp3");
  const wrongAudio = new Audio("/static/sounds/errado.mp3");

  const soundClicked = (audio) => {
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 2000);
    audio.currentTime = 0;
  }

  useEffect(() => {
    if (!tasksGenerated && animals.length) {
      const drawnAnimals = drawAnimals(animals, 3);

      const questions = drawnAnimals.map(correctAnimal => {
        const animalsOptions = generateAnimalsOptions(correctAnimal, animals)

        return [{
          text: 'Qual o nome desse animal:',
          image: <img src={`/static/images/${correctAnimal?.img}Fix.png`} />,
          options: animalsOptions.map((animal, index) => ({
            text: animal.name,
            correctAnimal: correctAnimal?.name,
            isCorrect: correctAnimal?.name === animal.name ? true : false,
            colorClass: `option-color-${index}`
          })),
        },
        {
          text: "Qual o som desse animal:",
          image: <img src={`/static/images/${correctAnimal?.img}Fix.png`} />,
          options: shuffleArray(animalsOptions).map((animal, index) => ({
            text: <img src='/static/images/checkFinal.png' />,
            isCorrect: correctAnimal?.name === animal.name ? true : false,
            correctAnimal: correctAnimal?.name,
            colorClass: `option-color-${index}`,
            audio: new Audio(`/static/sounds/${animal.img}.mp3`)
          }))
        }]
      })

      setTasks(questions.flat())

      if (drawnAnimals.length === 3) {
        setTasksGenerated(true);
      }
    }
  }, [animals]);

  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      correctAudio.play();
    }
    else {
      wrongAudio.play();
    }
    if (currentQuestion + 1 < tasks.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
    else {
      setFinalResults(true);
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
                <Link to="/learn"><button type="button" className="btn btn-warning font-weight-bold">Estudar animais</button></Link>
                <Link to="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
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
                      {score} de {tasks.length} questões corretas - ({((score / tasks.length) * 100).toFixed(2)}%)
                    </h2>
                    <div className="row d-flex justify-content-around">
                      <Link to="/level1"><button type="button" className="btn btn-primary">Recomeçar</button></Link>
                      <Link to="/level2"><button type="button" className="btn btn-primary">Jogar Fase 2</button></Link>
                      <Link to="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="question-card">
                  <h2 className="score-text">Quantidade de Pontos: {score}</h2>
                  <div className="animal-img d-flex justify-content-center">
                    {tasks[currentQuestion].image}
                  </div>
                  <p className="lead project-text d-flex justify-content-center question-text">
                    {tasks[currentQuestion].text}
                  </p>
                  <ul className="d-flex justify-content-center list-style justify-content-around">
                    {tasks[currentQuestion].options.map((option) => {
                      if (currentQuestion % 2 === 0) {
                        return (
                          <li
                            type="button"
                            className={`btn btn-primary btn-decoration mx-auto btn-animal btn-decoration ${option.colorClass}`}
                            onClick={() => optionClicked(option.isCorrect)}
                            key={v4()}
                          >
                            {option.text}
                          </li>
                        );
                      } else return (
                        <div key={v4()}>
                          <div className="row d-flex justify-content-center justify-content-around">
                            <button type="button" className="btn btn-light" onClick={() => { console.log(option); soundClicked(option.audio) }}><img src="/static/images/playIcon.png" /></button>
                          </div>
                          <li
                            type="button"
                            className={`btn btn-primary btn-decoration mx-auto btn-animal btn-decoration ${option.colorClass}`}
                            onClick={() => optionClicked(option.isCorrect)}
                            key={v4()}
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
  )
}

export default NewLevel1