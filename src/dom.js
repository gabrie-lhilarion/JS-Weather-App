const Dom = (() => {
  const modalTitle = document.getElementById('staticBackdropLabel');
  const country = document.getElementById('country');
  const iconDiv = document.getElementById('iconDiv');
  const weatherDiv = document.getElementById('weatherDiv');
  const tempDiv = document.getElementById('temp');

  const changeTemperatureUnit = (unit = null) => {
    const currentUnit = `unit is ${unit}`;
    console.log(`${unit === null ? 'No unit suplied' : currentUnit}`);
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
    if (response.cod === '404') {
      return;
    }
    modalTitle.textContent = `Search for ${response.name}`;
    country.textContent = response.sys.country;
    weatherDiv.textContent = response.weather[0].description;
    tempDiv.textContent = response.main.temp;
    iconDiv.innerHTML = `<img src='http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png'>`;
  };

  return {
    changeTemperatureUnit,
    inputsAreValid,
    openModal,
    displayData,
  };
})();

export default Dom;