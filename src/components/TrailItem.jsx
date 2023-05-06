export function TrailItem({trail, deleteTrail}){
    return(
        <>
        <li>
            <div className="divTrailInList">
                <h1>{trail.name} - {trail.date}</h1>
                <button className="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
            </div>
        </li>
        </>
    )
}