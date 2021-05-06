const Dom = (() => {

    function displaySearchedCity(city) {
        console.log(`Only ${city} city`);
    }

    function displayRandomCity(cities) {
        console.log(`${cities} cites`);
    }

    const changeTemperatureUnit = (unit = null) => {
        const currentUnit = `unit is ${unit}`;
        console.log(`${unit === null ? 'No unit suplied' :  currentUnit}`);
    }

    return {
        displayRandomCity,
        displaySearchedCity,
        changeTemperatureUnit
    }
})();


export default Dom;