import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateAnimalsOptions } from '../../utils/generateAnimalsOptions.js'
import { drawAnimals } from '../../utils/drawAnimals.js'
import { useAnimals } from '../../hooks/useAnimals'
import { useAuth } from '../../hooks/useAuth'
import useApi from '../../hooks/useApi';
import { useCookies } from '../../hooks/useCookies';

const NewLevel2 = () => {
  const { animals } = useAnimals()
  const { authUser } = useAuth()
  const { postAttempt } = useApi()
  const { getCookie } = useCookies()

  const [showFinalResults, setFinalResults] = useState(false);
  const [photosLeft, setPhotosLeft] = useState(5);
  const [currentTask, setCurrentTask] = useState(0);
  const [score, setScore] = useState([]);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const [tasks, setTasks] = useState([])

  const optionClicked = (isCorrect, animal, img) => {
    setScore(currentScore => [...currentScore, { animal, isCorrect, img }]);

    if (isCorrect) {
      const sound = new Audio("/static/sounds/flashSoundEffect.mp3");
      sound.play();
      setPhotosLeft(photosLeft - 1);
    }
    else {
      const sound = new Audio("/static/sounds/flashSoundEffect.mp3");
      sound.play();
      setPhotosLeft(photosLeft - 1);
    }
    if (photosLeft === 1) {
      setFinalResults(true);
    }
    if (currentTask + 1 < tasks.length) {
      setCurrentTask(currentTask + 1);
    }
    else {
      setFinalResults(true);
    }
  }

  useEffect(() => {
    if (authUser && score.length === 3) {
      (async function () {
        const cookie = await getCookie('user')
        const token = await getCookie('authstudent')
        await postAttempt('Dois', score, cookie.username, cookie.teacherUser, token)
      })()
    }
  }, [score])

  useEffect(() => {
    if (!tasksGenerated && animals.length) {
      const drawnAnimals = drawAnimals(animals, 3);

      setTasks(drawnAnimals.map(correctAnimal => ({
        text: `Tire uma foto d${(correctAnimal.name.toLowerCase().endsWith('a') || correctAnimal.name.charAt(drawnAnimals[0].name.length - 2) === 'a') ? 'a' : 'o'} ${correctAnimal.name}:`,
        options: generateAnimalsOptions(correctAnimal, animals).map((animal, index) => ({
          id: index,
          img: correctAnimal?.img,
          correctAnimal: correctAnimal?.name,
          image: <img src={`/static/images/${animal.img}Movimento.png`} />,
          hover: <img src={`/static/images/${animal.img}Foto.png`} />,
          isCorrect: correctAnimal?.name === animal.name ? true : false,
        })),
      })));

      if (drawnAnimals.length === 3) {
        setTasksGenerated(true);
      }
    }
  }, [animals]);

  const restartLevel = () => {
    setFinalResults(false);
    setPhotosLeft(5);
    setCurrentTask(0);
    setScore([]);
    setHowToPlay(true);
    setHoveredOption(null);
    setTasksGenerated(false);
    setTasks([]);
  };

  return (
    <div className="container container-camera">
      {showHowToPlay ? (
        <div className="d-flex align-items-center justify-content-center">
          <div className="how-to-play">
            <h1 className="d-flex justify-content-center">Como Jogar: </h1>
            <ul className="justify-content-between">
              <li>1. Qual animal fotografar aparecerá na tela</li>
              <li>2. Você deve passar o mouse por cima do animal em movimento</li>
              <li>3. Caso o mouse estiver na posição correta, uma camerá aparecerá</li>
              <li>4. Você deve clicar rápido para realizar a fotografia</li>
              <li>5. Para aprender sobre animais, clique no botão amarelo</li>
            </ul>
            <div className="row d-flex justify-content-around">
              <button type="button" className="btn btn-success" onClick={() => setHowToPlay(false)}>Jogar Fase 2</button>
              <Link to="/learn"><button type="button" className="btn btn-warning font-weight-bold">Estudar animais</button></Link>
              <Link to="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {showFinalResults ?
            <div className="d-flex align-items-center justify-content-center">
              <div className="final-result">
                <h1 className="d-flex justify-content-center" style={{ fontSize: '3.5rem' }}>Resultado Final</h1>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4rem', gap: '2rem' }}>
                  {score.map((animal, index) =>
                    <div key={index} style={{ display: 'flex', textAlign: 'center' }}>
                      <img src={`/static/images/${animal.img}Movimento.png`} style={{ height: '5rem' }} />
                      <h2 style={{ fontSize: '2.5rem', marginRight: '.5rem' }}>
                        {animal.animal}:
                      </h2>
                      <h2 style={{ fontSize: '2.5rem', color: score[index].isCorrect ? 'green' : 'red' }}>{score[index].isCorrect ? 'Acertou' : 'Errou'}</h2>
                    </div>
                  )}
                </div>
                <div className="row d-flex justify-content-around">
                  <button onClick={() => restartLevel()} type="button" className="btn btn-primary">Recomeçar</button>
                  <Link to="/level1"><button type="button" className="btn btn-primary">Jogar Fase 1</button></Link>
                  <Link to="/"><button type="button" className="btn btn-danger btn-exit">Sair</button></Link>
                </div>
              </div>
            </div>
            :
            <div className="task-card">
              <div className="row">
                <div className="mx-auto">
                  <h2 className="d-flex justify-content-center project-text">{tasks[currentTask]?.text}</h2>
                </div>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <h2 className="project-text">{photosLeft} fotos restantes</h2>
                </div>
              </div>
              <ul className="d-flex justify-content-center">
                {tasks[currentTask]?.options?.map((option) => {
                  return (
                    <li
                      className="animal"
                      onClick={() => { optionClicked(option.isCorrect, option.correctAnimal, option.img) }}
                      key={option.id}
                    >
                      <div
                        onMouseEnter={() => setHoveredOption(option.id)}
                        onMouseLeave={() => setHoveredOption(null)}
                      >
                        {hoveredOption === option.id ? option.hover : option.image}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          }
        </div>
      )
      }
    </div >
  );
};

export default NewLevel2;
