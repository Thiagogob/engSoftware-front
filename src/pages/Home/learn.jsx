import "./learn.css"
import React, { useEffect, useState } from "react";

import oncaPintada from "/static/images/oncapintadaFix.png";
import arara from "/static/images/araraFix.png";
import capivara from "/static/images/capivaraFix.png";
import cobra from "/static/images/cobraFix.png";
import crocodilo from "/static/images/crocodiloFix.png";
import flamingo from "/static/images/flamingoFix.png";
import juburu from "/static/images/juburuFix.png";
import macaco from "/static/images/macacoFix.png";

function Learn() {
    const [currentAnimal, setCurrentAnimals] = useState(0);
    const [showAnimals, setShowAnimals] = useState(true);
    const oncaAudio = new Audio("/static/sounds/somOnca.mp3");
    const macacoAudio = new Audio("/static/sounds/somMacaco.mp3");
    const flamingoAudio = new Audio("/static/sounds/somFlamingo.mp3");

    const nextClicked = () => {
        if (currentAnimal < animals.length - 1) {
            setCurrentAnimals(currentAnimal + 1);
        }
        else {
            setShowAnimals(false)
        }
    }

    const playClicked = (audio) => {
        audio.play();
        setTimeout(() => {
            audio.pause();
        }, 2000);
        audio.currentTime = 0;
    }

    const animals = [
        {
            text: "O nome desse animal é onça-pintada",
            image: <img src={oncaPintada} />,
            audio: oncaAudio,
            id: 0,

        },
        {
            text: "O nome desse animal é Macaco",
            image: <img src={macaco} />,
            audio: macacoAudio,
            id: 1,
        },
        {
            text: "O nome desse animal é Flamingo",
            image: <img src={flamingo} />,
            audio: flamingoAudio,
            id: 2,
        },
    ];



    return (
        <div className="d-flex align-items-center justify-content-center">
            {showAnimals ? (
                <div className="learn-container text-center">
                    <div className="jumbotron how-to-play-jumbo">
                        <h1 className="display-4">Aprendendo sobre os animais</h1>
                        <div>
                            {animals[currentAnimal].image}
                        </div>
                        <hr className="my-4"></hr>

                        <h2>{animals[currentAnimal].text}</h2>
                        <h2>Escute o som desse animal: <button type="button" class="btn btn-warning" onClick={() => playClicked(animals[currentAnimal].audio)}><img src="/static/images/playIcon.png" /></button></h2>
                        <a class="btn btn-primary btn-lg" href="#" role="button" onClick={() => nextClicked()}>Próximo</a>
                    </div>
                </div>
            ) :
                (
                    <div className="text-center no-more-animals">
                        <div class="jumbotron my-5">
                            <h1 class="display-4">FIM!</h1>
                            <p class="lead">Você acabou de aprender sobre os animais! Está na hora de jogar</p>
                            <hr class="my-4"></hr>
                            <div className="row justify-content-around">
                                <div className="d-flex justify-content-center"><a href="/level1"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 1</button></a></div>
                                <div className="d-flex justify-content-center"><a href="/level2"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 2</button></a></div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Learn;