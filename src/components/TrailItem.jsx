import { useState } from "react"

export function TrailItem({trail, deleteTrail}){
    const [expired, setExpired] = useState(()=>{
        let trailDate = new Date(trail.date)
        let today = new Date()

        if(trailDate < today) return true

        return false
    });

    return(
        <>
        <li>
            <div className="divTrailInList" style={{backgroundColor: expired ? '#FF4D4D' : 'white'}}>
                <h1>{trail.name}</h1>
                <p>Geplant für: {trail.date}</p>
                <h2 style={{display: expired ? 'block' : 'none'}}>Abgelaufen</h2>
                <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                    </label>
                </div>
            </div>
        </li>
        </>
    )
}