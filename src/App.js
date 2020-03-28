import React from 'react';
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { CovidWorldMap } from './pages/CovidWorldMap';

function App() {
  return (
    <div className="App">
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/"><strong>#Covid19Map</strong></a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start"></div>

            <div className="navbar-end">
              <div className="navbar-item">
                <a className="bd-navbar-icon navbar-item" href="https://github.com/MuhamadIsmuaji/covid19map" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="columns">
          <div className="column is-full has-text-centered">
            <h2 className="title">#Covid19Map</h2>
            <h4 className="subtitle">Data based on <a className="has-text-primary" href="https://kawalcorona.com" target="_blank" rel="noopener noreferrer">kawalcorona.com</a></h4>
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <div className="mapContainer">
              <CovidWorldMap />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <p className="has-text-grey-light has-text-centered">
              Made by <a className="has-text-primary" href="https://github.com/MuhamadIsmuaji" target="_blank" rel="noopener noreferrer">Muhamad Ismuaji Prajitno</a>.&nbsp;
              Thanks to <a className="has-text-primary" href="https://kawalcorona.com" target="_blank" rel="noopener noreferrer">kawalcorona.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
