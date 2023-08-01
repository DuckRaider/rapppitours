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
        readDataFromDb();

        sortByDate();

        //handle the promise
        getBrowserLocation()
        .then(data => {
            setBrowserLocation(data);
            setMapLoaded(true);
        })

    },[])

    async function readDataFromDb(){
        const collectionRef = collection(db, 'trails');

        const documentsArray = [];
        
        onSnapshot(query(collectionRef), (snapshot) => {
          snapshot.forEach((doc) => {
            if(doc.data().user == auth.currentUser?.uid){
                documentsArray.push({id:doc.id,...doc.data()});
            }
          });
          setTrails(documentsArray)
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
            user: newTrail.user,
            completed: newTrail.completed
        })

        readDataFromDb();
    }

    async function deleteTrail(id){
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
    async function updateTrail(newTrail){
        const trailRef = doc(db, "trails", newTrail.id);

        await updateDoc(trailRef, {
            name: newTrail.name,
            date: newTrail.date,
            city: newTrail.city,
            lat: newTrail.lat,
            lon: newTrail.lon,
            user: newTrail.user,
            completed: newTrail.completed
        })
    }

    //save trails when a trails gets checked
    async function toggleTrail(trail, completed){
        trail.completed = completed
        await updateTrail(trail)

        readDataFromDb()
    }

    //actually sorts by name and then by date
    function sortByName(){
        let sortedTrails = [...trails].sort((a,b) => (a.name > b.name ? 1:-1))
        setTrails(sortedTrails);
    }

    function sortByDate(){
        //We could add the possibility to pass a parameter
        //So we sort by parameter instead of the trails directly
        const sortedTrails = [...trails].sort((a, b) => {
            if (a.date === b.date) {
                return a.name > b.name ? 1 : -1;
            } else {
                return a.date > b.date ? 1 : -1;
            }
            });
        setTrails(sortedTrails)

    }

    return(
        <>
        <div className="text-center">
            <h1 id="titleTrails">Trails</h1>
        </div>
        <div id="buttonsTrailsPage">
            <button id="btnAddTrail" className="btn btn-primary" onClick={handleToggle}>Add Trail</button>
            <button id="btnSortByName" className="btn btn-primary" onClick={sortByName}>Sort by Name</button>
            <button id="btnSortByDate" className="btn btn-primary" onClick={sortByDate}>Sort by Date</button>
        </div>
        <div style={{display: hiddenStateAddTrail ? 'block' : 'none'}}><AddTrail onSubmit={addTrail}/></div>
        <TrailList trails={trails} deleteTrail={deleteTrail} toggleTrail={toggleTrail} browserLocation={browserLocation} mapLoaded={mapLoaded}/>
        </>
    )
}