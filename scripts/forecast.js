class Forecast {
    constructor() {
        this.key = 'DY08xgmMNxEinNHVOzGQGJsDIbqyJFPT';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
    
        return { cityDets, weather };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURL+query);
        const data = await response.json();

        return data[0];
    }
    async getWeather(cityId) {
        const query = `${cityId}?apikey=${this.key}`;

        const response = await fetch(this.weatherURL+query);
        const data = await response.json();
       
        return data[0];
    }
}

/*const key = 'DY08xgmMNxEinNHVOzGQGJsDIbqyJFPT'; //API Key

//Get weather information
const getWeather = async (cityId) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityId}?apikey=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();
    //console.log(data);
    return data[0];
}

//Get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return data[0];

}*/

/*getCity('Delhi').then((data) => {
    return getWeather(data.Key)
}).then(data => {
    console.log(data);
}).catch((err) => console.log(err));*/

//getWeather("202396");

