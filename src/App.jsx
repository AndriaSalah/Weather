import './App.scss'
import Weather from "./Components/Weather/Weather.jsx";
import Data from "./Components/Data/Data.jsx";
import {createContext, useEffect, useRef, useState} from "react";
import Loading from "./Components/Custom/Loading/Loading.jsx";
import data from "./Components/Data/Data.jsx";

export const WeatherDataContext = createContext({})

function App() {
    const [dialogText, setDialogText] = useState("Please allow location usage in order to fetch your weather data")
    const [isLoading, setIsLoading] = useState(false)
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})
    const dialogRef = useRef()
    useEffect(() => {
        dialogRef.current.showModal();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                success,
                error, // You can specify a timeout (in milliseconds) for the geolocation request
            );
        }
        function success(position) {
            fetchWeatherData(position.coords.longitude,position.coords.latitude)
        }

        function fetchWeatherData(longitude, latitude) {
            setDialogText("Fetching weather data...")
            setIsLoading(true)
            const API_FiveDays_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
            const API_Current_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
            // const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}2&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index&timezone=Africa%2FCairo`
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            fetch(API_FiveDays_URL)
                .then(response => response.json())
                .then(({list}) => {

                        const groupedData = list.reduce((result, entry) => {
                            // Extracting the date without the time
                            const date = entry.dt_txt.split(' ')[0];
                            // Check if the date already exists in the result object
                            if (!result[date]) result[date] = []; // If not, create an object with a 'data' array for that index

                            // Push the entry to the corresponding index's data array
                            result[date].push({
                                name: entry.dt_txt, // assuming dt_txt is the x-axis value
                                temperature: entry.main.temp // main.temp is the y-axis value
                            });
                            return result;
                        }, {});
                        console.log(groupedData)
                        setFive_daysData(groupedData)
                    }
                ).catch((error) => {
                console.error(error);
            });
            fetch(API_Current_URL)
                .then(response => response.json())
                .then(({main, name, sys, weather, wind}) => {
                        setCurrentData({main, name, sys, weather, wind})
                    }
                ).catch((error) => {
                console.error(error);
            });
            if (currentData && Five_daysData) {
                setTimeout(()=> setDialogText("Every thing looks fine, one second when the data loads this dialog will close automatically"),2500)
                setIsLoading(true)
                setTimeout(() => {
                    dialogRef.current.close()
                    setIsLoading(false)
                }, 4000)
            }
        }

        function error() {
            setIsLoading(true)
            setDialogText("Location access was denied, we will try to get you location via your ip address now ")
            fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=b8ad27e6c5a1490db64f04b4beb9e3e2", {
                method: "GET"
            }).then(response => response.json())
                .then(({location}) =>{
                    setIsLoading(true)
                    console.log(location)
                    fetchWeatherData(location.longitude,location.latitude)
                })
                .catch(error=>console.log(error))
        }


    }, []);
    // console.log(Five_daysData)
    // console.log(currentData)

    return (
        <>
            <dialog ref={dialogRef} id="favDialog">
                <form method="dialog">
                    <h3>{dialogText}</h3>
                    <Loading enabled={isLoading}/>
                    {/*<button id="confirmBtn">Close the dialog</button>*/}
                </form>
            </dialog>
            <div className={"Background"}>
                <WeatherDataContext.Provider value={{currentData, Five_daysData , isLoading}}>
                    <Weather/>
                    <Data/>
                </WeatherDataContext.Provider>
            </div>
        </>
    )
}

export default App
