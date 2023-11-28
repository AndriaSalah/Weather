import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import './Chart.scss'
import {useContext, useState} from "react";
import {WeatherDataContext} from "../../Main/Main.jsx";
import Dropdown from "../../Custom/Dropdown/Dropdown.jsx";


const Chart = () => {
    const {Five_daysData, isLoading, isDay} = useContext(WeatherDataContext)
    const Options = ["Temperature", "Wind Speed", "UV"]
    const [selectedOption, setSelectedOption] = useState(["temp_min", "temp_max"])
    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} `}</p>
                    {selectedOption[0]==="temp_min" &&
                        <>
                            <p className="Max-Unit">{`Max : ${payload[0]?.value}`}&deg;</p>
                            <p className="Min-Unit">{`Min : ${payload[1]?.value}`}&deg;</p>
                        </>
                    }
                    {
                        selectedOption[0]==="WindSpeed" &&
                        <>
                            <p className="Min-Unit">{`Wind speed :${payload[0]?.value}`} Km/h</p>
                        </>
                    }
                    {
                        selectedOption[0]==="UV" &&
                        <>
                            <p className="Min-Unit">{`UV index :${payload[0]?.value}`}</p>
                        </>
                    }
                    <p className="desc"></p>
                </div>
            );
        }

        return null;
    };

    function onOptionChange(option) {
        console.log()
        option === "Temperature" ? setSelectedOption(["temp_min", "temp_max"])
            : setSelectedOption([option.replace(" ", ""), ""])
    }

    return (
        <div className={"Chart"}>
            <header>
                <h3>Upcoming Days</h3>
                <Dropdown onChange={onOptionChange} defaultOption={"Temperature"} options={Options}>
                </Dropdown>
            </header>
            <ResponsiveContainer width='100%' height={230}>
                {!isLoading ?
                    <AreaChart width={1200} height={250} data={Five_daysData}
                               margin={{top: 30, right: 0, left: 0, bottom: 0}}>
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
                                   return `${split[2]}`
                               }} orientation={"top"}
                               tick={{fill: isDay ? 'black' : 'white', fillOpacity: 0.8}}/>
                        <YAxis width={35} padding={{top: 30}} axisLine={false} tickLine={false}
                               tick={{fill: isDay ? 'black' : 'white', fillOpacity: 0.8}}
                               tickFormatter={(unit) => {
                                   if (selectedOption[0]==="temp_min") return (unit+'°')
                                   else return unit
                               }}/>
                        <CartesianGrid strokeLinecap={"round"} stroke={"black"} opacity={0.1}/>
                        <Tooltip content={<CustomTooltip/>}/>
                        <Area type="monotone" dataKey={selectedOption[1]} stroke="#8884d8" fillOpacity={0.8}
                              fill="url(#colorMin)"/>
                        <Area type="monotone" dataKey={selectedOption[0]} stroke="#8884d8" fillOpacity={0.8}
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