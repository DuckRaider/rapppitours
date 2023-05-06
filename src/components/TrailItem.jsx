export function TrailItem({trail, deleteTrail}){
    return(
        <>
        <li>
            <h1>{trail.name}</h1>
            <button class="btn btn-primary" onClick={() => deleteTrail(trail.id)}>Delete Trail</button>
        </li>
        </>
    )
}