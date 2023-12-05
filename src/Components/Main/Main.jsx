import Dialog from "../Custom/Dialog/Dialog.jsx";
import './Main.scss'
import {FaLocationDot} from "react-icons/fa6";
import {createContext, useEffect, useRef, useState} from "react";
import Loading from "../Custom/Loading/Loading.jsx";
import Weather from "../Weather/Weather.jsx";
import Data from "../Data/Data.jsx";
import useDebounce from "../Utils/useDebounce.jsx";
import {asyncLocalStorage as asynclocalStorage, asyncLocalStorage, Geocode} from "../../WeatherData.js";
import useWeatherGeolocation from "../Utils/useWeatherGeolocation.jsx";
import useWeatherGeocoding from "../Utils/useWeatherGeocoding.jsx";


export const WeatherDataContext = createContext({})


const Main = () => {
    const [isDay, setIsDay] = useState(false)
    const [dialogText, setDialogText] = useState("It's empty in here , let's add something")
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(0)
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
    const textField = useRef()
    const DataRef = useRef()

    const fetchWeatherDataByGeolocation = useWeatherGeolocation(setFive_daysData, setCurrentData, setIsDay, setLocationIndex, setDialogText, setSavedLocations);
    const fetchWeatherDataByGeocoding = useWeatherGeocoding(setFive_daysData, setCurrentData, setIsDay, setLocationIndex, setDialogText, setSavedLocations, LocationSelectionDialog, updates);
    const handelSearch = useDebounce((searchTerm) => {
        setIsSearching(1)
        Geocode(searchTerm).then(data => {
            setGeoLocations(data)
            data.length === 0 ? setIsSearching(3) : setIsSearching(2)
        })
    }, 350);
    const initialize = async () => {
        setIsLoading(true)
        if (name !== "") {
            if (savedLocations.length > 0) {
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
            setIsDay(current.is_day === 1)
            LocationSelectionDialog.current.closeDialog()
            setIsSearching(0)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };
    const handleFetchWeatherByGeocoding = async (location, newFetch) => {
        setIsLoading(true)
        try {
            const {current, structuredDaily} = await fetchWeatherDataByGeocoding(location, newFetch);
            setCurrentData(current)
            setFive_daysData(structuredDaily)
            LocationSelectionDialog.current.closeDialog()
            setIsSearching(0)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    };

    useEffect(() => {
        initialize().then(() => setIsLoading(false))
    }, [name]);

    function searchCity(e) {
        const {value} = e.target
        value !== "" && handelSearch(value)
    }


    function handleNameSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const enteredName = formData.get("name")
        setName(enteredName)
        asynclocalStorage.setItem("name", enteredName)
        NameDialog.current.closeDialog()
    }

    async function handleDelete(e) {
        e.preventDefault();
        const updatedSavedLocations = savedLocations.filter((item, index) => index !== locationIndex);
        setSavedLocations(updatedSavedLocations);
        const lastIndex =  savedLocations.length-1
        if (locationIndex === lastIndex) {
            setLocationIndex(Math.max(0, lastIndex - 1));
        } else {
            setLocationIndex(Math.min(locationIndex, lastIndex));
        }
            deleteDialog.current.closeDialog()
    }


    useEffect(() => {
        asyncLocalStorage.setItem("locations", JSON.stringify(savedLocations))
    }, [savedLocations]);
    useEffect(() => {
        asyncLocalStorage.setItem("locationIndex", JSON.stringify(locationIndex))
        if (savedLocations[locationIndex]) handleFetchWeatherByGeocoding(savedLocations[locationIndex], false).then(() => setIsLoading(false))
        else if(name!=="") {
            setDialogText("It's empty in here , let's add something");
            LocationSelectionDialog.current.openDialog();
        }
    }, [savedLocations, locationIndex]);

    return (
        <>
            <>
                <Dialog ref={updates} dialogText={"fetching data..."}> <Loading/> </Dialog>
                <Dialog ref={LocationSelectionDialog} isLoading={isLoading}>
                    {
                        savedLocations.length > 0 &&
                        <button type={"button"} onClick={() => LocationSelectionDialog.current.closeDialog()}
                                className={"close"} title={"close"}  >close</button>
                    }
                    {/*<div className={"wrapper"}>*/}
                        <h3>{dialogText}</h3>
                        <div className={"controls"}>
                            <input name={"SearchField"} ref={textField} onInput={searchCity} type={"text"}
                                   placeholder={"enter city name"} autoComplete="street-address"/>
                            <a onClick={() => {
                                textField.current.value = ""
                                handleFetchWeatherByGeolocation().then(() => setIsLoading(false))
                            }}><FaLocationDot/></a>
                        </div>
                    {/*</div>*/}
                    <div className={"searchResult"}>
                        {/*
                            isSearching = 0 means doing nothing
                            isSearching = 1 means started searching
                            isSearching = 2 search came back with data
                            isSearching = 3 search came back with nothing
                        */}
                        {
                            isSearching !== 1 ?
                            isSearching === 2 ? geoLocations.map((geolocation, index) => (
                                [<a onClick={() => {
                                    textField.current.value = ""
                                    handleFetchWeatherByGeocoding(geolocation).then(() => setIsLoading(false))
                                }}
                                    key={index}>{geolocation[0]}</a>]
                            )) : isSearching === 3 && <h4>Nothing came up :( </h4>
                            : <Loading/>
                        }
                    </div>
                </Dialog>
                <Dialog ref={NameDialog} onSubmit={handleNameSubmit}>
                    <p>Welcome , please tell me what should i call you :)</p>
                    <input type={"text"} name={"name"} placeholder={"Enter your name"} autoComplete={"name"}/>
                    <button title={"submit"} type={"submit"}>submit</button>
                </Dialog>
                <Dialog ref={deleteDialog}>
                    <button type={"button"} className={"close"} title={"close"} onClick={() => deleteDialog.current.closeDialog()}>close</button>
                    <h4>Are you sure you want to delete this Location ?</h4>
                    <button type={"button"} title={"delete"} onClick={handleDelete}>yes</button>
                    <button type={"button"} title={"No delete"} onClick={(e) =>
                    {
                        e.preventDefault()
                        deleteDialog.current.closeDialog()}}>no</button>
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
                            deleteDialog,
                            DataRef
                        }}>
                        <Weather setLocationIndex={setLocationIndex} index={locationIndex}
                                 savedLocations={savedLocations}/>
                        <Data ref={DataRef}/>
                    </WeatherDataContext.Provider>
                </div>
            </>
        </>
    )
}
export default Main