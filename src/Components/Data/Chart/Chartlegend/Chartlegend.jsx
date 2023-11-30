import './Charlegend.scss'
export const Chartlegend = () => {
    return (
        <div className={"Chart-legend"}>
            <span className={"legend_max"}/><p>Max-temperature</p> <span className={"legend_min"}/><p>Min-temperature</p>
        </div>
    )
}