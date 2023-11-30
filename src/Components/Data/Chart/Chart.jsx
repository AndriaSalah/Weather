import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './Chart.scss'
import {useContext, useState} from "react";
import {WeatherDataContext} from "../../Main/Main.jsx";
import Dropdown from "../../Custom/Dropdown/Dropdown.jsx";
import Loading from "../../Custom/Loading/Loading.jsx";
import {ChartTooltip} from "./ChartTooltip/ChartTooltip.jsx";
import {Chartlegend} from "./Chartlegend/Chartlegend.jsx";



const Chart = () => {
    const {Five_daysData, isLoading, isDay} = useContext(WeatherDataContext)
    const Options = ["Temperature", "Wind Speed", "UV", "Rain"]
    const [selectedOption, setSelectedOption] = useState(["temp_min", "temp_max"])
    const Colors = {
        Gradient_max: "#ea8282",
        Gradient_min: "#5C9CE5",
        Gradient_start : "#464545",
        Tick_color: isDay ? 'black' : 'white',
        StrokeColor_1 : "#ea8282",
        StrokeColor_2 : "#5C9CE5"
    }

    function onOptionChange(option) {
        option === "Temperature"
            ? setSelectedOption(["temp_min", "temp_max"])
            : setSelectedOption([option.replace(" ", ""), ""])
    }

    return (
        <div className={"Chart"}>
            <header>
                <h3>Upcoming Days</h3>
                <Dropdown onChange={onOptionChange} defaultOption={"Temperature"} options={Options}>
                </Dropdown>
            </header>
            <ResponsiveContainer width='100%' height="75%">
                {!isLoading ?
                    <AreaChart data={Five_daysData}
                               margin={{top: 30, right: 0, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_max} stopOpacity={0.6}/>
                                <stop offset="95%" stopColor={Colors.Gradient_start} stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={Colors.Gradient_min} stopOpacity={0.6}/>
                                <stop offset="95%" stopColor={Colors.Gradient_start} stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <XAxis height={10} tickLine={false} axisLine={false} dataKey="day"
                               tickFormatter={(date) => {
                                   const split = date.split("-")
                                   return `${split[2]}`
                               }} orientation={"top"}
                               tick={{fill: Colors.Tick_color , fillOpacity: 0.8}}/>
                        <YAxis width={35} padding={{top: 30}} axisLine={false} tickLine={false}
                               tick={{fill: Colors.Tick_color , fillOpacity: 0.8}}
                               tickFormatter={(unit) => (
                                   selectedOption[0] === "temp_min" ? (unit + '°') : unit)}/>
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip content={<ChartTooltip selectedOption={selectedOption}/>}/>
                        <Area type="monotone" dataKey={selectedOption[1]} stroke={Colors.StrokeColor_1} fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                        <Area type="monotone" dataKey={selectedOption[0]} stroke={Colors.StrokeColor_2} fillOpacity={0.8}
                              fill="url(#colorMax)"/>
                    </AreaChart> : <Loading/>
                }
            </ResponsiveContainer>
           <Chartlegend/>
        </div>
    );
};

export default Chart;