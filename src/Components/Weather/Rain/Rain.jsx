import './Rain.scss'

export const Rain = ({isRaining}) => {
    return (
        isRaining > 0 &&
        <div className={"RainWrapper"}>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>
            <i className="rain"></i><i className="rain"></i>


            {
                isRaining > 1 &&
                <>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                    <i className="rain"> < /i><i className="rain"></i>
                </>
            }
            {isRaining > 2 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
            {
                isRaining > 3 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>

                </>
            }
            {
                isRaining > 4 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }

            {
                isRaining > 5 &&
                <>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                    <i className="rain"></i><i className="rain"></i>
                </>
            }
        </div>
    )
}