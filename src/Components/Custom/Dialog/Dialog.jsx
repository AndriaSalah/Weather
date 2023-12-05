import './Dialog.scss'
import {forwardRef, useEffect, useImperativeHandle, useRef} from "react";

const Dialog = forwardRef (({dialogText,children,onSubmit}, Ref) => {

    const dialog = useRef()
    useImperativeHandle(Ref,()=>({
        openDialog() {dialog.current.showModal()},
        closeDialog(){dialog.current.close()}
        })
    )
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            <dialog ref={dialog} id={"Modal"}>
                <form onSubmit={(e)=>onSubmit(e)} method="dialog">
                    {dialogText && <h3>{dialogText}</h3>}
                    {children}
                </form>
            </dialog>
        </>
    );
});
Dialog.displayName="Dialog-component"
export default Dialog;