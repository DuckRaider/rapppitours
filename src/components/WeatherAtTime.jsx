import { useEffect } from "react"
import { FahrenheitToCelsius } from "../services/FahrenheitToCelsius";

export function WeatherAtTime({weatherData}){
    let daily = false;

    useEffect(()=>{
        if(typeof weatherData.Day !== "undefined"){
            daily = true;
        }else{
            daily = false;
        }
    })

    return(
        <div className="weatherAtTime">
            {daily == false ? (<div>
                <h4>At planned date</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.atTime?.WeatherIcon)}></img> 
                <p1>{weatherData.atTime.IconPhrase}</p1>
                <p1>{`${FahrenheitToCelsius(weatherData.atTime.Temperature.Value)}°C`}</p1>
                <p1>{weatherData.atTime.Temperature.Value + "°F"}</p1>
                <p1>Precipitation probability: {weatherData.atTime.PrecipitationProbability}%</p1>
            </div>) : (<div>
                <h4>At planned date</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.atTime?.Day.Icon)}></img> 
                <p1>{weatherData.atTime.Day.IconPhrase}</p1>
                <p1>{`${FahrenheitToCelsius(weatherData.atTime.Temperature.Maximum.Value)}°C`}</p1>
                <p1>{weatherData.atTime.Temperature.Maximum.Value + "°F"}</p1>
                <p1>Has Precipitation: {weatherData.atTime.Day.HasPrecipitation}</p1>
            </div>)}

        </div>
    )
}