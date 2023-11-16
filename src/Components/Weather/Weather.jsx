import darkBuildings from '../../assets/test1.png'
import sunBuildings from '../../assets/test2.png'

import './Weather.scss'
import {GrNext, GrPrevious} from "react-icons/gr";
import {BiSun} from "react-icons/bi";
import {useContext, useEffect, useState} from "react";
import {WeatherDataContext} from "../../App.jsx";
import {format} from "date-fns";


// eslint-disable-next-line react/prop-types
const Weather = ({address,setLocationIndex,index,savedLocations}) => {

    const[nextEnabled , setNextEnabled] = useState(()=>(index < savedLocations.length))
    const[prevEnabled , setPrevEnabled] = useState(()=>(index > 0))
    const {currentData, isLoading} = useContext(WeatherDataContext)
    const country = currentData.sys ? currentData.sys.country : ""
    const city = currentData.main ? currentData.name : ""
    const temperature = currentData.main ? currentData.main.temp : ""
    const weather_desc = currentData.weather ? currentData.weather[0].main : ""


    useEffect(() => {
        if(index === savedLocations.length-1) setNextEnabled(false)
        else setNextEnabled(true)
        if(index === 0) setPrevEnabled(false)
        else setPrevEnabled(true)
    }, [index]);
    function viewNextLocation() {
        if (++index < savedLocations.length) setLocationIndex((index) => index + 1)


    }
    function viewPrevLocation(){
        if(--index>=0 ){
            setLocationIndex((index)=>index-1)
            // if(index === 0) setPrevEnabled(false)
            // else set
        }

    }
    return (
        <div className={"WeatherWrapper"}>
            <div className={"location"}>
                <h4>{!address?`${city},${country}`:address}</h4>
                <p>{format(new Date(), "'Today, ' d MMM")}</p>
            </div>
            {

                <div className={"Temp_Controls"}>
                    <button disabled={!prevEnabled && true} onClick={viewPrevLocation}><GrPrevious/></button>
                    <div className={"Deg_feel"}>
                        {isLoading ? <></> :
                            <>
                                <h2>{temperature}&deg;</h2>
                                <h4><BiSun/>{weather_desc}</h4>
                            </>
                        }
                    </div>
                    <button disabled={!nextEnabled && true} onClick={viewNextLocation}><GrNext/></button>
                </div>
            }

            <div className={"WeatherImg"}>
                <div className={"moon"}></div>
                <img src={darkBuildings} alt={"Dark Buildings"}/>
            </div>
        </div>
    )
}
export default Weather
