import {SiRainmeter} from "react-icons/si";
import {BsCloudRainHeavy, BsWind} from "react-icons/bs";
import {BiCloudLightRain} from "react-icons/bi";
import {FaTemperatureEmpty} from "react-icons/fa6";
import './MoreDetails.scss'

import {useContext} from "react";
import {WeatherDataContext} from "../../Main/Main.jsx";
import Card from "./Card/Card.jsx";
import {FaRegSnowflake} from "react-icons/fa";


const MoreDetails = () => {
    const {currentData} = useContext(WeatherDataContext)

    const wind_speed = currentData ? currentData.wind_speed_10m : ""
    const feels_like = currentData ? currentData.apparent_temperature : ""
    const humidity = currentData ? currentData.relative_humidity_2m : ""
    const precipitation = currentData ? currentData.precipitation : ""
    const rain = currentData? currentData.rain : ""
    const snowfall = currentData? currentData.snowfall : ""
    return (
        <div className={"More_Details"}>
            <Card className={"div1"} attribute={humidity} title={"Humidity"} unit={"%"} icon={<SiRainmeter/>}/>
            <Card equation={(wind_speed / 65) * 100} className={"div2"} attribute={wind_speed} title={"Wind speed"}
                  unit={"Km/h"} icon={<BsWind/>}/>
            <Card className={"div3"} title={"Precipitation"} icon={<BiCloudLightRain/>} attribute={precipitation}
                  unit={"mm"}/>
            <Card className={"div4"} title={"Snow fall"} icon={<FaRegSnowflake />} attribute={snowfall} unit={"mm"}/>
            <Card className={"div5"} title={"Feels Like"} icon={<FaTemperatureEmpty/>} attribute={feels_like}
                  unit={'°'}/>
            <Card className={"div6"} title={"Rain"} icon={<BsCloudRainHeavy/>} attribute={rain} unit={"mm"}/>
        </div>
    );
};


export default MoreDetails;