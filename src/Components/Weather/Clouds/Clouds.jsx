import './Clouds.scss'
import cloud1 from "../../../assets/Union.svg";
import cloud3 from "../../../assets/Union-2.svg";

const cloudy = {
        visibility: "visible",
        opacity: 1
}
const Clouds = ({isCloudy}) => {
    return (
        <div className={"clouds"}>
            <div className={"cloud1"} style={isCloudy > 0 ? cloudy : {}}>
                    <img src={cloud1} alt={"cloud"}/>
            </div>
            <div className={"cloud2"} style={isCloudy > 1 ? cloudy : {}}>
                    <img src={cloud3} alt={"cloud"}/>
            </div>
        </div>
    )}
export default Clouds

