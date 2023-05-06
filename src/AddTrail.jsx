import { useState } from "react"

export function AddTrail({onSubmit}){
    const [newTrail,setNewTrail] = useState({id:crypto.randomUUID,name:"",date:"yyyy-MM-dd"})

    function handleSubmit(e){
        e.preventDefault()
        if(newTrail === "") return

        //if valid date and name
        if(newTrail.name != "" && newTrail.date != "TT.mm.jjjj"){
            let selectedDate = new Date(newTrail.date)
            let today = new Date()

            if(today <= selectedDate){
                onSubmit(newTrail)

                setNewTrail({id:crypto.randomUUID,name:"",date:"TT.mm.jjjj"})

                clearAlerts();
            }else{
                appendAlert("Das Datum darf nicht in der Vergangenheit liegen!","danger")
            }
        }
    }
    
    //warnings
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
    function clearAlerts(){
        alertPlaceholder.innerHTML = "";
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>
                <input value={newTrail.name} class="form-control" type="text" onChange={e=>setNewTrail({id:newTrail.id,name:e.target.value, date:newTrail.date})}/>
                Name
            </label>
            <label>
                <input value={newTrail.date} id="startDate" className="form-control" type="date" onChange={e=>setNewTrail({id:newTrail.id,name:newTrail.name, date:e.target.value})}/>
                Datum
            </label>
            <button class="btn btn-primary">Add</button>
        </form>
        <div id="liveAlertPlaceholder"></div>
        </>
    )
}