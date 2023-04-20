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
    return (

        <div className="container">
            <motion.div
                className="cursor"
                variants={variants}
                animate="default"
                transition={{ duration: 0.01, ease: "easeInOut" }}
            >
            <img className="camera-size" src={"/public/static/images/camera.png"} alt="" />
            </motion.div>
            
        </div>
    );
}

export default Level2;