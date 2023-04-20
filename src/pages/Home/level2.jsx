import { useEffect, useState } from "react";
import "./level2.css"
import { motion } from "framer-motion"
import Camera from "../../components/camera/camera";

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
            x: mousePosition.x - 64,
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
            <motion.div
                className="cursor"
                variants={variants}
                animate="default"
                transition={{ duration: 0.01, ease: "easeInOut" }}
                onClick={flash}
            >
            <img className="camera-size" src={"/public/static/images/cameraBack.png"} alt="" />
            </motion.div>
            
        </div>
    );
}

export default Level2;