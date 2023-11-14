import './App.scss'
import Weather from "./Components/Weather/Weather.jsx";
import Data from "./Components/Data/Data.jsx";
import {createContext, useEffect, useRef, useState} from "react";
import {Fetch5DayData, FetchCurrentWeatherData, GeocodeLocation} from "./WeatherData.js";
import Dialog from "./Components/Custom/Dialog/Dialog.jsx";
import {FaLocationDot} from "react-icons/fa6";
import {number} from "prop-types";

export const WeatherDataContext = createContext({})

function App() {
    const [locationIndex,setLocationIndex]= useState(()=>{
        const index = JSON.parse(localStorage.getItem("locationIndex"))
        return index ? Number(index):0
    })
    const [dialogText, setDialogText] = useState("Welcome, looks like you're new here , let's start by adding an address")
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [geoLocations, setGeoLocations] = useState([])
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})
    const [address, setAddress] = useState("")
    const [savedLocations, setSavedLocations] = useState(() => {
        const locations = JSON.parse(localStorage.getItem("locations"))
        return locations && locations.length > 0 ? locations : []
    })
    const dialogRef = useRef()
    const LocationSelectionDialog = useRef()
    const isTyping = useRef(true)
    const textFieldRef = useRef()

    useEffect(() => {

        if (savedLocations.length > 0) {
            setAddress(savedLocations[locationIndex][0])
            setDialogText("please wait while we're fetching the latest data for you")
            setIsLoading(true)
            dialogRef.current.openDialog()
            setTimeout(() => fetchWeatherData(savedLocations[locationIndex], false), 200)
        } else LocationSelectionDialog.current.openDialog()

    }, []);


    useEffect(() => {
        if (!isTyping.current) {
                const debounce = setTimeout(() => {
                    if (searchTerm === "") {
                        return
                    } else {
                        // dialogRef.current.openDialog()
                        GeocodeLocation(searchTerm)
                            .then(({results}) => {
                                console.log(results)
                                const filteredResults = results.map(location => [location.formatted_address, location.geometry])
                                setGeoLocations(filteredResults)
                            })
                    }
                    return () => {
                        clearTimeout(debounce)
                    }
                }, 500)
            }
    }, [searchTerm])

    function saveToLocalStorage(locationData) {
        setSavedLocations((prevData) => [locationData, ...prevData])
    }

    useEffect(() => {
        localStorage.setItem("locations", JSON.stringify(savedLocations))
    }, [savedLocations]);
    useEffect(() => {
        localStorage.setItem("locationIndex",JSON.stringify(locationIndex))
    }, [locationIndex]);


    useEffect(() => {
        console.log(locationIndex)
        console.log(savedLocations[locationIndex])
        if(savedLocations[locationIndex]){
            fetchWeatherData(savedLocations[locationIndex],false)
        }
    }, [locationIndex]);
    function fetchWeatherData(location, newFetch = true) {
        if (newFetch) {
            saveToLocalStorage(location)
            setLocationIndex(0)
            setDialogText("please wait while we're fetching the data ")
        }
        setAddress(location[0])
        const longitude = location[1].location.lng
        const latitude = location[1].location.lat
        LocationSelectionDialog.current.closeDialog()
        dialogRef.current.openDialog()
        FetchCurrentWeatherData(latitude, longitude)
            .then(data => setCurrentData(data))
        Fetch5DayData(latitude, longitude)
            .then(data => setFive_daysData(data))
        console.log(currentData)
        console.log(Five_daysData)


        setTimeout(() => {
            dialogRef.current.closeDialog()
            setIsLoading(false)
        }, 1000)

    }

    function FetchWeatherData_Location() {
        LocationSelectionDialog.current.closeDialog()
        setDialogText("please allow using the location permission")
        dialogRef.current.openDialog()
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error)

        function success(position) {
            setDialogText("Fetching data ...")
            FetchCurrentWeatherData(position.coords.latitude, position.coords.longitude)
                .then(data => {
                    saveToLocalStorage()
                    setCurrentData(data)
                })
            Fetch5DayData(position.coords.latitude, position.coords.longitude)
                .then(data => setFive_daysData(data))
            console.log(currentData)
            console.log(Five_daysData)

            setTimeout(() => dialogRef.current.closeDialog(), 1000)
        }


        function error() {
            setDialogText("location permission denied")
            setTimeout(() => {
                dialogRef.current.closeDialog()
                setDialogText("Location permission was denied , please enter your address manually")
                LocationSelectionDialog.current.openDialog()
            }, 2000)
        }
    }

    function searchCity(e) {
        isTyping.current = false
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <Dialog ref={dialogRef} dialogText={dialogText} isLoading={isLoading}/>
            <Dialog ref={LocationSelectionDialog} dialogText={dialogText} isLoading={isLoading}>
                <div className={"buttons"}>
                    <input autoFocus={false} onInput={searchCity} type={"text"} ref={textFieldRef}
                           placeholder={"enter city name"}/>
                    {/*<a onClick={FetchWeatherData_Location}><FaLocationDot/></a>*/}
                </div>
                <div className={"searchResult"} style={{display: searchTerm !== "" ? "flex" : "none"}}>
                    {
                        geoLocations.map((geolocation, index) => (
                            <a onClick={() => fetchWeatherData(geolocation)}
                               key={index}>{geolocation[0]}</a>
                        ))
                    }
                </div>

            </Dialog>
            <div className={"Background"}>
                <WeatherDataContext.Provider value={{currentData, Five_daysData, isLoading, address,setLocationIndex}}>
                    <Weather/>
                    <Data/>
                </WeatherDataContext.Provider>
                <button className={"addLocation"}
                        onClick={() =>{
                            LocationSelectionDialog.current.openDialog()
                            setDialogText("please enter the new address that you would like to add")
                        }
                }>+
                </button>
            </div>

        </>
    )
}

export default App
