import { useEffect, useState } from "react";
import StyledLink from "../components/StyledLink";
import StyledButton from "../components/StyledButton";
import StyledButtonLink from "../components/StyledButtonLink";
import { generateAnimalsOptions } from "../utils/generateAnimalsOptions.js";
import { drawAnimals } from "../utils/drawAnimals.js";
import { useAnimals } from "../hooks/useAnimals";
import { useAuth } from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { useCookies } from "../hooks/useCookies";
import { soundClicked } from "../utils/soundClicked";

const NewLevel2 = () => {
  const { animals } = useAnimals();
  const { authUser } = useAuth();
  const { postAttempt } = useApi();
  const { getCookie } = useCookies();

  const [showFinalResults, setFinalResults] = useState(false);
  const [photosLeft, setPhotosLeft] = useState(3);
  const [currentTask, setCurrentTask] = useState(0);
  const [score, setScore] = useState([]);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const [tasks, setTasks] = useState([]);

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
  };

  useEffect(() => {
    const animal = tasks[hoveredOption?.currentTask]?.options[hoveredOption?.id]?.audio;
    if (animal) {
      const audio = new Audio(`/static/sounds/foto_${animal}.mp3`);
      if (hoveredOption !== null)
        soundClicked(audio, 4000);
      return () => {
        audio.pause();
      };
    }
  }, [hoveredOption]);

  useEffect(() => {
    if (authUser && score.length === 3) {
      (async function () {
        const cookie = await getCookie("user");
        const token = await getCookie("authstudent");
        await postAttempt("Dois", score, cookie.username, cookie.teacherUser, token);
      })();
    }
  }, [score]);

  useEffect(() => {
    if (!tasksGenerated && animals.length) {
      const drawnAnimals = drawAnimals(animals, 3);

      setTasks(drawnAnimals.map(correctAnimal => ({
        text: `Tire uma foto d${(correctAnimal.name.toLowerCase().endsWith("a") || correctAnimal.name.charAt(drawnAnimals[0].name.length - 2) === "a") ? "a" : "o"} ${correctAnimal.name}:`,
        options: generateAnimalsOptions(correctAnimal, animals).map((animal, index) => ({
          id: index,
          img: correctAnimal?.img,
          audio: `${animal?.img}`,
          correctAnimal: correctAnimal?.name,
          image: <img className="h-80" src={`/static/images/${animal.img}Movimento.png`} />,
          hover: <img className="h-80" src={`/static/images/${animal.img}Foto.png`} />,
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
    setPhotosLeft(3);
    setCurrentTask(0);
    setScore([]);
    setHowToPlay(true);
    setHoveredOption(null);
    setTasksGenerated(false);
    setTasks([]);
  };

  return (
    <>
      <div className="w-4/5 absolute left-1/2 -translate-x-1/2">
        {showHowToPlay ? (
          <div className="flex justify-center items-center mt-8">
            <div className="bg-[#5500dd9f] shadow-lg rounded-2xl p-4 text-white ">
              <h1 className="text-center text-5xl mb-4">Como Jogar: </h1>
              <ul className="flex flex-col gap-3 mb-4">
                <li className="text-2xl">1. Você deve tirar foto de um animal especifico</li>
                <li className="text-2xl">2. Aparecerão três animais para fotografar</li>
                <li className="text-2xl">3. Leve o cursor do mouse até o animal que achar correto</li>
                <li className="text-2xl">4. Clique com o botão esquerdo para tirar a foto</li>
                <li className="text-2xl">5. Para aprender sobre animais, clique no botão amarelo</li>
              </ul>
              <div className="flex justify-around">
                <StyledButton className="bg-[#28a745] hover:bg-[#0a4914]" onClick={() => setHowToPlay(false)}>Jogar Fase 2</StyledButton>
                <StyledButtonLink to="/learn" className="bg-[#cd9a02] hover:bg-[#9c7502]">Estudar animais</StyledButtonLink>
                <StyledButtonLink to="/" className="bg-[#dc3545] hover:bg-[#9e222f]">Sair</StyledButtonLink>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {showFinalResults ?
              <div className="flex items-center justify-center h-screen">
                <div className="my-0 mx-auto w-auto h-auto mt-16 bg-zinc-950 bg-opacity-80 p-8 rounded-2xl text-white tracking-wider font-semibold">
                  <h1 className="text-center text-6xl">Resultado Final</h1>
                  <div className="flex flex-col gap-6 mt-8">
                    {score.map((animal, index) =>
                      <div key={index} className="flex text-center">
                        <img src={`/static/images/${animal.img}Movimento.png`} className="h-20" />
                        <h2 className="text-4xl mr-2">
                          {animal.animal}:
                        </h2>
                        <h2 className={`text-4xl ${score[index].isCorrect ? "text-green-600" : "text-red-600"}`}>
                          {score[index].isCorrect ? "Acertou" : "Errou"}
                        </h2>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-around mt-4">
                    <StyledButtonLink onClick={() => restartLevel()} type="button" className="bg-[#007bfe] hover:bg-[#0354ab]">Recomeçar</StyledButtonLink>
                    <StyledButtonLink to="/level1" className="bg-[#007bfe] hover:bg-[#0354ab]">Jogar Fase 1</StyledButtonLink>
                    <StyledButtonLink to="/" className="bg-[#dc3545] hover:bg-[#9e222f]">Sair</StyledButtonLink>
                  </div>
                </div>
              </div>
              :
              <>
                <div className="absolute top-4 -left-16 bg-zinc-900 bg-opacity-80 p-2 rounded">
                  <h2 className="text-white tracking-wider text-2xl">
                    Quantidade de Pontos: {score.filter(item => item.isCorrect).length}
                  </h2>
                  <h2 className="text-white tracking-wider text-2xl">
                    Fotos restantes: {tasks.length - currentTask}
                  </h2>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4/5 top-32">
                  <h2 className="drop-shadow-letter text-white text-center font-margarine font-bold text-5xl 2xl:text-7xl shadow-black tracking-wider ">
                    {tasks[currentTask]?.text}
                  </h2>
                  <ul className="flex justify-center mt-16">
                    {tasks[currentTask]?.options?.map((option) => {
                      return (
                        <li
                          className="cursor-pointer"
                          onClick={() => optionClicked(option.isCorrect, option.correctAnimal, option.img)}
                          key={option.id}
                        >
                          <div
                            onMouseEnter={() => setHoveredOption({ currentTask, id: option.id })}
                            onMouseLeave={() => setHoveredOption(null)}
                          >
                            {hoveredOption?.id === option.id ? option.hover : option.image}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            }
          </div>
        )
        }
      </div >
      {(!showFinalResults && !showHowToPlay) &&
        <div className="absolute top-4 right-4">
          <StyledLink onClick={() => restartLevel()} to='/'>Voltar ao início</StyledLink>
        </div>
      }
    </>
  );
};

export default NewLevel2;