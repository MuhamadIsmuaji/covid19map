import React from 'react';
import countries from '../json/country';
import { API } from '../global/API';
import _ from 'lodash';
import Highcharts from 'highcharts';
import highchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import worldMapData from "@highcharts/map-collection/custom/world.geo.json";
import { useState, useEffect } from 'react';

export const CovidWorldMap = () => {
  const [worldMapCovidData, setworldMapCovidData] = useState([]);

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

      setworldMapCovidData(countries);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const mapOptions = {
    chart: {
      height: 650,
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
      pointFormat: `<span style="font-size: 25px;"><strong>{point.name}</strong></span><br/>
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
      data: worldMapCovidData,
      mapData: worldMapData,
      joinBy: ['iso-a3', 'code3'],
      name: 'Total Kasus',
    }]
  }

  highchartsMap(Highcharts);

  return (
    <div className="panel">
      <div className="panel-block">
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <HighchartsReact
                constructorType ={'mapChart'}
                highcharts={Highcharts}
                options={mapOptions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}