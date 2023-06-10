import { useEffect, useState } from "react"
import { FahrenheitToCelsius } from "../services/FahrenheitToCelsius";
import { getWeatherIconURL } from "../services/weatherIcon";

export function WeatherAtTime({weatherData}){
    const [daily, setDaily] = useState(false)

    useEffect(()=>{
        console.log(weatherData)
        if(typeof weatherData.atTime.Day !== "undefined"){
            setDaily(true)
            console.log("Its daily")
        }else{
            setDaily(false)
            console.log("Not Daily")
        }
    },[])

    return(
        <div className="weatherAtTime">
            {daily == false ? <div>
                <h4>At planned date</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.atTime?.WeatherIcon)}></img> 
                <p>{weatherData.atTime.IconPhrase}</p>
                <p>{`${FahrenheitToCelsius(weatherData.atTime.Temperature.Value)}°C`}</p>
                <p>{weatherData.atTime.Temperature.Value + "°F"}</p>
                <p>Precipitation probability: {weatherData.atTime.PrecipitationProbability}%</p>
            </div> : <div>
                <h4>2 hours later</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.atTime?.Day.Icon)}></img> 
                <p>{weatherData.atTime.Day.IconPhrase}</p>
                <p>{`${FahrenheitToCelsius(weatherData.atTime.Temperature.Maximum.Value)}°C`}</p>
                <p>{weatherData.atTime.Temperature.Maximum.Value + "°F"}</p>
                <p>Forecast is inaccurate due to a big gap between today and the planned date</p>
            </div>}

        </div>
    )
}