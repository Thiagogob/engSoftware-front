import React, { useEffect, useState } from "react";
import "./level2.css";
import { motion } from "framer-motion";

function Level2() {

    const [showFinalResults, setFinalResults] = useState(false);
    const [photosLeft, setPhotosLeft] = useState(5);
    const [currentTask, setCurrentTask] = useState(0);
    const [score, setScore] = useState(0);



    const tasks = [
        {
            text: "Tire uma foto da Arara: ",
            options: [
                { id: 0, image: <img src="/static/images/araraMovimento.png" />, isCorrect: true },
                { id: 1, image: <img src="/static/images/macacoMovimento.png" />, isCorrect: false },
                { id: 2, image: <img src="/static/images/crocodiloMovimento.png" />, isCorrect: false },
            ],

        },
        {
            text: "Tire uma foto da Capivara: ",
            options: [
                { id: 0, image: <img src="/static/images/juburuMovimento.png" />, isCorrect: false },
                { id: 1, image: <img src="/static/images/flamingoMovimento.png" />, isCorrect: false },
                { id: 2, image: <img src="/static/images/capivaraMovimento.png" />, isCorrect: true },
            ],

        },
        {
            text: "Tire uma foto da Cobra: ",
            options: [
                { id: 0, image: <img src="/static/images/capivaraMovimento.png" />, isCorrect: false },
                { id: 1, image: <img src="/static/images/cobraMovimento.png" />, isCorrect: true },
                { id: 2, image: <img src="/static/images/oncapintadaMovimento.png" />, isCorrect: false },
            ],

        },
    ]

    const optionClicked = (isCorrect) => {
        if (isCorrect) {
            const sound = new Audio("/static/images/flashSoundEffect.mp3");
            sound.play();
            setPhotosLeft(photosLeft - 1);
            setScore(score + 1);
        }
        else {
            const sound = new Audio("/static/images/flashSoundEffect.mp3");
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

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    console.log(mousePosition);

    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        }
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 200,
            y: mousePosition.y - 80
        }
    }

    function flash() {
        setPhotosLeft(photosLeft - 1);
        if (photosLeft === 1) {
            setFinalResults(true);
        }
        const sound = new Audio("/static/images/flashSoundEffect.mp3");
        sound.play();
        document.body.appendChild(img);
        setTimeout(() => {
            document.body.removeChild(img);
        }, 300);
    }



    return (

        <div className="container container-camera">

            {showFinalResults ?

                <div className="final-results">
                    <div className="row d-flex justify-content-center">
                        <h2 className="text-light">{score} fotos corretas</h2>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="/level2">
                            <button type="button"
                                className="btn btn-primary btn-decoration mx-auto btn-animal btn-decoration">Recomeçar</button>
                        </a>
                        <a href="/level1">
                            <button type="button"
                                className="btn btn-primary btn-decoration mx-auto btn-animal btn-decoration">Jogar Fase 1</button>
                        </a>
                        <a href="/home">
                            <button type="button"
                                className="btn btn-primary btn-decoration mx-auto btn-animal btn-decoration">Sair</button>
                        </a>
                    </div>
                </div>


                :
                <div className="task-card">
                    {/*
                        <motion.div
                        className="cursor"
                        variants={variants}
                        animate="default"
                        transition={{ duration: 0.01, ease: "easeInOut" }}
                        onClick={flash}
                    >
                        <img className="camera-size" src={"/static/images/cameraBack.png"} alt="" />
                    </motion.div>
                    
                    
                    */}
                    <div className="row">
                        <div className="mx-auto">
                            <h2 className="d-flex justify-content-center project-text">{tasks[currentTask].text}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto">
                            <h2 className="project-text">{photosLeft} fotos restantes</h2>
                        </div>
                    </div>

                    <ul className="d-flex justify-content-center">
                        {tasks[currentTask].options.map((option) => {
                            return (

                                <li className="animal" onClick={() => optionClicked(option.isCorrect)} key={option.id}>

                                    <motion.li animate={{
                                        y: [0, 250, 0],
                                        x: [0, -100, 0],
                                    }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}>{option.image}</motion.li>


                                </li>

                            );
                        })}
                    </ul>

                </div>


            }



        </div>
    );
}

export default Level2;

{/*
<img src={"/static/images/araraMovimento.png"} alt="" />
                    <img onClick={flash} src={"/static/images/capivaraMovimento.png"} alt="" />
                    <img src={"/static/images/crocodiloMovimento.png"} alt="" />
                <img src={"/static/images/flamingoMovimento.png"} alt="" />
                <img src={"/static/images/juburuMovimento.png"} alt="" />
                <img src={"/static/images/macacoMovimento.png"} alt="" />
                <img src={"/static/images/oncapintadaMovimento.png"} alt="" />
                */
}