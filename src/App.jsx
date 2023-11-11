import './App.scss'
import Weather from "./Components/Weather/Weather.jsx";
import Data from "./Components/Data/Data.jsx";
import {createContext, useEffect, useState} from "react";

export const WeatherDataContext = createContext({})
function App() {
    const [currentData, setCurrentData] = useState({})
    const [Five_daysData, setFive_daysData] = useState({})
    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const API_FiveDays_URL=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
            const API_Current_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
            // const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}2&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index&timezone=Africa%2FCairo`
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            fetch(API_FiveDays_URL)
                .then(response => response.json())
                .then(({list})=>{
                    // const listObject = list.map(item => ({
                    //     date: item.dt_txt,
                    //     temperature:item.main.temp
                    // }))
                    // Group data by day
                    const groupedData = list.reduce((result, entry) => {
                        // Extracting the date without the time
                        const date = entry.dt_txt.split(' ')[0];

                        // Check if the date already exists in the result object
                        if (!result[date]) {
                            result[date] = [] ; // If not, create an object with a 'data' array for that index
                        }

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
                .then(({main,name,sys,weather,wind}) =>{
                        setCurrentData({main,name,sys,weather,wind})
                    }
                ).catch((error) => {
                console.error(error);
            });
        }

        function error() {
            console.log("Unable to retrieve your location");
        }


    }, []);
    // console.log(Five_daysData)
    // console.log(currentData)

    return (
        <div className={"Background"}>
            <WeatherDataContext.Provider value={{currentData,Five_daysData}}>
                <Weather/>
                <Data/>
            </WeatherDataContext.Provider>
        </div>
    )
}

export default App
