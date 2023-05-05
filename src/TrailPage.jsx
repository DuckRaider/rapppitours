import { useEffect, useState } from "react";
import { TrailList } from "./components/TrailList";
import { Link } from "react-router-dom";
import { AddTrail } from "./AddTrail";

export function TrailPage(){
    const [trails,setTrails] = useState(()=>{
        const localValue = localStorage.getItem("TRAILS")
        if(localValue == null) return []

        return JSON.parse(localValue)
    })
    const [hiddenStateAddTrail,setHiddenStateAddTrail] = useState(false)

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

    //toggle the AddTrail UI (hide/show)
    const handleToggle = () =>{
        setHiddenStateAddTrail(!hiddenStateAddTrail)
    }

    function addTrail(newTrail){
        setTrails((currentTrails)=>{
            return [
                ...currentTrails,
                {id:crypto.randomUUID(),name:newTrail.name,date:newTrail.date}
            ]
        })
    }

    return(
        <>
        <button onClick={handleToggle}>Add Item</button>
        <div style={{display: hiddenStateAddTrail ? 'block' : 'none'}}><AddTrail onSubmit={addTrail}/></div>
        <TrailList trails={trails}/>
        </>
    )
}