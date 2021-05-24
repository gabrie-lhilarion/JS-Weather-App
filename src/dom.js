const Dom = (() => {
  const modalTitleDiv = document.getElementById('staticBackdropLabel');
  const countryDiv = document.getElementById('country');
  const iconDiv = document.getElementById('iconDiv');
  const weatherDiv = document.getElementById('weatherDiv');
  const tempDiv = document.getElementById('temp');
  const humidityDiv = document.getElementById('humidityDiv');

  const changeTemperatureUnit = (tempUnit) => {
    const tempUnits = document.getElementById('temp-units');
    const imperial = document.getElementById('imperial');
    const metric = document.getElementById('metric');

    const convertToMetric = () => {
      tempDiv.textContent = tempDiv.getAttribute('data-celcius');
    };

    const convertToImperial = () => {
      tempDiv.textContent = tempDiv.getAttribute('data-fahrenheit');
    };

    const highlightUnit = (unit = null) => {
      tempUnits.querySelectorAll('button').forEach((elem) => {
        elem.classList.remove('btn-primary');
      });

      if (unit === 'imperial') { imperial.classList.add('btn-primary'); }
      if (unit === 'metric') { metric.classList.add('btn-primary'); }
    };

    highlightUnit(tempUnit);

    imperial.onclick = (e) => {
      if (!e.target.classList.contains('btn-primary')) {
        const temp = Number(tempDiv.getAttribute('data-temp'));
        highlightUnit(e.target.id);
        convertToImperial(temp);
      }
    };

    metric.onclick = (e) => {
      if (!e.target.classList.contains('btn-primary')) {
        const temp = Number(tempDiv.getAttribute('data-temp'));
        highlightUnit(e.target.id);
        convertToMetric(temp);
      }
    };
  };

  const inputsAreValid = (element) => {
    let inputErrors = 0;
    const projectIputs = element.querySelectorAll('input, select');

    projectIputs.forEach((input) => {
      if (!input.value.trim().length) {
        inputErrors += 1;
        input.style.borderColor = 'red';
      }
    });

    projectIputs.forEach((input) => input.addEventListener('focus', (e) => {
      e.target.style.borderColor = '#ccc';
    }));

    if (inputErrors) { return false; } return true;
  };

  const openModal = () => {
    const modalOverlay = document.getElementById('staticBackdropbutton');
    modalOverlay.click();
  };

  const displayData = (response) => {
    if (response.cod === '404' || response.error) {
      modalTitleDiv.innerHTML = '<h4>There was an error</h4>';
      countryDiv.innerHTML = response.error
        ? '<h1 class="bg-light text-danger text-center">City may not exist</h1>'
        : `<h1 class="bg-light text-danger text-center">${response.message}</h1>`;
      weatherDiv.textContent = '';
      humidityDiv.textContent = '';
      tempDiv.textContent = '';
      iconDiv.innerHTML = '';
    } else {
      modalTitleDiv.textContent = `Weather in ${response.name}`;
      countryDiv.innerHTML = `<span class="weather_info"> ${response.name}, ${response.sys.country}</span>`;
      weatherDiv.innerHTML = `<span class="weather_info">Weather: ${response.weather[0].main}, ${response.weather[0].description}</span>`;
      humidityDiv.innerHTML = `<span class="weather_info">Humidity: ${response.main.humidity}</span>`;
      tempDiv.textContent = `${Number(response.main.temp).toFixed(0)}`;
      tempDiv.setAttribute('data-celcius', response.celcius);
      tempDiv.setAttribute('data-fahrenheit', response.fahrenheit);
      iconDiv.innerHTML = `<img src='http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png'>`;
    }
  };

  const getBackground = async() => {

    const keyGen = () => {
      let key = 0;
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      const charsLen = arr.length;
      
        key += arr[Math.floor(Math.random() * charsLen)];
      
      return key;
    }

    const index = Number(keyGen());

      try {
      const API_KEY = '21528622-e883b65787e3191b2aeaddd4d';
      const URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('clouds')+"&category="+encodeURIComponent('background');
      const getImage = await fetch( URL, {mode: 'cors'});
      const jsonDate =  await getImage.json();
      return jsonDate.hits[index].largeImageURL;

      } catch(error) {
        console.log(error);
        return error;
      }

  }

  return {
    changeTemperatureUnit,
    inputsAreValid,
    openModal,
    displayData,
    getBackground
  };
})();

export default Dom;