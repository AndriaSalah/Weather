
import './ProgressBar.scss'

const ProgressBar = ({Color = "black", Progress, labels = false}) => {
    return (
        <div className={"Progress-bar__container"}>
            {labels &&
                <div className={"Progress-Bar__Labels"}>
                    <p>Low</p>
                    <p>High</p>
                </div>
            }
            <div className={"Progress-Bar"}>
                <div className={"Progress-Bar__fill"} style={{background: Color, width: `${Progress}%`}}></div>
            </div>
        </div>
    )
}


export default ProgressBar