export function TrailItem({trail, deleteTrail}){
    return(
        <>
        <li>
            <div className="divTrailInList">
                <h1>{trail.name}</h1>
                <p>Geplant für: {trail.date}</p>
                <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
            </div>
        </li>
        </>
    )
}