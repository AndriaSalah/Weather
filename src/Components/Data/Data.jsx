import './Data.scss'
import Chart from "./Chart/Chart.jsx";
import Hero from "./Hero/Hero.jsx";
import MoreDetails from "./MoreDetails/MoreDetails.jsx";




const Data = () => {


    return (
        <div className={"DataWrapper"}>
            <div className={"DataContainer"}>
                <Hero/>
                <Chart />
                <MoreDetails/>
            </div>
        </div>
    )
}
export default Data