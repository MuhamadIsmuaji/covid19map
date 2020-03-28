import React, { useEffect, useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import countries from './json/country.json';
import { API } from './global/API';
import _ from 'lodash';

import Highcharts from 'highcharts';
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import mapDataIE from "@highcharts/map-collection/custom/world.geo.json";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await API.get();
      let temp = null;
      _.each(countries, (value, key) => {
        temp = _.find(data, (o) => {
          return o.attributes.Country_Region === value.name || o.attributes.Country_Region === value.code || value.name.includes(o.attributes.Country_Region);
        });

        countries[key].Deaths = countries[key].Recovered = countries[key].Active = countries[key].value = 0;
        if (typeof temp !== 'undefined') {
          countries[key].Deaths = temp.attributes.Deaths;
          countries[key].Recovered = temp.attributes.Recovered;
          countries[key].Active = temp.attributes.Active;
          countries[key].value = temp.attributes.Confirmed;
        }
      });

      setData(countries);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const mapOptions = {
    chart: {
        height: 750,
        map: 'custom/world'
    },

    title: {
        text: null
    },

    legend: {
        title: {
          text: 'Total Kasus',
        }
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    tooltip: {
        useHTML: true,
        headerFormat: '',
        pointFormat: `<span style="font-size: 30px;"><strong>{point.name}</strong></span><br/>
          <span style="font-size: 20px;">Positif: {point.Active}</span><br/>
          <span style="font-size: 20px;">Sembuh: {point.Recovered}</span><br/>
          <span style="font-size: 20px;">Meninggal: {point.Deaths}</span><br/>
          <span style="font-size: 20px;">Total Kasus: {point.value}</span>`,
    },

    colorAxis: {
        min: 1,
        max: 1000,
        minColor: '#efecf3',
        maxColor: '#990041',
    },

    series: [{
        data: data,
        mapData: mapDataIE,
        joinBy: ['iso-a3', 'code3'],
        name: 'Total Kasus',
        states: {
            hover: {
                color: '#a4edba'
            }
        }
    }]
  }

  highchartsMap(Highcharts);

  return (
    <div className="App">
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#"><strong>#Covid19Map</strong></a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a className="bd-navbar-icon navbar-item" href="https://github.com/MuhamadIsmuaji" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </div>
          </div>
        </div>
        </div>
      </nav>
      <div className="container" style={{ marginTop: '10px' }}>
        <div className="columns">
          <div className="column is-full">
            <h1 className="title">#Covid19Map</h1>
            <h2 className="subtitle">Data based on <a className="has-text-primary" href="https://kawalcorona.com" target="_blank" rel="noopener noreferrer">kawalcorona.com</a></h2>
          </div>
        </div>
        <div className="columns">
          <div className="column is-full">
            <div className="mapContainer">
              <HighchartsReact
                constructorType ={'mapChart'}
                highcharts={Highcharts}
                options={mapOptions}
              />
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
