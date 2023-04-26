import "./style.css";
const Home = () => (
    <div className="container">
      <div className="menu-box jumbotron">
        <h1 className="display-4 project-text my-4">Fauna Snapshot</h1>
        <a href="/levels"><button type="button" className="btn btn-outline-secondary btn-play my-2">Jogar</button></a>
        <p className="lead how-to-play-secondary"><img src={"/static/images/mouse.png"} alt="" /><b className="how-to-play-main">  Como jogar: </b>Clique no botão "Jogar" para começar.<br />
        Mais instruções aparecerão no decorrer do jogo. 
        </p>
      </div>
    </div>

);

export default Home;
