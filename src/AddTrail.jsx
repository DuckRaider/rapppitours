import { useState } from "react"
import { Link } from "react-router-dom"

export function AddTrail({onSubmit}){
    const [newTrail,setNewTrail] = useState({id:crypto.randomUUID,name:"",date:null})

    function handleSubmit(e){
        e.preventDefault()
        if(newTrail === "") return

        onSubmit(newTrail)

        setNewTrail("")
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>
                <input class="form-control" type="text" onChange={e=>setNewTrail({id:newTrail.id,name:e.target.value, date:newTrail.date})}/>
                Name
            </label>
            <label>
                <input id="startDate" className="form-control" type="date" onChange={e=>setNewTrail({id:newTrail.id,name:newTrail.name, date:e.target.value})}/>
                Datum
            </label>
            <button class="btn btn-primary">Add</button>
        </form>
        </>
    )
}