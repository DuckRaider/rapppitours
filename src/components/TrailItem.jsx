import { Component, useEffect, useState } from "react"
import { getBrowserLocation } from "../services/browserLocation";
import { Map } from "./Map";
import { FahrenheitToCelsius } from "../services/FahrenheitToCelsius";
import { getWeatherIconURL } from "../services/weatherIcon";
import { getWeather2Hours } from "../services/weatherFunctions";

export function TrailItem({trail, deleteTrail, toggleTrail, browserLocation, mapLoaded}){
    //in order to display the browser location async, we need a state
    const [expired, setExpired] = useState(()=>{
        let trailDate = new Date(trail.date)
        let today = new Date()
        console.log(trail.date  )

        if(trailDate < today) return true

        return false
    });
    const [expanded, setExpanded] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    
    useEffect(()=>{
        console.log(browserLocation.coords)

        if(browserLocation.coords != null && expired == false){
            console.log(trail.name + " makes weather request")
            //works with expanded == true
            getWeather2Hours(
                browserLocation.coords.latitude,
                browserLocation.coords.longitude,
                trail).then((result) => setWeatherData(result));
        }
    },[browserLocation])
    useEffect(()=>{

    },[expanded])
    //get the browser location from extern function

    function changeExpanded(){
        if(expanded) setExpanded(false)
        else setExpanded(true)
    }

    function dateInCorrectFormat(){
        let trailDate = new Date(trail.date);

        return trailDate.toLocaleDateString("de") + " - " + trailDate.toLocaleTimeString("de")
    }

    return(
        <>
        <li className="liTrailInList">
            <div className="divTrailInList" style={{backgroundColor: expired ? '#ffc4c4' : trail.completed ? '#c4ffd0' : '#E1F5FE', borderColor: expired ? '#ffc4c4' : trail.completed ? '#c4ffd0' : '#E1F5FE'}}>
                <h2 className="nameTrail">{trail.name}</h2>
                {trail.completed && (<h3>Completed</h3>)}
                {expired && (<h3>Expired</h3>)}
                <div className="trailItemContentFlex">
                    <div className="divContentTrailInList">
                        <p>Planned for: {`${dateInCorrectFormat()}`}</p>
                        <p>Weather condition: {weatherData != null ? weatherData.atTime.IconPhrase + " - " + `${FahrenheitToCelsius(weatherData.atTime.Temperature.Value)}°C` : "Weather Condition not known yet"}</p>
                        <p>Destination: {trail.city}</p>

                        {expanded && (
                            <div className="expandedDivInTrail" style={{backgroundColor: expired ? '#ff9f9f' : '#caeefd', borderColor: expired ? '#ff9f9f' : trail.completed ? '#c4ffd0' : '#caeefd'}}>
                                <h3>Expanded</h3>
                                {mapLoaded && (
                                    <Map trail={trail} browserLocation={browserLocation}/>
                                )}
                                {weatherData != null ?(
                                    <div className="weatherNowAndAfterContainer">
                                        <div className="weatherAtTime">
                                            <h4>At planned date</h4>
                                            <img className="weatherImages"  src={getWeatherIconURL(weatherData.atTime?.WeatherIcon)}></img> 
                                            <p1>{weatherData.atTime.IconPhrase}</p1>
                                            <p1>{`${FahrenheitToCelsius(weatherData.atTime.Temperature.Value)}°C`}</p1>
                                            <p1>{weatherData.atTime.Temperature.Value + "°F"}</p1>
                                            <p1>Precipitation probability: {weatherData.atTime.PrecipitationProbability}%</p1>
                                        </div>
                                        <div className="weatherTimeLater">
                                            <h4>2 hours after planned date</h4>
                                            <img className="weatherImages" src={getWeatherIconURL(weatherData.timeLater?.WeatherIcon)}></img>
                                            <p1>{weatherData.timeLater.IconPhrase}</p1>
                                            <p1>{`${FahrenheitToCelsius(weatherData.timeLater.Temperature.Value)}°C`}</p1>
                                            <p1>{weatherData.timeLater.Temperature.Value + "°F"}</p1>
                                            <p1>Precipitation probability: {weatherData.timeLater.PrecipitationProbability}%</p1>
                                        </div>
                                    </div>
                                ):
                                <h3>Trail is expired! Weather data is irrelevant</h3>}
                            </div>
                        )}

                        <div className="buttonsInTrailItem">
                            <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                            <button className="btn btn-primary" onClick={() => changeExpanded()}>Expand</button>
                            <button className="btn btn-primary" onClick={() => toggleTrail(trail, !trail.completed)}>Done</button>
                        </div>
                    </div>

                    {/* <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={trail.completed} onChange={e => toggleTrail(trail, e.target.checked)}/>
                    </div> */}
                </div>
            </div>
        </li>
        </>
    )
}