import React, { Fragment, useEffect, useState } from 'react';
import $ from 'jquery';
import { getWeather } from './helper';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      getCity(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    city && getWeather(city, setWeather);
  }, [city]);

  const getCity = (lat, lng) => {
    const key = 'df8308a0998249edabd6575611dafef5';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${key}`;

    $.ajax({
      url: url,
      method: 'GET',
      success: ({ results }) => {
        setCity(results[0].components.city);
      },
    });
  };

  const convertToCelsius = value => {
    return parseInt((value - 32) / 1.8);
  };

  const { current_observation: observation, forecasts, location } = weather;

  return (
    <div className='weather-content'>
      <h2>Weather</h2>
      {weather ? (
        <Fragment>
          <section>
            <div className='location'>
              <span>{location.country}, </span>
              <span>{location.city}</span>
            </div>
            <div className='contidion'>
              <p>Wind speed: {observation.wind.speed} m/c</p>
              <p>
                Temperature:{' '}
                {convertToCelsius(observation.condition.temperature)} &#8451;
              </p>
              <p className='weather-state'>{observation.condition.text}</p>
            </div>
          </section>
          <section>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Min temperature</th>
                  <th>Max temperature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {forecasts.map((elem, index) => (
                  <tr key={index}>
                    <td key={elem.day + index}>{elem.day}</td>
                    <td key={elem.low + index}>
                      {convertToCelsius(elem.low)}
                      <span>&#8451;</span>
                    </td>
                    <td key={elem.high + index}>
                      {convertToCelsius(elem.high)}
                      <span>&#8451;</span>
                    </td>
                    <td key={elem.text + index}>{elem.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </Fragment>
      ) : (
        ''
      )}
    </div>
  );
};

export default Weather;
