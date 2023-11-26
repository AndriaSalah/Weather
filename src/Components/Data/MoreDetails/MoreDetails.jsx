import {SiRainmeter} from "react-icons/si";
import ProgressBar from "../../Custom/ProgressBar/ProgressBar.jsx";
import {BsCloudRainHeavy, BsWind} from "react-icons/bs";
import {BiCloudLightRain} from "react-icons/bi";
import {FiSun} from "react-icons/fi";
import {FaTemperatureEmpty} from "react-icons/fa6";
import './MoreDetails.scss'

import {useContext} from "react";
import {WeatherDataContext} from "../../../App.jsx";


const MoreDetails = ()=>{
const {currentData,isLoading} = useContext(WeatherDataContext)

const wind_speed= currentData?currentData.wind_speed_10m :""
const feels_like= currentData?currentData.apparent_temperature :""
const humidity= currentData?currentData.relative_humidity_2m :""
    const precipitation = currentData?currentData.precipitation:""

    return (
        <div className={"More_Details"}>
            <div className="div1">
                <div className={"Title_Icon"}>
                    <h4>Humidity</h4>
                    <div className={"icon"}><SiRainmeter/></div>
                </div>
                <h2>{isLoading? 0 :humidity}% <p>{humidity<50?"Low":"High"}</p></h2>
                <ProgressBar Progress={isLoading? 0 : humidity} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div2">
                <div className={"Title_Icon"}>
                    <h4>Wind</h4>
                    <div className={"icon"}><BsWind/></div>
                </div>
                <h2>{isLoading? 0 :wind_speed} <p>km/h</p></h2>
                <ProgressBar Progress={isLoading? 0 : (wind_speed/65)*100} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div3">
                <div className={"Title_Icon"}>
                    <h4>Precipitation</h4>
                    <div className={"icon"}><BiCloudLightRain/></div>
                </div>
                <h2>{precipitation} <p>mm</p></h2>
                <ProgressBar Progress={0} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div4">
                <div className={"Title_Icon"}>
                    <h4>disabled</h4>
                    <div className={"icon"}><FiSun/></div>
                </div>
                <h2>0 <p>low</p></h2>
                <ProgressBar Progress={0} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div5">
                <div className={"Title_Icon"}>
                    <h4>Feels Like</h4>
                    <div className={"icon"}><FaTemperatureEmpty/></div>
                </div>

                <h2>{isLoading? 0 :feels_like}&deg;</h2>
                <ProgressBar Progress={isLoading? 0 : (feels_like/50) * 100} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div6">
                <div className={"Title_Icon"}>
                    <h4>disabled</h4>
                    <div className={"icon"}><BsCloudRainHeavy/></div>
                </div>
                <h2>0</h2>
                <ProgressBar Progress={0} Color={"#5C9CE5"} labels={true}/>
            </div>
        </div>
    );
};


export default MoreDetails;