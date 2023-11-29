import darkBuildings from '../../assets/test2.webp'
import sunBuildings from '../../assets/test1.webp'
import './Weather.scss'
import {useContext, useEffect, useState} from "react";
import {WeatherDataContext} from "../Main/Main.jsx";
import {format} from "date-fns";
import {Rain} from "./Rain/Rain.jsx";
import Clouds from "./Clouds/Clouds.jsx";
import {FaAngleLeft, FaAngleRight, FaPlus, FaSun} from "react-icons/fa6";



// eslint-disable-next-line react/prop-types
const Weather = ({setLocationIndex, index, savedLocations}) => {

    const [nextEnabled, setNextEnabled] = useState(() => (index < savedLocations.length))
    const [prevEnabled, setPrevEnabled] = useState(() => (index > 0))
    const [weatherDescription, setWeatherDescription] = useState("")
    const [isCloudy, setIsCloudy] = useState(0)
    const [isRainy,setIsRainy] = useState(0)
    const {currentData, isLoading, LocationSelectionDialog, setDialogText, isDay} = useContext(WeatherDataContext)
    const temperature = currentData ? currentData.temperature_2m : ""
    const location = !savedLocations[index] ? null : savedLocations[index][0].split(",")
    const WeatherCode = currentData ? currentData.weather_code : 0
    // const isDay = currentData?.is_day === 1
    const root = document.documentElement
    useEffect(() => {
        if (index === savedLocations.length - 1) setNextEnabled(false)
        else setNextEnabled(true)
        if (index === 0) setPrevEnabled(false)
        else setPrevEnabled(true)
    }, [index, savedLocations]);
    const viewNextLocation = () => ++index < savedLocations.length && setLocationIndex((index) => index + 1)
    const viewPrevLocation = () => --index >= 0 && setLocationIndex((index) => index - 1)


    useEffect(() => {
        setIsCloudy(0)
        setIsRainy(0)
        switch (WeatherCode) {
            case 0:
                setWeatherDescription("clear Sky")
                break
            case 1:
                setWeatherDescription("Mainly clear")
                break
            case 2:
                setWeatherDescription("partly cloudy")
                setIsCloudy(1)
                break
            case 3:
                setWeatherDescription("Overcast")
                setIsCloudy(2)
                break
            case 45:
                setWeatherDescription("Fog")
                break
            case 48:
                setWeatherDescription("Depositing rime fog")
                break
            case 51:
                setWeatherDescription("Light drizzle")
                setIsRainy(1)
                break
            case 53:
                setWeatherDescription("Moderate drizzle")
                setIsRainy(2)
                break
            case 55:
                setWeatherDescription("Heavy drizzle")
                setIsRainy(3)
                break
            case 61:
                setWeatherDescription("Slight rain")
                setIsRainy(4)
                break
            case 63:
                setWeatherDescription("Moderate rain")
                setIsRainy(5)
                break
            case 65:
                setWeatherDescription("Heavy rain")
                setIsRainy(6)
                break
            case 66:
                setWeatherDescription("Slight freezing rain")
                break
            case 67:
                setWeatherDescription("Heavy freezing rain")
                break
            case 71:
                setWeatherDescription("Light snow fall")
                break
            case 73:
                setWeatherDescription("Moderate snow fall")
                break
            case 75:
                setWeatherDescription("Heavy snow fall")
                break
            case 77:
                setWeatherDescription("Snow grains")
                break
            case 80:
                setWeatherDescription("Slight rain showers")
                break
            case 81:
                setWeatherDescription("Moderate rain showers")
                break
            case 82:
                setWeatherDescription("Violent rain showers")
                break
            case 85:
                setWeatherDescription("Slight snow showers")
                break
            case 86:
                setWeatherDescription("Heavy snow showers")
                break
            case 95:
                setWeatherDescription("Thunderstorm")
                break
            case 96:
                setWeatherDescription("Thunderstorm")
                break
            case 99:
                setWeatherDescription("Thunderstorm")
                break
            default:
                setWeatherDescription("getting weather data")
        }
    }, [WeatherCode]);
    if (!isDay) {
        root.style.setProperty('--bgColor', '#21283C')
        root.style.setProperty('--sunColor', '#E8DCB4')
        root.style.setProperty('--accentColor', '#5C9CE5')
        root.style.setProperty('--cardColor', 'rgb(53,51,53)')
        root.style.setProperty('--cardColor_NoAlpha', 'rgb(53,51,53)')
        root.style.setProperty('--textColor', '#ffffff')
    } else {
        root.style.setProperty('--bgColor', '#5C9CE5')
        root.style.setProperty('--sunColor', '#ECB150')
        root.style.setProperty('--accentColor', '#21283C')
        root.style.setProperty('--cardColor', 'rgb(255, 255, 255,0.75)')
        root.style.setProperty('--cardColor_NoAlpha', 'rgb(255, 255, 255)')
        root.style.setProperty('--textColor', '#000000')
    }



    return (
        <div className={"WeatherWrapper"}>
            <Rain isRaining={6}/>

            <div className={"hero"}>
                <div className={"location"}>
                    <h4>{location ? `${location[0]}${location.length > 2 ? ("," + location[1]) : ""},${location[location.length - 1]}` : ""}</h4>
                    <p>{format(new Date(), "'Today, ' d MMM")}</p>
                </div>
                <button onClick={() => {
                    LocationSelectionDialog.current.openDialog()
                    setDialogText("please enter the new address that you would like to add")
                }}><FaPlus/></button>
            </div>
            <div className={"Temp_Controls"}>
                <button disabled={!prevEnabled && true} onClick={viewPrevLocation}><FaAngleLeft/></button>
                <div className={"Deg_feel"}>
                    {isLoading ? <></> :
                        <>
                            <h2>{temperature}&deg;</h2>
                            <h4><FaSun/>{weatherDescription}</h4>
                        </>
                    }
                </div>
                <button disabled={!nextEnabled && true} onClick={viewNextLocation}><FaAngleRight/></button>
            </div>
            <div className={"WeatherImg"}>

                <Clouds isCloudy={2}/>

                <div className={"moon"}></div>
                <img className={"buildings"} src={isDay ? sunBuildings : darkBuildings} alt={"Dark Buildings"}/>
            </div>
        </div>

    )
}
export default Weather
