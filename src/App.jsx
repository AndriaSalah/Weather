import './App.scss'
import Weather from "./Components/Weather/Weather.jsx";
import Data from "./Components/Data/Data.jsx";
import {createContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Fetch5DayData, FetchCurrentWeatherData, GeocodeLocation} from "./WeatherData.js";
import Dialog from "./Components/Custom/Dialog/Dialog.jsx";
import {FaLocationDot} from "react-icons/fa6";

export const WeatherDataContext = createContext({})

function App() {

    const [dialogText, setDialogText] = useState("Welcome, looks like you're new here , let's start by adding an address")
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [geoLocations, setGeoLocations] = useState([])
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})
    const [address,setAddress]= useState("")

    const dialogRef = useRef()
    const LocationSelectionDialog = useRef()
    const isTyping=useRef(true)
    const textFieldRef = useRef()
    const isThrottling=useRef(false)

    useEffect(() => {
        const location = JSON.parse(localStorage.getItem("locations"))
        if (location) {
            setAddress(location[0])
            setDialogText("please wait while we're fetching the latest data for you")
            setIsLoading(true)
            dialogRef.current.openDialog()
            fetchWeatherData(location)
        } else LocationSelectionDialog.current.openDialog()

    }, []);


       useEffect(() => {
          if(!isTyping.current) {
              if(!isThrottling.current){
              const debounce = setTimeout(() => {

                  if (searchTerm === "") {
                      setDialogText("Please enter your city's name")

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
                      setTimeout(()=>isThrottling.current=false,1000)
                  }
              }, 1500)
          }
              }

       }, [searchTerm])



    function fetchWeatherData(location) {
           if(!localStorage.getItem("locations")){
               localStorage.setItem("locations",JSON.stringify(location))
           }
        FetchCurrentWeatherData(location[1].location.lat, location[1].location.lng)
            .then(data => setCurrentData(data))
        Fetch5DayData(location[1].location.lat, location[1].location.lng)
            .then(data => setFive_daysData(data))
        console.log(currentData)
        console.log(Five_daysData)
        setTimeout(() => {dialogRef.current.closeDialog()
        setIsLoading(false)
        }, 2000)
    }

    function FetchWeatherDataLocation() {
        LocationSelectionDialog.current.closeDialog()
        setDialogText("please allow using the location permission")
        dialogRef.current.openDialog()
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error)

        function success(position) {
            setDialogText("Fetching data ...")
            FetchCurrentWeatherData(position.coords.latitude, position.coords.longitude)
                .then(data => setCurrentData(data))
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

    function searchCity(e){
        isTyping.current=false
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <Dialog ref={dialogRef} dialogText={dialogText} isLoading={isLoading}/>
            <Dialog ref={LocationSelectionDialog} dialogText={dialogText} isLoading={isLoading}>
                <div className={"buttons"}>
                    <input autoFocus={false} onInput={searchCity} type={"text"} ref={textFieldRef} placeholder={"enter city name"}/>
                    <a onClick={FetchWeatherDataLocation}><FaLocationDot/></a>
                </div>
                <div className={"searchResult"} style={{display: searchTerm!== ""?"flex":"none"}}>
                    {
                        geoLocations.map((geolocation, index) => (
                            <a onClick={() => fetchWeatherData(geolocation)}
                               key={index}>{geolocation[0]}</a>
                        ))
                    }
                </div>

            </Dialog>
            <div className={"Background"}>
                <WeatherDataContext.Provider value={{currentData, Five_daysData, isLoading,address}}>
                    <Weather/>
                    <Data/>
                </WeatherDataContext.Provider>
            </div>

        </>
    )
}

export default App
