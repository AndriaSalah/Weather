import darkBuildings from '../../assets/test2.webp'
import sunBuildings from '../../assets/test1.webp'
import './Weather.scss'
import {useCallback, useContext, useEffect, useState} from "react";
import {WeatherDataContext} from "../Main/Main.jsx";
import {format} from "date-fns";
import {Rain} from "./Rain/Rain.jsx";
import Clouds from "./Clouds/Clouds.jsx";
import {
    FaAngleLeft,
    FaAngleRight,
    FaCloud, FaCloudBolt,
    FaCloudShowersHeavy, FaCloudShowersWater,
    FaCloudversify,
    FaPlus, FaSnowflake,
    FaSun,
    FaTrashCan,
    FaCloudSun, FaMoon, FaCloudMoon, FaCloudSunRain, FaCloudMoonRain, FaAnglesDown
} from "react-icons/fa6";
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
        isDay,
        DataRef
    } = useContext(WeatherDataContext)
    
    const [nextEnabled, setNextEnabled] = useState(() => (index < savedLocations.length))
    const [prevEnabled, setPrevEnabled] = useState(() => (index > 0))
    const [weatherDescription, setWeatherDescription] = useState("")
    const [isCloudy, setIsCloudy] = useState(0)
    const [isRainy, setIsRainy] = useState(0)
    const [isSnowy, setIsSnowy] = useState(0)
    const [weatherIcon, setWeatherIcon] = useState(<FaSun/>)
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
                isDay ? setWeatherIcon(<FaSun/>) : setWeatherIcon(<FaMoon/>)
                break
            case 1:
                setWeatherDescription("Mainly clear")
                isDay ? setWeatherIcon(<FaCloudSun/>) : <FaCloudMoon/>
                break
            case 2:
                setWeatherDescription("partly cloudy")
                isDay ? setWeatherIcon(<FaCloudSun/>) : <FaCloudMoon/>
                setIsCloudy(1)
                break
            case 3:
                setWeatherDescription("Overcast")
                setWeatherIcon(<FaCloud/>)
                setIsCloudy(2)
                break
            case 45:
                setWeatherDescription("Fog")
                setWeatherIcon(<FaCloudversify/>)
                break
            case 48:
                setWeatherDescription("Depositing rime fog")
                setWeatherIcon(<FaCloudversify/>)
                break
            case 51:
                setWeatherDescription("Light drizzle")
                isDay ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                setIsRainy(1)
                break
            case 53:
                setWeatherDescription("Moderate drizzle")
                isDay ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                setIsRainy(2)
                break
            case 55:
                setWeatherDescription("Heavy drizzle")
                isDay ? setWeatherIcon(<FaCloudSunRain/>) : setWeatherIcon(<FaCloudMoonRain/>)
                setIsRainy(3)
                break
            case 61:
                setWeatherDescription("Slight rain")
                setWeatherIcon(<FaCloudShowersHeavy/>)
                setIsRainy(4)
                break
            case 63:
                setWeatherDescription("Moderate rain")
                setWeatherIcon(<FaCloudShowersHeavy/>)
                setIsRainy(5)
                break
            case 65:
                setWeatherDescription("Heavy rain")
                setWeatherIcon(<FaCloudShowersHeavy/>)
                setIsRainy(6)
                break
            case 66:
                setWeatherDescription("Slight freezing rain")
                setWeatherIcon(<FaCloudShowersHeavy/>)
                setIsRainy(6)
                break
            case 67:
                setWeatherDescription("Heavy freezing rain")
                setWeatherIcon(<FaCloudShowersHeavy/>)
                setIsRainy(6)
                break
            case 71:
                setWeatherDescription("Light snow fall")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(1)
                break
            case 73:
                setWeatherDescription("Moderate snow fall")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(2)
                break
            case 75:
                setWeatherDescription("Heavy snow fall")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(3)
                break
            case 77:
                setWeatherDescription("Snow grains")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(3)
                break
            case 80:
                setWeatherDescription("Slight rain showers")
                setWeatherIcon(<FaCloudShowersWater/>)
                setIsRainy(7)
                break
            case 81:
                setWeatherDescription("Moderate rain showers")
                setWeatherIcon(<FaCloudShowersWater/>)
                setIsRainy(8)
                break
            case 82:
                setWeatherDescription("Violent rain showers")
                setWeatherIcon(<FaCloudShowersWater/>)
                setIsRainy(9)
                break
            case 85:
                setWeatherDescription("Slight snow showers")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(2)
                break
            case 86:
                setWeatherDescription("Heavy snow showers")
                setWeatherIcon(<FaSnowflake/>)
                setIsSnowy(3)
                break
            case 95:
            case 96:
            case 99:
                setWeatherDescription("Thunderstorm")
                setWeatherIcon(<FaCloudBolt/>)
                break
            default:
                setWeatherDescription("getting weather data")
        }
    }, [isDay, WeatherCode])
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
        updateWeatherDescription()
        updateRootStyles()
        updateNavButtons()
    }, [index, updateNavButtons, updateRootStyles, updateWeatherDescription]);

   const handleScrollDown = ()=> DataRef.current?.scrollIntoView({ behavior: 'smooth' })




    return (
        <>
            <div className={"WeatherWrapper"}>
                <Rain isRaining={isRainy}/>
                <Snow isSnowy={isSnowy}/>
                <div className={"hero"}>
                    <div className={"location"}>
                        <h4>{address}</h4>
                        <p>{format(new Date(), "'Today, ' d MMM")}</p>
                    </div>
                    <div className={"Location_tools"}>
                        <button title={"add location"} onClick={() => {
                            LocationSelectionDialog.current.openDialog()
                            setDialogText("please enter the new address that you would like to add")
                        }}><FaPlus/></button>
                        <button title={"remove location"} onClick={() => {
                            deleteDialog.current.openDialog()
                            setDialogText("please enter the new address that you would like to add")
                        }}><FaTrashCan/></button>
                    </div>
                </div>
                <div className={"Temp_Controls"}>
                    <button title={"view prev location"} style={Next_Prev_Styles.prev} onClick={viewPrevLocation}>
                        <FaAngleLeft/></button>
                    <div className={"Deg_feel"}>
                        {isLoading ? <Loading/> :
                            <>
                                <h2>{temperature}&deg;</h2>
                                <h4>{weatherIcon}{weatherDescription}</h4>
                            </>
                        }
                    </div>
                    <button title={"view next location"} style={Next_Prev_Styles.next} onClick={viewNextLocation}>
                        <FaAngleRight/></button>
                </div>
                <div className={"WeatherImg"}>
                    <Clouds isCloudy={isCloudy}/>
                    <div className={"moon"}></div>
                    <img className={"buildings"} src={isDay ? sunBuildings : darkBuildings} alt={"Dark Buildings"}/>
                </div>
                    <button onClick={handleScrollDown} className={"Scroll_Down"}>Scroll for more info <FaAnglesDown /></button>
            </div>
        </>
    )
}
export default Weather
