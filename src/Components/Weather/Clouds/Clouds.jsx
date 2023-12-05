import './Clouds.scss'
import cloud1 from "../../../assets/cloud-1.svg";
import cloud3 from "../../../assets/cloud-2.svg";


const Clouds = ({isCloudy}) => {
    return (
        isCloudy > 0 &&
        <div className={"clouds"}>
            <div className={"cloud1"}>
                <img src={cloud1} alt={"cloud"}/>
            </div>
            {isCloudy > 1 &&
                <>
                    <div className={"cloud2"}>
                        <img src={cloud3} alt={"cloud"}/>
                    </div>
                </>
            }

        </div>
    )
}
export default Clouds

