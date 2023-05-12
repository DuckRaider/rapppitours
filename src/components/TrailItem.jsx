import { useEffect, useState } from "react"

export function TrailItem({trail, deleteTrail, toggleTrail}){
    const [expired, setExpired] = useState(()=>{
        let trailDate = new Date(trail.date)
        let today = new Date()

        if(trailDate < today) return true

        return false
    });
    const [expanded, setExpanded] = useState(false)
    
    useEffect(()=>{

    },[expanded])

    function changeExpanded(){
        if(expanded) setExpanded(false)
        else setExpanded(true)
    }

    async function getRoute(position){
        const response = await fetch("https://api.mapbox.com/directions/v5/mapbox/cycling/" + position.coords.lat + "," + position.coords.lon + ";" + trail.lat + "," + trail.lon +"?access_token=pk.eyJ1IjoiZHVja3JhaWRlciIsImEiOiJjbGhrcG1hdGIwdTZ4M2xueDB5dnpyMnVwIn0.RQSdniof4I240SVxhPc4KQ");
        const jsonData = await response.json();

        try{
            newTrail.lat = jsonData[0].lat
            newTrail.lon = jsonData[0].lon
        }catch(error){
            appendAlert("Diese Stadt existiert nicht!","danger")
            newTrail.city = ""

            setErrorAppeared(true)
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