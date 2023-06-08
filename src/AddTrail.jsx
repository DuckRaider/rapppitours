import { useEffect, useState } from "react"
import { auth } from "./configs/firebase"

export function AddTrail({onSubmit}){
    const [newTrail,setNewTrail] = useState({id:crypto.randomUUID,name:"",date:"yyyy-MM-ddThh:mm",city:"", lat:0, lon:0, user:"", completed: false},)
    //a general state which turns false if any kind of validationerror appears
    const [errorAppeared, setErrorAppeared] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()
        if(newTrail === "") return

        //if valid attributes
        //date validation with TT.mm.jjjj is bad -> repair
        //we should validate through everything and then set the errorAppeared
        //if something failed
        if(newTrail.name != "" && newTrail.date != "yyyy-MM-ddThh:mm"){
            await getLatLonByCity(newTrail.city)
            checkIfDateInFuture();
            checkIfUserSignedIn()

            //check if any error appeared
            if(errorAppeared == false){
                newTrail.user = auth.currentUser.uid
                console.log(newTrail.user)
                newTrail.completed = false
                onSubmit(newTrail)

                setNewTrail({id:crypto.randomUUID,name:"",date:"yyyy-MM-ddThh:mm", city:"", user:"", completed:false})

                clearAlerts();
            }

            setErrorAppeared(false)
        }
    }
    
    //create a warning according with message as parameter
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    function appendAlert(message, type){
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }
    //remove all alerts from UI
    function clearAlerts(){
        alertPlaceholder.innerHTML = "";
    }

    //get the lat and lon by city name
    async function getLatLonByCity(city){
        const response = await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=b09d2cf09c95da5786773b1ed1567222");
        const jsonData = await response.json();

        try{
            newTrail.lat = jsonData[0].lat
            newTrail.lon = jsonData[0].lon
        }catch(error){
            appendAlert("City doesn't exist","danger")
            newTrail.city = ""

            //Somehow doesn't set true
            setErrorAppeared(...true)
        }
    }
    function checkIfDateInFuture(){
        let selectedDate = new Date(newTrail.date)
        let today = new Date()

        if(today > selectedDate){
            appendAlert("Date must be in future","danger")
            setErrorAppeared(...true)
        }
    }
    function checkIfUserSignedIn(){
        if(auth.currentUser == null){
            appendAlert("No user signed in","danger")
            setErrorAppeared(...true)
        }
    }

    return(
        <div id="divAddTrail">
            <form id="formAddTrail" onSubmit={handleSubmit}>
                <label>
                    Name
                    <input value={newTrail.name} class="form-control" type="text" onChange={e=>setNewTrail({id:newTrail.id,name:e.target.value, date:newTrail.date, city:newTrail.city})}/>
                </label>
                <label>
                    Datum
                    <input value={newTrail.date} id="startDate" className="form-control" type="datetime-local" onChange={e=>setNewTrail({id:newTrail.id,name:newTrail.name, date:e.target.value, city:newTrail.city})}/>
                </label>
                <label>
                    Stadt
                    <input value={newTrail.city} class="form-control" type="text" onChange={e=>setNewTrail({id:newTrail.id,name:newTrail.name, date:newTrail.date, city:e.target.value})}/>
                </label>
                <button class="btn btn-primary">Add</button>
                <div id="liveAlertPlaceholder"></div>
            </form>
        </div>
    )
}