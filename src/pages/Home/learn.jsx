import { useAnimals } from "../../hooks/useAnimals";
import { useEffect, useState } from "react";
import { soundClicked } from "../../utils/soundClicked";
import StyledLink from "../../components/StyledLink";
import StyledButtonLink from "../../components/StyledButtonLink";
import StyledButton from "../../components/StyledButton";

function Learn() {
  const { animals: animalsAPI } = useAnimals();
  const [currentAnimal, setCurrentAnimals] = useState(0);
  const [showAnimals, setShowAnimals] = useState(true);
  const [animals, setAnimals] = useState([]);

  const nextClicked = () => {
    if (currentAnimal < animals.length - 1) {
      setCurrentAnimals(currentAnimal + 1);
    }
    else {
      setShowAnimals(false);
    }
  };

  useEffect(() => {
    if (animalsAPI.length > 0 && animals.length !== animalsAPI.length)
      setAnimals(animalsAPI.map(animal => ({
        text: ` ${animal.name}`,
        image: animal?.img,
        audio: new Audio(`/static/sounds/${animal?.img}.mp3`)
      })));
  }, [animalsAPI]);

  return (
    <div className="flex items-center justify-center h-screen">
      {showAnimals ? (
        <div className="flex flex-col items-center justify-center h-3/5 w-1/2 bg-zinc-200 rounded-xl bg-opacity-80">
          <h1 className="text-5xl font-bold">Aprendendo sobre os animais</h1>
          <img src={`/static/images/${animals[currentAnimal]?.image}Movimento.png`} />
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl">O nome deste animal é
                <span className="text-4xl text-green-700 font-semibold">
                  {animals[currentAnimal]?.text}
                </span>
              </h2>
              <h2 className="text-3xl">Escute o som desse animal:</h2>
            </div>
            <StyledButton
              className="bg-[#cd9a02] hover:bg-[#9c7502]"
              onClick={() => soundClicked(animals[currentAnimal].audio)}
            >
              <img className="scale-125" src="/static/images/playIcon.png" />
            </StyledButton>
          </div>
          <button
            className="px-6 py-3 text-white tracking-wider rounded text-2xl mt-4 bg-[#007bfe] hover:bg-[#0354ab]"
            onClick={() => nextClicked()}
          >
            Próximo
          </button>
          <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <StyledLink to='/'>Voltar ao início</StyledLink>
          </div>
        </div>
      ) :
        (
          <div className="flex flex-col items-center justify-center h-3/5 w-[70%] 2xl:w-1/2 bg-zinc-200 rounded-xl bg-opacity-80">
            <div>
              <h1 className="text-6xl font-bold text-center mb-4 tracking-widest">FIM!</h1>
              <p className="text-4xl text-center leading-[3rem]">
                Você acabou de aprender sobre os animais!<br />Está na hora de jogar
              </p>
              <hr className="my-4"></hr>
              <div className="flex gap-6 justify-center">
                <StyledButtonLink
                  to="/level1"
                  className="bg-[#007bfe] hover:bg-[#0354ab]"
                >
                  Jogar Fase 1
                </StyledButtonLink>
                <StyledButtonLink
                  to="/level2"
                  className="bg-[#007bfe] hover:bg-[#0354ab]"
                >
                  Jogar Fase 2
                </StyledButtonLink>
                <StyledButtonLink
                  to="/"
                  className="bg-[#dc3545] hover:bg-[#9e222f]"
                >
                  Sair
                </StyledButtonLink>
              </div>
            </div>
          </div>
        )}
    </div >
  );
}

export default Learn;