import'./Hero.scss'
import {useContext, useState} from "react";
import {WeatherDataContext} from "../../Main/Main.jsx";
const Hero = () => {
const {name} = useContext(WeatherDataContext)
    let Iname
    if(name){
        if(name === "Dayana" || name === "dayana"){
            Iname = "I love you Dayana"
        }
        else Iname = name
    }
    return (
        <div className={"Hero"}>
            <div className={"TextContainer"}>
                <h2>Welcome back {Iname}</h2>
                <h4>{`Check out Today's weather information`}</h4>
            </div>
            {/*<div className={"Profile_Settings"}>*/}
            {/*    <h4>...</h4>*/}
            {/*    <img src={null} alt={null}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Hero;