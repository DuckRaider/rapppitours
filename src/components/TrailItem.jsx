import { useEffect, useState } from "react"
import { getBrowserLocation } from "../services/browserLocation";
import { Map } from "./Map";
import { getWeatherIconURL } from "../services/weatherIcon";
import { getWeather2Hours } from "../services/weatherFunctions";

export function TrailItem({trail, deleteTrail, toggleTrail}){
    //in order to display the browser location async, we need a state
    const [browserLocation, setBrowserLocation] = useState({})
    const [expired, setExpired] = useState(()=>{
        let trailDate = new Date(trail.date)
        let today = new Date()

        if(trailDate < today) return true

        return false
    });
    const [expanded, setExpanded] = useState(false)
    //rename to locationLoaded
    const [mapLoaded, setMapLoaded] = useState(false)
    const [weatherData, setWeatherData] = useState()
    
    useEffect(()=>{
    },[expanded])
    //get the browser location from extern function
    useEffect(()=>{
        //handle the promise
        getBrowserLocation()
        .then(data => {
            setBrowserLocation(data);
            setMapLoaded(true);
        })
    },[])

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
                    {weatherData != null && (
                        <>
                        </>
                    )}
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