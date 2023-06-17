import "./style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateAnimalsOptions } from "../../utils/generateAnimalsOptions";
import { drawAnimals } from "../../utils/drawAnimals";
import { shuffleArray } from '../../utils/shuffleArray'
import { soundClicked } from '../../utils/soundClicked'
import { useAnimals } from '../../hooks/useAnimals'
import { useAuth } from '../../hooks/useAuth'
import useApi from '../../hooks/useApi';
import { useCookies } from '../../hooks/useCookies';
import { v4 } from 'uuid'

const NewLevel1 = () => {
  const { animals } = useAnimals()
  const { authUser } = useAuth()
  const { postAttempt } = useApi()
  const { getCookie } = useCookies()

  const [showFinalResults, setFinalResults] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [score, setScore] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const [tasks, setTasks] = useState([])

  const correctAudio = new Audio("/static/sounds/correct.mp3");
  const wrongAudio = new Audio("/static/sounds/errado.mp3");

  useEffect(() => {
    if (!tasksGenerated && animals.length) {
      const drawnAnimals = drawAnimals(animals, 3);

      const questions = drawnAnimals.map(correctAnimal => {
        const animalsOptions = generateAnimalsOptions(correctAnimal, animals)

        return [{
          text: 'Qual o nome desse animal:',
          image: correctAnimal?.img,
          options: animalsOptions.map((animal, index) => ({
            text: animal.name,
            correctAnimal: correctAnimal?.name,
            isCorrect: correctAnimal?.name === animal.name ? true : false,
            colorClass: `option-color-${index}`
          })),
        },
        {
          text: "Qual o som desse animal:",
          image: correctAnimal?.img,
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

  useEffect(() => {
    if (authUser && score.length === 6) {
      (async function () {
        const cookie = await getCookie('user')
        const token = await getCookie('authstudent')
        await postAttempt('Um', score, cookie.username, cookie.teacherUser, token)
      })()
    }
  }, [score])

  const optionClicked = (isCorrect, animal, img, mode) => {
    setScore(currentScore => [...currentScore, { animal: `${animal} ${(mode)}`, isCorrect, img }]);

    if (isCorrect) {
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

  const restartLevel = () => {
    setFinalResults(false);
    setHowToPlay(true);
    setScore([]);
    setCurrentQuestion(0);
    setTasksGenerated(false);
  };

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
                    <h1 className="d-flex justify-content-center" style={{ marginBottom: '2rem', fontSize: '3.5rem' }}>Resultado Final</h1>
                    {score.map((animal, index) =>
                      <div key={index} style={{ display: 'flex', textAlign: 'center' }}>
                        <img src={`/static/images/${animal.img}Movimento.png`} style={{ height: '5rem' }} />
                        <h2 style={{ fontSize: '2.5rem', marginRight: '.5rem' }}>
                          {animal.animal} {index % 2 ? '(Nome)' : '(Áudio)'}:
                        </h2>
                        <h2 style={{ fontSize: '2.5rem', color: animal.isCorrect ? 'green' : 'red' }}>{animal.isCorrect ? 'Acertou' : 'Errou'}</h2>
                      </div>
                    )}
                    <div className="row d-flex justify-content-around">
                      <button onClick={() => restartLevel()} type="button" className="btn btn-primary">Recomeçar</button>
                      <Link to="/level2"><button type="button" className="btn btn-primary">Jogar Fase 2</button></Link>
                      <Link to="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="question-card">
                  <h2 className="score-text">Quantidade de Pontos: {score.filter(item => item.isCorrect).length}</h2>
                  <div className="animal-img d-flex justify-content-center">
                    <img src={`/static/images/${tasks[currentQuestion].image}Fix.png`} />
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
                            onClick={() => optionClicked(option.isCorrect, option.correctAnimal, tasks[currentQuestion].image, 'Foto')}
                            key={v4()}
                          >
                            {option.text}
                          </li>
                        );
                      } else return (
                        <div key={v4()}>
                          <div className="row d-flex justify-content-center justify-content-around">
                            <button type="button" className="btn btn-light" onClick={() => soundClicked(option.audio)}><img src="/static/images/playIcon.png" /></button>
                          </div>
                          <li
                            type="button"
                            className={`btn btn-primary btn-decoration mx-auto btn-animal btn-decoration ${option.colorClass}`}
                            onClick={() => optionClicked(option.isCorrect, option.correctAnimal, tasks[currentQuestion].image, 'Áudio')}
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