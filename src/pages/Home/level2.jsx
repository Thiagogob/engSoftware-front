import { useEffect, useState } from "react";
import "./level2.css"
import { motion } from "framer-motion"

function Level2() {
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
            x: mousePosition.x - 150,
            y: mousePosition.y - 64
        }
    }

    function flash() {
        const sound = new Audio("/static/images/flashSoundEffect.mp3");
        sound.play();

        const img = document.createElement("img");
        img.src = "/static/images/flashEffect.jpg";
        img.style.opacity = "0.6";
        document.body.appendChild(img);
        setTimeout(() => {
            document.body.removeChild(img);
        }, 300);
    }

    
    return (

        <div className="container container-camera">

            <div>
                <motion.div
                    className="cursor"
                    variants={variants}
                    animate="default"
                    transition={{ duration: 0.01, ease: "easeInOut" }}
                    onClick={flash}
                >
                <img className="camera-size" src={"/static/images/cameraBack.png"} alt="" />
                </motion.div>
                <img src={"/static/images/araraMovimento.png"} alt="" />
                <img src={"/static/images/capivaraMovimento.png"} alt="" />
                <img src={"/static/images/crocodiloMovimento.png"} alt="" />
                <img src={"/static/images/flamingoMovimento.png"} alt="" />
                <img src={"/static/images/juburuMovimento.png"} alt="" />
                <img src={"/static/images/macacoMovimento.png"} alt="" />
                <img src={"/static/images/oncapintadaMovimento.png"} alt="" />

            </div>
            
            
        </div>
    );
}

export default Level2;