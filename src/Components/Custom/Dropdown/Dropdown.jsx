import  {useState} from 'react';
import {FaAngleDown} from "react-icons/fa";
import './Dropdown.scss'
const Dropdown = ({children, defaultOption}) => {
    const [isClicked, setIsClicked] = useState(false)
    const [selectedOption , setSelectedOption] = useState("")
    const styles = {
        visibility: isClicked ? "visible" : "hidden",
        opacity: isClicked ? 1 : 0
    }
    return (
        <div className={"Select"}>
        <div className={"Main"} onClick={()=>setIsClicked(!isClicked)}>
            <p>{defaultOption}</p>
            <FaAngleDown />
        </div>
            <div className={"Dropdown"} style={{...styles}}>
                {children}
            </div>
        </div>
    );
};

export default Dropdown;