import './Data.scss'
import Chart from "./Chart/Chart.jsx";
import Hero from "./Hero/Hero.jsx";
import MoreDetails from "./MoreDetails/MoreDetails.jsx";
import {forwardRef} from "react";


const Data = forwardRef((props, ref)  => {


    return (
        <div ref={ref} className={"DataWrapper"}>
            <div className={"DataContainer"}>
                <Hero/>
                <Chart />
                <MoreDetails/>
            </div>
        </div>
    )
})
Data.displayName="Data_component"
export default Data