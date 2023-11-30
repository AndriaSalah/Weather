import Dialog from "../Custom/Dialog/Dialog.jsx";
import './Main.scss'
import {FaLocationDot} from "react-icons/fa6";
import {createContext, useEffect, useRef, useState} from "react";
import Loading from "../Custom/Loading/Loading.jsx";
import Weather from "../Weather/Weather.jsx";
import Data from "../Data/Data.jsx";
import useDebounce from "../Utils/useDebounce.jsx";
import {asyncLocalStorage, Geocode} from "../../WeatherData.js";
import useWeatherGeolocation from "../Utils/useWeatherGeolocation.jsx";
import useWeatherGeocoding from "../Utils/useWeatherGeocoding.jsx";
import {is} from "date-fns/locale";


export const WeatherDataContext = createContext({})


const Main = () => {
    const [isDay, setIsDay] = useState(false)
    const [dialogText, setDialogText] = useState("Welcome, looks like you're new here , let's start by adding an address")
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState(() => {
        const Name = localStorage.getItem("name")
        return Name ? Name : ""
    })
    const [geoLocations, setGeoLocations] = useState([])
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})

    const [locationIndex, setLocationIndex] = useState(() => {
        const index = JSON.parse(localStorage.getItem("locationIndex"))
        return index ? Number(index) : 0
    })
    const [savedLocations, setSavedLocations] = useState(() => {
        const locations = JSON.parse(localStorage.getItem("locations"))
        return locations && locations.length > 0 ? locations : []
    })
    const updates = useRef()
    const LocationSelectionDialog = useRef()
    const NameDialog = useRef()
    const deleteDialog = useRef()
    const fetchWeatherDataByGeolocation = useWeatherGeolocation(setFive_daysData, setCurrentData, setIsDay, setLocationIndex, setDialogText, setSavedLocations);
    const fetchWeatherDataByGeocoding = useWeatherGeocoding(setFive_daysData, setCurrentData, setIsDay, setLocationIndex, setDialogText, setSavedLocations, LocationSelectionDialog, updates);
    const handelSearch = useDebounce((searchTerm) => {
        setIsLoading(true)
        Geocode(searchTerm).then(data => setGeoLocations(data)).then(() => setIsLoading(false))
    }, 500);
    const initialize = async () => {
        setIsLoading(true)
        if (name !== "") {
            if (savedLocations.length > 0) {
                setDialogText("please wait while we're fetching the latest data for you")
                updates.current.openDialog()
                await handleFetchWeatherByGeocoding(savedLocations[locationIndex], false)
                updates.current.closeDialog()
            } else LocationSelectionDialog.current.openDialog()
        } else {
            NameDialog.current.openDialog()
        }
    }
    const handleFetchWeatherByGeolocation = async () => {
        setIsLoading(true)
        try {
            const {current, structuredDaily} = await fetchWeatherDataByGeolocation();
            setCurrentData(current)
            setFive_daysData(structuredDaily)
            setLocationIndex(0)
            //console.log(await current)
            setIsDay(current.is_day === 1)
            LocationSelectionDialog.current.closeDialog()
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };
    const handleFetchWeatherByGeocoding = async (location, newFetch) => {
        setIsLoading(true)
        try {
            const {current, structuredDaily} = await fetchWeatherDataByGeocoding(location, newFetch);
            console.log(current)
            setCurrentData(current)
            setFive_daysData(structuredDaily)
            LocationSelectionDialog.current.closeDialog()

        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };
    useEffect(() => {
        console.log(isDay)
    }, [isDay]);
    useEffect(() => {
        initialize().then(() => setIsLoading(false))
    }, []);

    function searchCity(e) {
        const {value} = e.target
        value !== "" && handelSearch(value)
    }


    function handleNameSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const enteredName = formData.get("name")
        setName(enteredName)
        localStorage.setItem("name", enteredName)
        NameDialog.current.closeDialog()
        initialize().then(() => setIsLoading(false))
    }
    async function handleDelete(e) {
        e.preventDefault();

        // Update savedLocations by removing the location at the current index
        const updatedSavedLocations = savedLocations.filter((item, index) => index !== locationIndex);
        setSavedLocations(updatedSavedLocations);

        // Determine the next index after deletion
        const nextIndex = Math.min(locationIndex, savedLocations.length - 1);

        if (savedLocations.length > 0) {
            console.log(nextIndex)
            setIsLoading(true);
            setLocationIndex(nextIndex);
            deleteDialog.current.closeDialog()
            setDialogText("fetching")
            updates.current.openDialog()
        } else {
            // No saved locations left, handle accordingly
            deleteDialog.current.closeDialog();
            updates.current.closeDialog()
            setDialogText("You have no locations now, let's add some!");
            LocationSelectionDialog.current.openDialog();
        }
    }


    useEffect(() => {
        //console.log(savedLocations)
        asyncLocalStorage.setItem("locations", JSON.stringify(savedLocations))
    }, [savedLocations]);
    useEffect(() => {
        asyncLocalStorage.setItem("locationIndex", JSON.stringify(locationIndex))
        console.log("invoked")
        if (savedLocations[locationIndex]) handleFetchWeatherByGeocoding(savedLocations[locationIndex], false).then(() => setIsLoading(false))
        else deleteDialog.current.closeDialog();
        updates.current.closeDialog()
        setDialogText("You have no locations now, let's add some!");
        LocationSelectionDialog.current.openDialog();
    }, [savedLocations,locationIndex]);
    return (
        <>
            <>
                <Dialog ref={updates} dialogText={dialogText}> <Loading/> </Dialog>
                <Dialog ref={LocationSelectionDialog} dialogText={dialogText} isLoading={isLoading}>
                    <div className={"buttons"}>
                        <input onInput={searchCity} type={"text"}
                               placeholder={"enter city name"} autoComplete="street-address"/>
                        <a onClick={() => {
                            handleFetchWeatherByGeolocation().then(() => setIsLoading(false))
                        }}><FaLocationDot/></a>
                    </div>
                    <div className={"searchResult"}>
                        {!isLoading ?
                            geoLocations.map((geolocation, index) => (
                                [<a onClick={() => {
                                    handleFetchWeatherByGeocoding(geolocation).then(() => setIsLoading(false))
                                }}
                                    key={index}>{geolocation[0]}</a>]
                            )) : <Loading/>
                        }
                    </div>
                </Dialog>
                <Dialog ref={NameDialog} onSubmit={handleNameSubmit}>
                    <p>Welcome , please tell me what should i call you :)</p>
                    <input type={"text"} name={"name"} placeholder={"Enter your name"}/>
                    <button type={"submit"}>submit</button>
                </Dialog>
                <Dialog ref={deleteDialog} >
                    <h4>Are you sure you want to delete this Location ?</h4>
                    <button onClick={handleDelete}>yes</button>
                    <button onClick={()=>deleteDialog.current.closeDialog()}>no</button>
                </Dialog>
                <div className={"MainContainer"}>
                    <WeatherDataContext.Provider
                        value={{
                            name,
                            isDay,
                            LocationSelectionDialog,
                            setDialogText,
                            currentData,
                            Five_daysData,
                            isLoading,
                            setLocationIndex,
                            savedLocations,
                            deleteDialog
                        }}>
                        <Weather setLocationIndex={setLocationIndex} index={locationIndex}
                                 savedLocations={savedLocations}/>
                        <Data/>
                    </WeatherDataContext.Provider>
                </div>

            </>
        </>
    )
}
export default Main