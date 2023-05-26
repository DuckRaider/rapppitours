// Key: iYmE9BRLFrzHnUsE1E9ecPTC9LsO3ulq

const apiKey = "iYmE9BRLFrzHnUsE1E9ecPTC9LsO3ulq";

export function getWeather2Hours(lat, lon){
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`;

    fetch(locationUrl)
    .then(res => res.json())
    .then(data => {
        const locationKey = data.Key;
        return getWeather(locationKey);
    })
    .catch(error => console.log(error))
}

function getWeather(locationKey){
    const weatherUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`;

    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(locationKey)
        console.log(data)

        return data;
    })
    .catch(error => console.log(error))
}