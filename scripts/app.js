const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');

const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();
//console.log(forecast);

const updateUI = (data) => {

    //const cityDets = data.cityDets;
    //const weather = data.weather;
    
    //Destructure properties
    const {cityDets, weather} = data;
    //console.log(data);
    //Update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-3">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //Update the night/day and icon

    const iconSrc =`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    /*let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    } else {
        timeSrc= 'img/night.svg';
    }*/
    timeSrc = weather.IsDayTime ? 'img/day.svg':'img/night.svg';

    time.setAttribute('src', timeSrc);

    //Remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };

};


/*const updateCity = async (city) => {
    //console.log(city);

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };

;}*/

cityForm.addEventListener('submit', e => {
    e.preventDefault(); //Prevent refresh

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //Updaye UI
    forecast.updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err));

    //Set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
   forecast.updateCity(localStorage.getItem('city'))
   .then( data => updateUI(data))
   .catch(err => console.log(err));
}