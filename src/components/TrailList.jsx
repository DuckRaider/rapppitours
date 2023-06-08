import { TrailItem } from "./TrailItem";

export function TrailList({trails, deleteTrail, toggleTrail, getPosition, browserLocation, mapLoaded}){
    return(
        <>
        <ul>
            {trails.length === 0 && <h2 style={{textAlign:"center", marginTop:"80px", fontSize:"40px"}} id="noTrailsCreated">No trails created</h2>}
            {trails.map(trail =>{
                return(
                    //Warum sollte hier eine Kopie von diesem Trail erstellt werden???? bzw. generell
                    <TrailItem {...trail} key={trail.id} trail={trail} deleteTrail={deleteTrail} toggleTrail={toggleTrail} getPosition={getPosition} browserLocation={browserLocation} mapLoaded={mapLoaded}/>
                )
            })}
        </ul>
        </>
    )
}