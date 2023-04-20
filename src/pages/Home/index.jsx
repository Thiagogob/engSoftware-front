import "./style.css";
const Home = () => (
  <body>
    <div className="container">
      <div class="menu-box jumbotron">
        <h1 class="display-4 project-text my-4">Fauna Snapshot</h1>
        <a href="/levels"><button type="button" class="btn btn-outline-secondary btn-play my-2">Jogar</button></a>
        <p class="lead how-to-play-secondary"><img src={"/static/images/mouse.png"} alt="" /><b className="how-to-play-main">  Como jogar: </b>Aponte o mouse para os animais<br /> 
        e clique com o botão direito do mouse</p>
      </div>
    </div>
  </body>

);

export default Home;
