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
    const oncaAudio = new Audio("/static/images/somOnca.mp3");
    const macacoAudio = new Audio("/static/images/somMacaco.mp3");
    const flamingoAudio = new Audio("/static/images/somFlamingo.mp3");

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
                    <div className="jumbotron">
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
                    <div className="learn-container text-center">
                        <div className="jumbotron">
                                AAAAAAAAAAA
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Learn;