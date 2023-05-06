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

    useEffect(()=>{
        sortByName();
    },[])

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

    function deleteTrail(id){
        setTrails((currentTrails)=>{
            return currentTrails.filter(trail => trail.id !== id)
        })
    }

    //actually sorts by name and then by date
    function sortByName(){
        const sortedTrails = [...trails].sort((a, b) => {
        if (a.name === b.name) {
            return a.date > b.date ? 1 : -1;
        } else {
            return a.name > b.name ? 1 : -1;
        }
        });
        setTrails(sortedTrails);
    }

    function sortByDate(){
        let sortedTrails = [...trails].sort((a,b) => (a.date > b.date ? 1:-1))
        setTrails(sortedTrails)
    }

    return(
        <>
        <div id="buttonsTrailsPage">
            <button id="btnAddTrail" className="btn btn-primary" onClick={handleToggle}>Add Item</button>
            <button id="btnSortByName" className="btn btn-primary" onClick={sortByName}>Sortieren nach Name</button>
            <button id="btnSortByDate" className="btn btn-primary" onClick={sortByDate}>Sortieren nach Datum</button>
        </div>
        <div style={{display: hiddenStateAddTrail ? 'block' : 'none'}}><AddTrail onSubmit={addTrail}/></div>
        <TrailList trails={trails} deleteTrail={deleteTrail}/>
        </>
    )
}