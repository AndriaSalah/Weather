import './Dialog.scss'
import Loading from "../Loading/Loading.jsx";
import {forwardRef, useImperativeHandle, useRef} from "react";
import PropTypes from 'prop-types';
const Dialog = forwardRef (({dialogText,isLoading,children,onSubmit}, Ref) => {

    const dialog = useRef()
    useImperativeHandle(Ref,()=>({
        openDialog() {dialog.current.showModal()},
        closeDialog(){dialog.current.close()}
        })

    )
    return (
        <>
            <dialog ref={dialog} id="favDialog">
                <form onSubmit={(e)=>onSubmit(e)} method="dialog">
                    <h3>{dialogText}</h3>
                    {children}
                    <Loading enabled={isLoading}/>
                    {/*<button id="confirmBtn">Close the dialog</button>*/}
                </form>
            </dialog>
        </>
    );
});
Dialog.propTypes={
    dialogText:PropTypes.string,
    isLoading:PropTypes.bool
}
Dialog.displayName="Dialog-component"
export default Dialog;