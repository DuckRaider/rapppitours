import { useEffect, useState } from "react";
import { TrailList } from "./components/TrailList";
import { Link } from "react-router-dom";

export function TrailPage(){
    const [trails,setTrails] = useState(()=>{
        const localValue = localStorage.getItem("TRAILS")
        if(localValue == null) return []

        return JSON.parse(localValue)
    })

    useEffect(()=>{
        localStorage.setItem("TRAILS",JSON.stringify(trails))
    },[trails])

    /*for(let x = 0;x<4;x++){
        if(trails.length<5){
            setTrails((currentTrails)=>{
                return[
                    ...currentTrails,
                    {id:crypto.randomUUID(),name:"A Name"}
                ]
            })
        }
    }*/
    function addTrail(newTrail){
        setTrails((currentTrails) =>{
            return[
                ...currentTrails,
                {id:crypto.randomUUID(),name:newTrail.name}
            ]
        })
    }

    return(
        <>
        <Link to={'/addTrail/${addTrail}'}>Trail hinzufügen</Link>
        <TrailList trails={trails}/>
        </>
    )
}