import { Component, useEffect, useState } from "react"
import { getBrowserLocation } from "../services/browserLocation";
import { Map } from "./Map";
import { FahrenheitToCelsius } from "../services/FahrenheitToCelsius";
import { getWeatherIconURL } from "../services/weatherIcon";
import { getWeather2Hours } from "../services/weatherFunctions";
import { WeatherAtTime } from "./WeatherAtTime";
import { WeatherLater } from "./WeatherLater";

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

        if(browserLocation.coords != null && expired == false && expanded == true){
            console.log(trail.name + " makes weather request")
            //works with expanded == true
            getWeather2Hours(
                browserLocation.coords.latitude,
                browserLocation.coords.longitude,
                trail).then((result) => setWeatherData(result));
        }
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
                        <p>Destination: {trail.city}</p>

                        {expanded && (
                            <div className="expandedDivInTrail" style={{backgroundColor: expired ? '#ff9f9f' : trail.completed ? '#9effb2' : '#caeefd', borderColor: expired ? '#ff9f9f' : trail.completed ? '#9effb2' : '#caeefd'}}>
                                <h3>Expanded</h3>
                                {mapLoaded && (
                                    <Map trail={trail} browserLocation={browserLocation}/>
                                )}
                                {weatherData != null ?(
                                    <div className="weatherNowAndAfterContainer">
                                        <WeatherAtTime weatherData={weatherData}/>
                                        <WeatherLater weatherData={weatherData}/>
                                    </div>
                                ):
                                <h3>Weather data not available! Too far in future or already expired!</h3>}
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