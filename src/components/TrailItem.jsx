import { useEffect, useState } from "react"
import { getBrowserLocation } from "../services/browserLocation";
import { Map } from "./Map";
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

    return(
        <>
        <li className="liTrailInList">
            <div className="divTrailInList" style={{backgroundColor: expired ? '#FF4D4D' : 'white'}}>
                <div className="divContentTrailInList">
                    <h1>{trail.name}
                    </h1>
                    <p>Geplant für: {trail.date}</p>
                    <p>Wetterbedingung: {trail.date}</p>
                    <p>Ortschaft: {trail.city} {trail.lat} {trail.lon}</p>
                    {/*the '?' checks if it isn't null -> coords is optional.
                    If coords isn't available, it won't print anything*/}
                    <p>Test: {browserLocation.coords?.latitude}</p>
                    <h2 style={{display: expired ? 'block' : 'none'}}>Abgelaufen</h2>


                    {expanded && (
                        <div className="expandedDivInTrail" style={{backgroundColor: expired ? 'red' : 'rgb(241, 255, 255)'}}>
                            <h3>EXPANDED</h3>
                            {mapLoaded && (
                                <Map trail={trail} browserLocation={browserLocation}/>
                            )}
                            {weatherData != null && (
                                <>
                                    <img src={getWeatherIconURL(weatherData.atTime.WeatherIcon)}></img> 
                                    <img src={getWeatherIconURL(weatherData.timeLater.WeatherIcon)}></img>
                                </>
                            )}
                        </div>
                    )}


                    <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                    <button className="btn btn-primary" onClick={() => changeExpanded()}>Expand</button>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={trail.completed} onChange={e => toggleTrail(trail.id, e.target.checked)}/>
                </div>
            </div>
        </li>
        </>
    )
}