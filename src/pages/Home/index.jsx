import "./style.css";

const Home = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-nav">
      <a className="navbar-brand" href="#">
        <div className="text-nav">
          Fauna<b>Snapshot</b>
        </div>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <div className="text-nav">Instruções</div>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <div className="text-nav">Documentação</div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Home;
