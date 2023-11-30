import './Loading.scss'
import PropTypes from 'prop-types';

const Loading = () => {
    return (
        <>
            <div className={"loaderContainer"}>
                <span className="loader"></span>
            </div>
        </>
    )
        ;
};

export default Loading;

Loading.propTypes = {
    enabled: PropTypes.bool
}