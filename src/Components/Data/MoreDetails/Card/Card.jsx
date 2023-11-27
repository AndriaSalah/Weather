import {SiRainmeter} from "react-icons/si";
import ProgressBar from "../../../Custom/ProgressBar/ProgressBar.jsx";
import {useContext} from "react";
import {WeatherDataContext} from "../../../Main/Main.jsx";
import Loading from "../../../Custom/Loading/Loading.jsx";
import './Card.scss'

const Card = ({attribute, className, title, unit, icon, equation}) => {
    const {isLoading} = useContext(WeatherDataContext)
    return (
        <div className={className}>
            {isLoading ?
                <Loading/> :
                <>
                    <div className={"Title_Icon"}>
                        <h4>{title}</h4>
                        <div className={"icon"}>{icon}</div>
                    </div>
                    <h2>{isLoading ? 0 : attribute}{unit === '°' || unit === '%' ? unit : ''}
                        <p> {unit !== '°' && unit !== '%' ? unit : ''} </p></h2>
                    <ProgressBar Progress={isLoading ? 0 : equation ? equation : attribute} Color={"#5C9CE5"}
                                 labels={true}/>
                </>
            }
        </div>
    )
}
export default Card