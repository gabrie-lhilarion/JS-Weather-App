import Dom from './dom'

const Weather = (() => {

const app = () => {
    Dom.displaySearchedCity(1);
    Dom.displayRandomCity(4);
    Dom.changeTemperatureUnit();
}

return {
    app
};

})();

export default Weather;