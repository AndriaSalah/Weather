import './Snow.scss'

export const Snow = ({isSnowy}) => {
    return (
        isSnowy > 0 &&
        <div className={"SnowWrapper"}>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            <div className="snowflake"></div>
            {
                isSnowy > 1 &&
                <>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                </>
            }
            {
                isSnowy > 2 &&
                <>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                    <div className="snowflake"></div>
                </>
            }
        </div>
    )
}