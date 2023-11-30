import './ChartTooltip.scss'
export const ChartTooltip = ({active, payload, label, selectedOption}) => {
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
                {
                    selectedOption[0]==="Rain" &&
                    <>
                        <p className="Min-Unit">{`Rain :${payload[0]?.value}`}</p>
                    </>
                }
                <p className="desc"></p>
            </div>
        );
    }

    return null;
};