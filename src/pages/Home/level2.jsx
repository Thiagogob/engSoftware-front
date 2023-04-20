import "./style.css"
const Level1 = () => (
    <div className="container">
        <div className="jumbotron jumbotron-fluid animal-jumbotron">
            <div className="container">
                <div className="animal-img d-flex justify-content-center"><img src={"/static/images/oncapintada.png"} alt="" /></div>
                <div className="d-flex justify-content-center">
                    <p class="lead">Qual o nome desse animal: </p>
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-primary btn-decoration mx-auto btn-animal">Onça</button>
                    <button type="button" className="btn btn-primary btn-decoration mx-auto btn-animal">Cavalo</button>
                    <button type="button" className="btn btn-primary btn-decoration mx-auto btn-animal">Cachorro</button>
                </div>
            </div>
        </div>
    </div>
);

export default Level1;