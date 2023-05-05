import { useState } from "react"
import { Link } from "react-router-dom"

export function AddTrail({onSubmit}){
    const [newTrail,setNewTrail] = useState({id:crypto.randomUUID,name:""})

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
                <input type="text" onChange={e=>setNewTrail({id:newTrail.id,name:e.target.value})}/>
                Name
            </label>
            <button>Add</button>
        </form>
        </>
    )
}