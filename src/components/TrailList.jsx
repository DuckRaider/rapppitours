import { TrailItem } from "./TrailItem";

export function TrailList({trails, deleteTrail}){
    return(
        <>
        <ul>
            {trails.length === 0 && "Keine Trails"}
            {trails.map(trail =>{
                return(
                    //Warum sollte hier eine Kopie von diesem Trail erstellt werden???? bzw. generell
                    <TrailItem {...trail} key={trail.id} trail={trail} deleteTrail={deleteTrail}/>
                )
            })}
        </ul>
        </>
    )
}