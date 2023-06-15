import { useAnimals } from "../../hooks/useAnimals";
import "./style.css";

const Levels = () => {
    const { animals } = useAnimals()

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <h1 className="my-3 project-text">Seleção de Fase: <span className="badge badge-secondary"></span></h1>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-4 card-border">
                    <img src={"/static/images/level1.png"} className="card-img-top img-level" alt="..."></img>
                    <div className="card-body card-bg">
                        <h5 className="card-title d-flex justify-content-center">Fase 1</h5>
                        <p className="card-text justify-card-text">Nessa fase, o jogador é apresentado a diferentes espécies de animais da fauna brasileira e é desafiado a identificá-los pelo nome e pelo som que eles emitem.</p>
                        <div className="d-flex justify-content-center"><a href="/level1"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 1</button></a></div>
                    </div>
                </div>
                <div className="col-1"></div>
                <div className="col-4 card-border">
                    <img src={"/static/images/level2.png"} className="card-img-top img-level" alt="..."></img>
                    <div className="card-body card-bg">
                        <h5 className="card-title d-flex justify-content-center">Fase 2</h5>
                        <p className="card-text justify-card-text">Nessa fase, o jogador é desafiado a encontrar e fotografar diferentes espécies de animais que habitam as florestas, pantanais, e outros ecossistemas do Brasil.</p>
                        <div className="d-flex justify-content-center"><a href="/level2"><button type="button" className="btn btn-primary btn-decoration">Jogar Fase 2</button></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Levels;
