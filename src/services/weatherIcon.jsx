export function getWeatherIconURL(weatherIcon){
    let url;
    
    if(weatherIcon < 10){
        url = "https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/0" + weatherIcon + "-s.png"
    }else{
        url = "https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/" + weatherIcon + "-s.png"
    }

    console.log(url)
    return url;
}