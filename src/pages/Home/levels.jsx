import "./style.css";
const Levels = () => (

    <div className="container">
        <div className="row">
            <div className="col-6 card-border">
                <img src={"/public/static/images/level1.jpg"} class="card-img-top" alt="..."></img>
                <div class="card-body card-bg">
                    <h5 class="card-title d-flex justify-content-center">Fase 1</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            <div className="col-6 card-border">
                <img src={"/public/static/images/level2.jpg"} class="card-img-top" alt="..."></img>
                <div class="card-body card-bg">
                    <h5 class="card-title d-flex justify-content-center">Fase 2</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    </div>


);

export default Levels;
