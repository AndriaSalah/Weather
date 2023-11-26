import darkBuildings from '../../assets/test2.png'
import sunBuildings from '../../assets/test1.png'
import './Weather.scss'
import {GrNext, GrPrevious} from "react-icons/gr";
import {BiSun} from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import {WeatherDataContext} from "../../App.jsx";
import {format} from "date-fns";
import {CiSquarePlus} from "react-icons/ci";


// eslint-disable-next-line react/prop-types
const Weather = ({setLocationIndex, index, savedLocations}) => {

    const [nextEnabled, setNextEnabled] = useState(() => (index < savedLocations.length))
    const [prevEnabled, setPrevEnabled] = useState(() => (index > 0))
    const [weatherDescription, setWeatherDescription] = useState("")
    const {currentData, isLoading, LocationSelectionDialog, setDialogText , isDay} = useContext(WeatherDataContext)
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

    console.log()
    useEffect(() => {
        switch (WeatherCode) {
            case 0:
                setWeatherDescription("clear Sky")
                break
            case 1:
                setWeatherDescription("Mainly clear")
                break
            case 2:
                setWeatherDescription("partly cloudy")
                break
            case 3:
                setWeatherDescription("Overcast")
                break
            case 45:
                setWeatherDescription("Fog")
                break
            case 48:
                setWeatherDescription("Depositing rime fog")
                break
            case 51:
                setWeatherDescription("Light drizzle")
                break
            case 53:
                setWeatherDescription("Moderate drizzle")
                break
            case 55:
                setWeatherDescription("Heavy drizzle")
                break
            case 61:
                setWeatherDescription("Slight rain")
                break
            case 63:
                setWeatherDescription("Moderate rain")
                break
            case 65:
                setWeatherDescription("Heavy rain")
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
            <div className={"hero"}>
                <div className={"location"}>
                    <h4>{location ? `${location[0]},${location[location.length - 1]}` : ""}</h4>
                    <p>{format(new Date(), "'Today, ' d MMM")}</p>
                </div>
                <button onClick={() => {
                    LocationSelectionDialog.current.openDialog()
                    setDialogText("please enter the new address that you would like to add")
                }}><CiSquarePlus/></button>
            </div>
            {

                <div className={"Temp_Controls"}>
                    <button disabled={!prevEnabled && true} onClick={viewPrevLocation}><GrPrevious/></button>
                    <div className={"Deg_feel"}>
                        {isLoading ? <></> :
                            <>
                                <h2>{temperature}&deg;</h2>
                                <h4><BiSun/>{weatherDescription}</h4>
                            </>
                        }
                    </div>
                    <button disabled={!nextEnabled && true} onClick={viewNextLocation}><GrNext/></button>
                </div>
            }

            <div className={"WeatherImg"}>
                <div className={"moon"}></div>
                <img src={isDay ? sunBuildings : darkBuildings} alt={"Dark Buildings"}/>
            </div>
        </div>
    )
}
export default Weather
