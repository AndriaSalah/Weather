import './Loading.scss'
import PropTypes from 'prop-types';
const Loading = ({enabled}) => {
    return (
      <>
          <span className="loader" style={{display: enabled? "block" : "none"}}></span>
      </>
    );
};

export default Loading;

Loading.propTypes={
    enabled:PropTypes.bool
}