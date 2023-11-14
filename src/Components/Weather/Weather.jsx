import darkBuildings from '../../assets/test1.png'
import sunBuildings from '../../assets/test2.png'

import './Weather.scss'
import {GrNext, GrPrevious} from "react-icons/gr";
import {BiSun} from "react-icons/bi";
import {useContext} from "react";
import {WeatherDataContext} from "../../App.jsx";
import {format} from "date-fns";


// eslint-disable-next-line react/prop-types
const Weather = () => {


    const {currentData, isLoading,address,setLocationIndex } = useContext(WeatherDataContext)
    const country = currentData.sys ? currentData.sys.country : ""
    const city = currentData.main ? currentData.name : ""
    const temperature = currentData.main ? currentData.main.temp : ""
    const weather_desc = currentData.weather ? currentData.weather[0].main : ""

    function viewNextLocation(){

      setLocationIndex((index)=>index+1)
    }
    function viewPrevLocation(){
        setLocationIndex((index)=>index-1)
    }
    return (
        <div className={"WeatherWrapper"}>
            <div className={"location"}>
                <h4>{!address?`${city},${country}`:address}</h4>
                <p>{format(new Date(), "'Today, ' d MMM")}</p>
            </div>
            {

                <div className={"Temp_Controls"}>
                    <button onClick={viewPrevLocation}><GrPrevious/></button>
                    <div className={"Deg_feel"}>
                        {isLoading ? <></> :
                            <>
                                <h2>{temperature}&deg;</h2>
                                <h4><BiSun/>{weather_desc}</h4>
                            </>
                        }
                    </div>
                    <button onClick={viewNextLocation}><GrNext/></button>
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
