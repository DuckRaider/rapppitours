import { useEffect, useState } from "react"
import { getBrowserLocation } from "../services/browserLocation";

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
    
    useEffect(()=>{
    },[expanded])
    //get the browser location from extern function
    useEffect(()=>{
        //handle the promise
        getBrowserLocation()
        .then(data => setBrowserLocation(data))
    },[])

    function changeExpanded(){
        if(expanded) setExpanded(false)
        else setExpanded(true)
 
        getRoute()
    }

    //get the route from browser location to destination
    async function getRoute(){
        const response = await fetch("https://api.mapbox.com/directions/v5/mapbox/cycling/" + browserLocation.coords.latitude + "," + browserLocation.coords.longitude + ";" + trail.lat + "," + trail.lon +"?access_token=pk.eyJ1IjoiZHVja3JhaWRlciIsImEiOiJjbGhrcG1hdGIwdTZ4M2xueDB5dnpyMnVwIn0.RQSdniof4I240SVxhPc4KQ");
        const jsonData = await response.json();

        try{
            console.log(jsonData)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <>
        <li className="liTrailInList">
            <div className="divTrailInList" style={{backgroundColor: expired ? '#FF4D4D' : 'white'}}>
                <div className="divContentTrailInList">
                    <h1>{trail.name}</h1>
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