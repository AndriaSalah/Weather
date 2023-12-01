import darkBuildings from '../../assets/test2.webp'
import sunBuildings from '../../assets/test1.webp'
import './Weather.scss'
import {useCallback, useContext, useEffect, useState} from "react";
import {WeatherDataContext} from "../Main/Main.jsx";
import {format} from "date-fns";
import {Rain} from "./Rain/Rain.jsx";
import Clouds from "./Clouds/Clouds.jsx";
import {FaAngleLeft, FaAngleRight, FaPlus, FaSun, FaTrashCan} from "react-icons/fa6";
import {Snow} from "./Snow/Snow.jsx";
import Loading from "../Custom/Loading/Loading.jsx";


// eslint-disable-next-line react/prop-types
const Weather = ({setLocationIndex, index, savedLocations}) => {
    const {
        currentData,
        isLoading,
        LocationSelectionDialog,
        deleteDialog,
        setDialogText,
        isDay
    } = useContext(WeatherDataContext)

    const [showFloaty, setShowFLoaty] = useState(false)
    const [nextEnabled, setNextEnabled] = useState(() => (index < savedLocations.length))
    const [prevEnabled, setPrevEnabled] = useState(() => (index > 0))
    const [weatherDescription, setWeatherDescription] = useState("")
    const [isCloudy, setIsCloudy] = useState(0)
    const [isRainy, setIsRainy] = useState(0)
    const [isSnowy, setIsSnowy] = useState(0)
    const temperature = currentData ? currentData.temperature_2m : ""
    const location = !savedLocations[index] ? "" : savedLocations[index][0].split(",")
    const address = location.length >= 3
        ? `${location[0]},${location[1]},${location[location.length - 1]}`
        : location.length === 2 ? `${location[0]},${location[1]}`
            : location.length === 1 && `${location[0]}`
    const WeatherCode = currentData ? currentData.weather_code : 0
    const root = document.documentElement
    const Next_Prev_Styles = {
        next: {
            opacity: nextEnabled ? 1 : 0,
            visibility: nextEnabled ? "visible" : "hidden"
        },
        prev: {
            opacity: prevEnabled ? 1 : 0,
            visibility: prevEnabled ? "visible" : "hidden"
        }
    }

    const viewNextLocation = () => ++index < savedLocations.length && setLocationIndex((index) => index + 1)
    const viewPrevLocation = () => --index >= 0 && setLocationIndex((index) => index - 1)

    const updateNavButtons = useCallback(() => {
        if (index === savedLocations.length - 1) setNextEnabled(false)
        else setNextEnabled(true)
        if (index === 0) setPrevEnabled(false)
        else setPrevEnabled(true)
    }, [index, savedLocations.length])
    const updateWeatherDescription = useCallback(() => {
        setIsCloudy(0)
        setIsRainy(0)
        setIsSnowy(0)
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
                setIsRainy(6)
                break
            case 67:
                setWeatherDescription("Heavy freezing rain")
                setIsRainy(6)
                break
            case 71:
                setWeatherDescription("Light snow fall")
                setIsSnowy(1)
                break
            case 73:
                setWeatherDescription("Moderate snow fall")
                setIsSnowy(2)
                break
            case 75:
                setWeatherDescription("Heavy snow fall")
                setIsSnowy(3)
                break
            case 77:
                setWeatherDescription("Snow grains")
                setIsSnowy(3)
                break
            case 80:
                setWeatherDescription("Slight rain showers")
                setIsRainy(4)
                break
            case 81:
                setWeatherDescription("Moderate rain showers")
                setIsRainy(5)
                break
            case 82:
                setWeatherDescription("Violent rain showers")
                setIsRainy(6)
                break
            case 85:
                setWeatherDescription("Slight snow showers")
                setIsSnowy(2)
                break
            case 86:
                setWeatherDescription("Heavy snow showers")
                setIsSnowy(3)
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
    }, [WeatherCode])
    const updateRootStyles = useCallback(() => {
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
    }, [isDay, root.style])

    useEffect(() => {

        updateNavButtons()
    }, [index, updateNavButtons]);
    useEffect(() => {

        updateRootStyles()
    }, [isDay, updateRootStyles])
    useEffect(() => {

        updateWeatherDescription()
    }, [savedLocations, updateWeatherDescription])

    //these functions are fo debugging purposes only
    const handleClouds = (e) => {
        setIsCloudy(e.target.value)
    }
    const handleRain = (e) => {
        setIsRainy(e.target.value)
    }
    const handleSnow = (e) => {
        setIsSnowy(e.target.value)
    }

    return (
        <>
            {/*this component is only use for debugging purposes*/}
            <div className={"floatyContainer"}>
                <button onClick={()=>setShowFLoaty(!showFloaty)}>{showFloaty? "hide" : "show"}</button>
                {showFloaty &&
                <div className={"floaty"}>
                    <label>clouds</label>
                    <input type={"text"} placeholder={"1-2"} onChange={handleClouds}/>
                    <label>rain</label>
                    <input type={"text"} placeholder={"1-6"} onChange={handleRain}/>
                    <label>snow</label>
                    <input type={"text"} placeholder={"1-3"} onChange={handleSnow}/>
                </div>
                }
            </div>
            <div className={"WeatherWrapper"}>
                <Rain isRaining={isRainy}/>
                <Snow isSnowy={isSnowy}/>
                <div className={"hero"}>
                    <div className={"location"}>
                        <h4>{address}</h4>
                        <p>{format(new Date(), "'Today, ' d MMM")}</p>
                    </div>
                    <div className={"Location_tools"}>
                        <button onClick={() => {
                            LocationSelectionDialog.current.openDialog()
                            setDialogText("please enter the new address that you would like to add")
                        }}><FaPlus/></button>
                        <button onClick={() => {
                            deleteDialog.current.openDialog()
                            setDialogText("please enter the new address that you would like to add")
                        }}><FaTrashCan/></button>
                    </div>
                </div>
                <div className={"Temp_Controls"}>
                    <button style={Next_Prev_Styles.prev} onClick={viewPrevLocation}><FaAngleLeft/></button>
                    <div className={"Deg_feel"}>
                        {isLoading ? <Loading/> :
                            <>
                                <h2>{temperature}&deg;</h2>
                                <h4><FaSun/>{weatherDescription}</h4>
                            </>
                        }
                    </div>
                    <button style={Next_Prev_Styles.next} onClick={viewNextLocation}><FaAngleRight/></button>
                </div>
                <div className={"WeatherImg"}>
                    <Clouds isCloudy={isCloudy}/>
                    <div className={"moon"}></div>
                    <img className={"buildings"} src={isDay ? sunBuildings : darkBuildings} alt={"Dark Buildings"}/>
                </div>
            </div>
        </>
    )
}
export default Weather
