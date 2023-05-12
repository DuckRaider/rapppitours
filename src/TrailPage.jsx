import { useEffect, useState } from "react";
import { TrailList } from "./components/TrailList";
import { Link } from "react-router-dom";
import { AddTrail } from "./AddTrail";

export function TrailPage(){
    //Hooks
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
        sortByDate();

        //get the browser location
        async function getPosition(){
            try {
                const position = await new Promise((resolve, reject) => 
                    navigator.geolocation.getCurrentPosition(resolve, reject)
                );
    
                console.log(position.coords.latitude, position.coords.longitude)
    
                return position;
            } catch (error) {
                console.log(error)
            }
        }

        //handle the data in order to execute an await function inside a useEffect
        async function fetchData() {
            const position = await getPosition();
    
            if (position) {
                console.log(position)
            }
        }
    
        fetchData();
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

    //More functions
    //toggle the AddTrail UI (hide/show)
    const handleToggle = () =>{
        setHiddenStateAddTrail(!hiddenStateAddTrail)
    }

    function addTrail(newTrail){
        setTrails((currentTrails)=>{
            return [
                ...currentTrails,
                {id:crypto.randomUUID(),name:newTrail.name,date:newTrail.date,city:newTrail.city,lat:newTrail.lat, lon:newTrail.lon}
            ]
        })
    }

    function deleteTrail(id){
        setTrails((currentTrails)=>{
            return currentTrails.filter(trail => trail.id !== id)
        })
    }

    function toggleTrail(id, completed){
        setTrails(currentTrails =>{
            return currentTrails.map(trail =>{
                if(trail.id === id){
                    return {...trail, completed}
                }

                return trail
            })
        })
    }

    //actually sorts by name and then by date
    function sortByName(){
        let sortedTrails = [...trails].sort((a,b) => (a.name > b.name ? 1:-1))
        setTrails(sortedTrails);
    }

    function sortByDate(){
        const sortedTrails = [...trails].sort((a, b) => {
            if (a.date === b.date) {
                return a.name > b.name ? 1 : -1;
            } else {
                return a.date > b.date ? 1 : -1;
            }
            });
        setTrails(sortedTrails)

    }


    //kind of a bad code
    let localWeather
    async function getLocalWeather(lat, lon){
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b09d2cf09c95da5786773b1ed1567222");
        const jsonData = await response.json();
        localWeather = jsonData
        console.log(localWeather)
    }

    return(
        <>
        <div className="text-center">
            <h1>Trails Übersicht</h1>
            <h2>Current Weather: {localWeather}</h2>
        </div>
        <div id="buttonsTrailsPage">
            <button id="btnAddTrail" className="btn btn-primary" onClick={handleToggle}>Add Item</button>
            <button id="btnSortByName" className="btn btn-primary" onClick={sortByName}>Sortieren nach Name</button>
            <button id="btnSortByDate" className="btn btn-primary" onClick={sortByDate}>Sortieren nach Datum</button>
        </div>
        <div style={{display: hiddenStateAddTrail ? 'block' : 'none'}}><AddTrail onSubmit={addTrail}/></div>
        <TrailList trails={trails} deleteTrail={deleteTrail} toggleTrail={toggleTrail}/>
        </>
    )
}