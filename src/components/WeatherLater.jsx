import { useEffect, useState } from "react"
import { FahrenheitToCelsius } from "../services/FahrenheitToCelsius";
import { getWeatherIconURL } from "../services/weatherIcon";

export function WeatherLater({weatherData}){
    const [daily, setDaily] = useState(false)

    useEffect(()=>{
        console.log(weatherData)
        if(typeof weatherData.timeLater.Day !== "undefined"){
            setDaily(true)
            console.log("Its daily")
        }else{
            setDaily(false)
            console.log("Not Daily")
        }
    },[])

    return(
        <div className="weatherTimeLater">
            {daily == false ? <div>
                {`${console.log(daily)}`}
                <h4>At planned date</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.timeLater?.WeatherIcon)}></img> 
                <p>{weatherData.timeLater.IconPhrase}</p>
                <p>{`${FahrenheitToCelsius(weatherData.timeLater.Temperature.Value)}°C`}</p>
                <p>{weatherData.timeLater.Temperature.Value + "°F"}</p>
                <p>Precipitation probability: {weatherData.timeLater.PrecipitationProbability}%</p>
            </div> : <div>
                <h4>At planned date</h4>
                <img className="weatherImages"  src={getWeatherIconURL(weatherData.timeLater?.Day.Icon)}></img> 
                <p>{weatherData.timeLater.Day.IconPhrase}</p>
                <p>{`${FahrenheitToCelsius(weatherData.timeLater.Temperature.Maximum.Value)}°C`}</p>
                <p>{weatherData.timeLater.Temperature.Maximum.Value + "°F"}</p>
                <p>Has Precipitation: {weatherData.timeLater.Day.HasPrecipitation}</p>
            </div>}

        </div>
    )
}