import'./Hero.scss'
const Hero = () => {
    return (
        <div className={"Hero"}>
            <div className={"TextContainer"}>
                <h2>Welcome back Andria</h2>
                <h4>{`Check out Today's weather information`}</h4>
            </div>
            <div className={"Profile_Settings"}>
                <h4>...</h4>
                <img src={null} alt={null}/>
            </div>
        </div>
    );
};

export default Hero;