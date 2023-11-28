import {useEffect, useRef, useState} from 'react';
import {FaAngleDown} from "react-icons/fa";
import './Dropdown.scss'
const Dropdown = ({ defaultOption , options=[] ,onChange}) => {
    const [isClicked, setIsClicked] = useState(false)
    const [selectedOption , setSelectedOption] = useState()
    const styles = {
        visibility: isClicked ? "visible" : "hidden",
        opacity: isClicked ? 1 : 0
    }
    const SelectRef = useRef()

    useEffect(() => {
        function handleClickOutside(e){
            if(SelectRef.current && !SelectRef.current.contains(e.target)){
                setIsClicked(false)
            }
        }
        document.addEventListener('click',handleClickOutside)
        return ()=>{
            document.removeEventListener('click',handleClickOutside)
        }
    }, []);
    const handleClick = () => setIsClicked(!isClicked)
    const setOption = (option) =>{
        setSelectedOption(option)
        setIsClicked(false)
    }
    useEffect(() => {
        selectedOption ?
        onChange(selectedOption) : onChange(defaultOption)
    }, [selectedOption]);
    return (
        <div ref={SelectRef} className={"Select"}>
        <div className={"Main"} onClick={handleClick}>
            <p>{!selectedOption? defaultOption : selectedOption}</p>
            <FaAngleDown />
        </div>
            <div className={"Dropdown"} style={{...styles}}>
                {options.map((option,index) =>(
                    <p key={index} onClick={()=>setOption(option)}>{option}</p>
                    )
                    )}
            </div>
        </div>
    );
};

export default Dropdown;