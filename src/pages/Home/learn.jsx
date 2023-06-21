import "./learn.css";
import { useAnimals } from "../../hooks/useAnimals";
import { useEffect, useState } from "react";
import { soundClicked } from "../../utils/soundClicked";
import { Link } from "react-router-dom";
import StyledLink from "../../components/StyledLink";

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
        text: `O nome desse animal é ${animal.name}`,
        image: animal?.img,
        audio: new Audio(`/static/sounds/${animal?.img}.mp3`)
      })));
  }, [animalsAPI]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        {showAnimals ? (
          <div className="learn-container text-center">
            <div className="jumbotron how-to-play-jumbo">
              <h1 className="display-4">Aprendendo sobre os animais</h1>
              <div>
                <img src={`/static/images/${animals[currentAnimal]?.image}Movimento.png`} />
              </div>
              <h2>{animals[currentAnimal]?.text}</h2>
              <h2>Escute o som desse animal: <button type="button" className="btn btn-warning" onClick={() => soundClicked(animals[currentAnimal].audio)}><img src="/static/images/playIcon.png" /></button></h2>
              <button className="btn btn-primary btn-lg" onClick={() => nextClicked()}>Próximo</button>
            </div>
          </div>
        ) :
          (
            <div className="text-center no-more-animals">
              <div className="jumbotron my-5">
                <h1 className="display-4">FIM!</h1>
                <p className="lead">Você acabou de aprender sobre os animais! Está na hora de jogar</p>
                <hr className="my-4"></hr>
                <div className="row justify-content-around">
                  <div className="d-flex justify-content-center"><Link to="/level1" className="btn btn-primary btn-decoration">Jogar Fase 1</Link></div>
                  <div className="d-flex justify-content-center"><Link to="/level2" className="btn btn-primary btn-decoration">Jogar Fase 2</Link></div>
                </div>
              </div>
            </div>
          )}
      </div>
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <StyledLink to='/'>Voltar ao início</StyledLink>
      </div>
    </>
  );
}

export default Learn;