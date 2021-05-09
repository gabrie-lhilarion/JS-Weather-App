import Dom from './dom';

const Weather = (() => {
  const getWeather = async (location, tempUnit) => {
    try {
      const key = 'ee8f07d3dc0822c9454ff3c4ba6c3f02';
      const getDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${tempUnit}`,
        { mode: 'cors' });

      const jsonData = await getDetails.json();
      Dom.changeTemperatureUnit(tempUnit);

      if (tempUnit === 'metric') {
        jsonData.celcius = Number(jsonData.main.temp).toFixed(0);
        jsonData.fahrenheit = ((jsonData.main.temp * (9 / 5)) + 32).toFixed(0);
      } else {
        jsonData.fahrenheit = Number(jsonData.main.temp).toFixed(0);
        jsonData.celcius = (jsonData.main.temp - 32) * (5 / 9).toFixed(0);
      }

      return jsonData;
    } catch (error) {
      Dom.changeTemperatureUnit(tempUnit);
      return { error };
    }
  };

  const weatherData = () => {
    const searchButton = document.getElementById('submit-city');
    searchButton.onclick = () => {
      const element = document.getElementById('centered');
      if (Dom.inputsAreValid(element)) {
        const location = document.getElementById('city').value.trim();
        const tempUnit = document.getElementById('temp-unit').value;
        getWeather(location, tempUnit).then((response) => {
          Dom.displayData(response);
          Dom.openModal();
        });
      }
    };
  };

  const app = () => {
    weatherData();
  };

  return {
    app,
  };
})();

export default Weather;