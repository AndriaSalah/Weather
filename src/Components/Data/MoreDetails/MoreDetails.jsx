import {SiRainmeter} from "react-icons/si";
import ProgressBar from "../../Custom/ProgressBar/ProgressBar.jsx";
import {BsCloudRainHeavy, BsWind} from "react-icons/bs";
import {BiCloudLightRain} from "react-icons/bi";
import {FiSun} from "react-icons/fi";
import {FaTemperatureEmpty} from "react-icons/fa6";
import './MoreDetails.scss'
import PropTypes from 'prop-types';
import {useContext} from "react";
import {WeatherDataContext} from "../../../App.jsx";

const MoreDetails = ()=>{
const {currentData} = useContext(WeatherDataContext)
const wind_speed= currentData.wind?currentData.wind.speed :""
const feels_like= currentData.main?currentData.main.feels_like :""
const humidity= currentData.main?currentData.main.humidity :""

    return (
        <div className={"More_Details"}>
            <div className="div1">
                <div className={"Title_Icon"}>
                    <h4>Humidity</h4>
                    <div className={"icon"}><SiRainmeter/></div>
                </div>
                <h2>{humidity}% <p>High</p></h2>
                <ProgressBar Progress={humidity} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div2">
                <div className={"Title_Icon"}>
                    <h4>Wind</h4>
                    <div className={"icon"}><BsWind/></div>
                </div>
                <h2>{wind_speed} <p>km/h</p></h2>
                <ProgressBar Progress={(wind_speed/15)*100} Color={"#5C9CE5"} labels={true}/>
            </div>

            <div className="div3">
                <div className={"Title_Icon"}>
                    <h4>disabled</h4>
                    <div className={"icon"}><BiCloudLightRain/></div>
                </div>
                <h2>{0} <p>cm</p></h2>
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

                <h2>{feels_like}&deg;</h2>
                <ProgressBar Progress={(feels_like/50) * 100} Color={"#5C9CE5"} labels={true}/>
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
MoreDetails.propTypes={
    current: PropTypes.object
}

export default MoreDetails;