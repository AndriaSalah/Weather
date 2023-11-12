import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './Chart.scss'
import {useContext} from "react";
import {WeatherDataContext} from "../../../App.jsx";
import Loading from "../../Custom/Loading/Loading.jsx";

const Chart = () => {
    const {Five_daysData,isLoading} = useContext(WeatherDataContext)
    const fiveday_array = Object.values(Five_daysData)

    return (
        <div className={"Chart"}>
            <header>
                <h3>Upcoming Hours</h3>
                <div className={"Controls"}>
                    <select name={"Options"} title={"Options"}>
                        <option value={"Temperature"}>Temperature</option>
                        <option value={"windSpeed"}>Wind</option>
                        <option value={"Humidity"}>Humidity</option>
                    </select>
                </div>
            </header>
            <ResponsiveContainer width='100%' height={230} >
                {!isLoading ?
                    <AreaChart width={1500} height={250} data={fiveday_array[0]}
                               margin={{top: 30, right: 0, left: 0, bottom: 0}}>
                        <XAxis tickLine={false} axisLine={false} dataKey="name"
                               tickFormatter={value=>value.split(' ')[1].slice(0, 5)} orientation={"top"}/>
                        <YAxis padding={{top:30}} axisLine={false} tickLine={false}/>
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="temperature" stroke="#8884d8" fillOpacity={0.8} fill="#5c9ce5"/>
                    </AreaChart>:
                    <></>
                }

            </ResponsiveContainer>
        </div>
    );
};

export default Chart;