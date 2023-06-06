import { useEffect, useState } from "react";
import { TrailList } from "./components/TrailList";
import { Link } from "react-router-dom";
import { AddTrail } from "./AddTrail";
import { getBrowserLocation } from "./services/browserLocation";
import {db, auth} from './configs/firebase';
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    addDoc,
    setDoc,
  } from "firebase/firestore";

export function TrailPage(){
    //all the trails are stored here
    const [trails,setTrails] = useState(()=>{
        return []
    })

    //check if the add trail UI is available
    const [hiddenStateAddTrail,setHiddenStateAddTrail] = useState(false)
    const [browserLocation, setBrowserLocation] = useState({})
    const [mapLoaded, setMapLoaded] = useState(false)

    useEffect(()=>{
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.email);
            } else {
                console.log("User Signed Out");
            }
        });
        readDataFromDb();

        sortByDate();

        //handle the promise
        getBrowserLocation()
        .then(data => {
            setBrowserLocation(data);
            setMapLoaded(true);
        })

        //handle the data in order to execute an await function inside a useEffect
        // async function fetchData() {
        //     const position = await getPosition();
    
        //     if (position) {
        //         console.log(position)
        //     }
        // }
    
        // fetchData();
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

    async function readDataFromDb(){
        const collectionRef = collection(db, 'trails');

        const documentsArray = [];
        
        onSnapshot(query(collectionRef), (snapshot) => {
          snapshot.forEach((doc) => {
            if(doc.data().user == auth.currentUser.uid){
                documentsArray.push({id:doc.id,...doc.data()});
            }
          });
          setTrails(documentsArray)
          console.log(documentsArray)
          // Use the documentsArray here or perform any further operations
        });
    }

    const handleToggle = () =>{
        setHiddenStateAddTrail(!hiddenStateAddTrail)
    }

    async function addTrail(newTrail){
        await addDoc(collection(db,"trails"), {
            name: newTrail.name,
            date: newTrail.date,
            city: newTrail.city,
            lat: newTrail.lat,
            lon: newTrail.lon,
            user: newTrail.user
        })

        readDataFromDb();
        // setTrails((currentTrails)=>{
        //     return [
        //         ...currentTrails,
        //         {id:crypto.randomUUID(),name:newTrail.name,date:newTrail.date,city:newTrail.city,lat:newTrail.lat, lon:newTrail.lon}
        //     ]
        // })
    }

    async function deleteTrail(id){
        // setTrails((currentTrails)=>{
        //     return currentTrails.filter(trail => trail.id !== id)
        // })

        const deleteTrail = async (trailId) => {
            const trailRef = doc(db, 'trails', trailId);
          
            try {
              await deleteDoc(trailRef);
              console.log('Document successfully deleted.');
            } catch (error) {
              console.error('Error deleting document: ', error);
            }
          };

        deleteTrail(id)

        readDataFromDb();
    }

    //save trails when a trails gets checked
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
    // let localWeather
    // async function getLocalWeather(lat, lon){
    //     const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b09d2cf09c95da5786773b1ed1567222");
    //     const jsonData = await response.json();
    //     localWeather = jsonData
    //     console.log(localWeather)
    // }

    //get the browser location
    //useless, getBrowserLocation
    // async function getPosition(){
    //     try {
    //         const position = await new Promise((resolve, reject) => 
    //             navigator.geolocation.getCurrentPosition(resolve, reject)
    //         );

    //         console.log(position.coords.latitude, position.coords.longitude)

    //         return position;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return(
        <>
        <div className="text-center">
            <h1>Trails Übersicht</h1>
        </div>
        <div id="buttonsTrailsPage">
            <button id="btnAddTrail" className="btn btn-primary" onClick={handleToggle}>Add Item</button>
            <button id="btnSortByName" className="btn btn-primary" onClick={sortByName}>Sortieren nach Name</button>
            <button id="btnSortByDate" className="btn btn-primary" onClick={sortByDate}>Sortieren nach Datum</button>
        </div>
        <div style={{display: hiddenStateAddTrail ? 'block' : 'none'}}><AddTrail onSubmit={addTrail}/></div>
        <TrailList trails={trails} deleteTrail={deleteTrail} toggleTrail={toggleTrail} browserLocation={browserLocation} mapLoaded={mapLoaded}/>
        </>
    )
}