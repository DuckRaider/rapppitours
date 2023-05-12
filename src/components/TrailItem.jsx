import { useState } from "react"

export function TrailItem({trail, deleteTrail, toggleTrail}){
    const [expired, setExpired] = useState(()=>{
        let trailDate = new Date(trail.date)
        let today = new Date()

        if(trailDate < today) return true

        return false
    });

    return(
        <>
        <li className="liTrailInList">
            <div className="divTrailInList" style={{backgroundColor: expired ? '#FF4D4D' : 'white'}}>
                <div className="divContentTrailInList">
                    <h1>{trail.name}</h1>
                    <p>Geplant für: {trail.date}</p>
                    <p>Wetterbedingung: {trail.date}</p>
                    <h2 style={{display: expired ? 'block' : 'none'}}>Abgelaufen</h2>
                    <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={trail.completed} onChange={e => toggleTrail(trail.id, e.target.checked)}/>
                </div>
            </div>
        </li>
        </>
    )
}