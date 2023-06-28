import { useEffect, useState } from "react";
import StyledLink from "../../components/StyledLink";
import StyledButton from "../../components/StyledButton";
import { generateAnimalsOptions } from "../../utils/generateAnimalsOptions";
import { drawAnimals } from "../../utils/drawAnimals";
import { shuffleArray } from "../../utils/shuffleArray";
import { soundClicked } from "../../utils/soundClicked";
import { useAnimals } from "../../hooks/useAnimals";
import { useAuth } from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";
import { useCookies } from "../../hooks/useCookies";
import { v4 } from "uuid";
import StyledButtonLink from "../../components/StyledButtonLink";

const NewLevel1 = () => {
  const { animals } = useAnimals();
  const { authUser } = useAuth();
  const { postAttempt } = useApi();
  const { getCookie } = useCookies();

  const [showFinalResults, setFinalResults] = useState(false);
  const [showHowToPlay, setHowToPlay] = useState(true);
  const [score, setScore] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [tasksGenerated, setTasksGenerated] = useState(false);
  const [tasks, setTasks] = useState([]);

  const correctAudio = new Audio("/static/sounds/correct.mp3");
  const wrongAudio = new Audio("/static/sounds/errado.mp3");

  const optionButtonColor = (index) => {
    if (index == 0) return "bg-blue-500 hover:bg-blue-700";
    if (index == 1) return "bg-orange-500 hover:bg-orange-700";
    if (index == 2) return "bg-green-500 hover:bg-green-700";
  };

  useEffect(() => {
    if (!tasksGenerated && animals.length) {
      const drawnAnimals = drawAnimals(animals, 3);

      const questions = drawnAnimals.map(correctAnimal => {
        const animalsOptions = generateAnimalsOptions(correctAnimal, animals);

        return [{
          text: "Qual o nome desse animal:",
          image: correctAnimal?.img,
          options: animalsOptions.map((animal, index) => ({
            text: animal.name,
            correctAnimal: correctAnimal?.name,
            isCorrect: correctAnimal?.name === animal.name ? true : false,
            colorOption: optionButtonColor(index),
          })),
        },
        {
          text: "Qual o som desse animal:",
          image: correctAnimal?.img,
          options: shuffleArray(animalsOptions).map((animal, index) => ({
            text: <img src='/static/images/checkFinal.png' />,
            isCorrect: correctAnimal?.name === animal.name ? true : false,
            correctAnimal: correctAnimal?.name,
            colorOption: optionButtonColor(index),
            audio: new Audio(`/static/sounds/${animal.img}.mp3`)
          }))
        }];
      });

      setTasks(questions.flat());

      if (drawnAnimals.length === 3) {
        setTasksGenerated(true);
      }
    }
  }, [animals]);

  useEffect(() => {
    if (authUser && score.length === 6) {
      (async function () {
        const cookie = await getCookie("user");
        const token = await getCookie("authstudent");
        await postAttempt("Um", score, cookie.username, cookie.teacherUser, token);
      })();
    }
  }, [score]);

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
  };

  const restartLevel = () => {
    setFinalResults(false);
    setHowToPlay(true);
    setScore([]);
    setCurrentQuestion(0);
    setTasksGenerated(false);
  };

  return (
    <>
      <div className="w-4/5 absolute left-1/2 -translate-x-1/2">
        {showHowToPlay ? (
          <div className="flex justify-center items-center mt-8">
            <div className="bg-[#5500dd9f] shadow-lg rounded-2xl p-4 text-white ">
              <h1 className="text-center text-5xl mb-4">Como Jogar: </h1>
              <ul className="flex flex-col gap-3 mb-4">
                <li className="text-2xl">1. Perguntas sobre animais aparecerão na tela</li>
                <li className="text-2xl">2. Você deve clicar na opção que achar correta</li>
                <li className="text-2xl">3. Decida a opção correta de acordo com seus conhecimentos</li>
                <li className="text-2xl">4. Para aprender sobre animais, clique no botão amarelo</li>
              </ul>
              <div className="flex justify-around">
                <StyledButton className="bg-[#28a745] hover:bg-[#0a4914]" onClick={() => setHowToPlay(false)}>Jogar Fase 1</StyledButton>
                <StyledButtonLink to="/learn" className="bg-[#cd9a02] hover:bg-[#9c7502]">Estudar animais</StyledButtonLink>
                <StyledButtonLink to="/" className="bg-[#dc3545] hover:bg-[#9e222f]">Sair</StyledButtonLink>
              </div>
            </div>
          </div>
        )
          :
          (
            <div>
              {showFinalResults ? (
                <div className="flex items-center justify-center h-screen">
                  <div className="my-0 mx-auto w-auto h-auto bg-zinc-950 bg-opacity-80 p-4 rounded-2xl text-white tracking-wider font-semibold">
                    <h1 className="text-center mb-3 text-6xl">Resultado Final</h1>
                    {score.map((animal, index) =>
                      <div key={index} className="flex text-center items-center">
                        <img src={`/static/images/${animal.img}Movimento.png`} className="h-20" />
                        <h2 className="text-4xl mr-2">
                          {animal.animal} {index % 2 ? "(Áudio)" : "(Nome)"}:
                        </h2>
                        <h2 className={`text-4xl ${animal.isCorrect ? "text-green-600" : "text-red-600"}`}>{animal.isCorrect ? "Acertou" : "Errou"}</h2>
                      </div>
                    )}
                    <div className="flex justify-around mt-4">
                      <StyledButtonLink onClick={() => restartLevel()} type="button" className="bg-[#007bfe] hover:bg-[#0354ab]">Recomeçar</StyledButtonLink>
                      <StyledButtonLink to="/level2" className="bg-[#007bfe] hover:bg-[#0354ab]">Jogar Fase 2</StyledButtonLink>
                      <StyledButtonLink to="/" className="bg-[#dc3545] hover:bg-[#9e222f]">Sair</StyledButtonLink>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-4 -left-16 bg-zinc-900 bg-opacity-80 p-2 rounded">
                    <h2 className="text-white tracking-wider text-2xl">
                      Quantidade de Pontos: {score.filter(item => item.isCorrect).length}
                    </h2>
                    <h2 className="text-white tracking-wider text-2xl">
                      Tentativas restantes: {tasks.length - currentQuestion}
                    </h2>
                  </div>
                  <div className="flex justify-center mt-6">
                    <img src={`/static/images/${tasks[currentQuestion]?.image}Fix.png`} />
                  </div>
                  <h1 className="drop-shadow-letter mb-4 font-margarine justify-center text-white text-center text-4xl font-bold tracking-widest shadow-black ">
                    {tasks[currentQuestion]?.text}
                  </h1>
                  <div className="flex justify-around w-[70%] absolute left-1/2 -translate-x-1/2">
                    {tasks[currentQuestion]?.options.map((option) => {
                      if (currentQuestion % 2 === 0) {
                        return (
                          <button
                            className={`${option.colorOption} text-3xl text-white py-3 mx-4 w-full rounded`}
                            onClick={() => optionClicked(option.isCorrect, option.correctAnimal, tasks[currentQuestion].image, "Foto")}
                            key={v4()}
                          >
                            {option.text}
                          </button>
                        );
                      } else return (
                        <div key={v4()} className="mx-6 w-3/4">
                          <div className="flex justify-center">
                            <button className="bg-zinc-200 hover:bg-zinc-400 rounded w-full flex justify-center items-center h-16" onClick={() => soundClicked(option.audio)}>
                              <img src="/static/images/playIcon.png" className="scale-125" />
                            </button>
                          </div>
                          <StyledButton
                            className={`${option.colorOption} w-full flex justify-center items-center mt-2`}
                            onClick={() => optionClicked(option.isCorrect, option.correctAnimal, tasks[currentQuestion].image, "Áudio")}
                            key={v4()}
                          >
                            {option.text}
                          </StyledButton>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
      </div >
      {(!showFinalResults && !showHowToPlay) &&
        <div className="absolute top-4 right-4">
          <StyledLink onClick={() => restartLevel()} to='/'>Voltar ao início</StyledLink>
        </div>
      }
    </>
  );
};

export default NewLevel1;