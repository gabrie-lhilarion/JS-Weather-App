import Dom from './dom';

const Weather = (() => {
  const getWeather = async (location) => {
    try {
      const key = 'ee8f07d3dc0822c9454ff3c4ba6c3f02';
      const getDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`,
        { mode: 'cors' });
      const jsonData = await getDetails.json();
      return jsonData;
    } catch (error) {
      console.log(`Error:  ${error}`);
    }
    return '';
  };

  const weatherData = () => {
    const searchButton = document.getElementById('submit-city');
    searchButton.onclick = () => {
      const element = document.getElementById('centered');
      if (Dom.inputsAreValid(element)) {
        const location = document.getElementById('city').value.trim();
        getWeather(location).then((response) => {
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