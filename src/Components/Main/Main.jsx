import Dialog from "../Custom/Dialog/Dialog.jsx";
import './Main.scss'
import {FaLocationDot} from "react-icons/fa6";
import {createContext, Suspense, useEffect, useRef, useState} from "react";
import Loading from "../Custom/Loading/Loading.jsx";
import Weather from "../Weather/Weather.jsx";
import Data from "../Data/Data.jsx";
import useDebounce from "../Custom/useDebounce.jsx";
import {fetchWeatherData_test, Geocode, LocationExists} from "../../WeatherData.js";

export const WeatherDataContext = createContext({})
const Main = () => {
    const [isDay,setIsDay] = useState(false)
    const [dialogText, setDialogText] = useState("Welcome, looks like you're new here , let's start by adding an address")
    const [isLoading, setIsLoading] = useState(false)

    const [geoLocations, setGeoLocations] = useState([])
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})
    const handelSearch = useDebounce((searchTerm)=>{
        console.log(searchTerm)
        Geocode(searchTerm).then(data => setGeoLocations(data))
    }, 500);


    const [locationIndex, setLocationIndex] = useState(() => {
        const index = JSON.parse(localStorage.getItem("locationIndex"))
        return index ? Number(index) : 0
    })
    const [savedLocations, setSavedLocations] = useState(() => {
        const locations = JSON.parse(localStorage.getItem("locations"))
        return locations && locations.length > 0 ? locations : []
    })
    const dialogRef = useRef()
    const LocationSelectionDialog = useRef()



    function fetchWeatherData(location, newFetch = true) {

        if (newFetch) {

            if (!LocationExists(location))
            {
                saveToLocalStorage(location)
                setLocationIndex(0)
                setDialogText("please wait while we're fetching the data ")
            }
            else{
                setDialogText("location exists")
                LocationSelectionDialog.current.closeDialog()
                dialogRef.current.openDialog()
                setTimeout(() => dialogRef.current.closeDialog(), 1000)
                return
            }

        }

        const longitude = location[1].location.lng
        const latitude = location[1].location.lat
        LocationSelectionDialog.current.closeDialog()
        dialogRef.current.openDialog()
        fetchWeatherData_test(latitude,longitude)
            .then(({current,structuredDaily})=>{
                setFive_daysData(structuredDaily)
                setCurrentData(current)
                setIsDay(current.is_day === 1)

            })
        console.log(currentData)
        console.log(Five_daysData)

        dialogRef.current.closeDialog()
        setIsLoading(false)
    }


    function FetchWeatherData_Location() {
        LocationSelectionDialog.current.closeDialog()
        setDialogText("please allow using the location permission")
        dialogRef.current.openDialog()
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error)

        function success(position) {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            setDialogText("Fetching data ...")
            Geocode(null,latitude,longitude)
                .then(([result]) =>{
                    if(!LocationExists(result)) {
                        saveToLocalStorage(result)
                        fetchWeatherData_test(latitude,longitude)
                            .then(({current,structuredDaily})=>{
                                setFive_daysData(structuredDaily)
                                setCurrentData(current)
                                setIsDay(current.is_day === 1)
                            })
                        setLocationIndex(0)
                        setTimeout(() => dialogRef.current.closeDialog(), 1000)
                    }
                    else  setDialogText("location already exists ")
                })

            console.log(currentData)
            console.log(Five_daysData)
            dialogRef.current.closeDialog()

        }


        function error() {
            setDialogText("location permission denied")
            setTimeout(() => {
                dialogRef.current.closeDialog()
                setDialogText("Location permission was denied , please enter your address manually")
                LocationSelectionDialog.current.openDialog()
            }, 1000)
        }
    }

    function searchCity(e) {
        const {value} = e.target
        value !== "" && handelSearch(value)
    }

    const saveToLocalStorage = (locationData) => setSavedLocations((prevData) => [locationData, ...prevData])


    useEffect(() => {
        console.log(savedLocations)
        if (savedLocations.length > 0) {
            setDialogText("please wait while we're fetching the latest data for you")

            dialogRef.current.openDialog()
            setTimeout(() => fetchWeatherData(savedLocations[locationIndex], false), 200)
        } else LocationSelectionDialog.current.openDialog()

    }, []);

    useEffect(() => {
        console.log(savedLocations)
        localStorage.setItem("locations", JSON.stringify(savedLocations))

    }, [savedLocations]);
    useEffect(() => {
        localStorage.setItem("locationIndex", JSON.stringify(locationIndex))
        if (savedLocations[locationIndex]) fetchWeatherData(savedLocations[locationIndex], false)
    }, [locationIndex]);
    return (
        <>
            <>
                <Dialog ref={dialogRef} dialogText={dialogText} isLoading={isLoading}/>
                <Dialog ref={LocationSelectionDialog} dialogText={dialogText} isLoading={isLoading}>
                    <div className={"buttons"}>
                        <input onInput={searchCity} type={"text"}
                               placeholder={"enter city name"}/>
                        <a onClick={FetchWeatherData_Location}><FaLocationDot/></a>
                    </div>
                    <div className={"searchResult"} >
                        <Suspense fallback={<Loading/>}>
                            {
                                geoLocations.map((geolocation, index) => (
                                    [<a onClick={() => fetchWeatherData(geolocation)}
                                        key={index}>{geolocation[0]}</a>]
                                ))
                            }
                        </Suspense>
                    </div>

                </Dialog>
                <div className={"MainContainer"}>
                    <WeatherDataContext.Provider
                        value={{isDay, LocationSelectionDialog ,setDialogText, currentData, Five_daysData, isLoading, setLocationIndex, savedLocations}}>
                        <Weather setLocationIndex={setLocationIndex} index={locationIndex} savedLocations={savedLocations}/>
                        <Data/>
                    </WeatherDataContext.Provider>
                </div>

            </>
        </>
    )
}
export default Main