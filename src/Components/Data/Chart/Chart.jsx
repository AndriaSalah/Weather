import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './Chart.scss'
import {useContext} from "react";
import {WeatherDataContext} from "../../Main/Main.jsx";
import Dropdown from "../../Custom/Dropdown/Dropdown.jsx";


const Chart = () => {
    const {Five_daysData, isLoading, isDay} = useContext(WeatherDataContext)

    return (
        <div className={"Chart"}>
            <header>
                <h3>Upcoming Days</h3>
                <div className={"Controls"}>
                    {/*<select name={"Options"} title={"Options"}>*/}
                    {/*    <option value={"Temperature"}>Temperature</option>*/}
                    {/*    <option value={"windSpeed"}>Wind</option>*/}
                    {/*    <option value={"Humidity"}>Humidity</option>*/}
                    {/*</select>*/}
                    <Dropdown defaultOption={"Temperature"}>
                        <option value={"Temperature"}>Temperature</option>
                        <option value={"windSpeed"}>Wind</option>
                        <option value={"Humidity"}>Humidity</option>
                    </Dropdown>
                </div>
            </header>
            <ResponsiveContainer width='100%' height={230}>
                {!isLoading ?
                    <AreaChart width={1200} height={250} data={Five_daysData}
                               margin={{top: 30, right: 0, left: 3, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#ea8282" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#ea8282" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor="#5C9CE5" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#5C9CE5" stopOpacity={0.2}/>
                            </linearGradient>
                        </defs>
                        <XAxis tickLine={false} axisLine={false} dataKey="day"
                               tickFormatter={(date) => {
                                   const split = date.split("-")
                                   return `${split[1]}/${split[2]}`
                               }} orientation={"top"}
                               tick={{fill: isDay ? 'black' : 'white',fillOpacity:0.8}}/>
                        <YAxis padding={{top: 30}} axisLine={false} tickLine={false}
                               tick={{fill: isDay ? 'black' : 'white',fillOpacity:0.8}}/>
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="temp_max" stroke="#8884d8" fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                        <Area type="monotone" dataKey="temp_min" stroke="#8884d8" fillOpacity={0.8}
                              fill="url(#colorMax)"/>
                    </AreaChart> :
                    <></>
                }

            </ResponsiveContainer>
            <div className={"tip"}>
                <span className={"max"}/><p>Max-temperature</p> <span className={"min"}/><p>Min-temperature</p>
            </div>
        </div>
    );
};

export default Chart;