import './Charlegend.scss'

export const Chartlegend = ({option}) => {
    return (

        <div className={"Chart-legend"}>
            {option[0] === "temp_min" &&
                <>
                    <span className={"legend_max"}/><p>Max-temperature</p> <span className={"legend_min"}/>
                    <p>Min-temperature</p></>
            }
        </div>
    )
}