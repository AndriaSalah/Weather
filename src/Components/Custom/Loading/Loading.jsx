import './Loading.scss'
import PropTypes, {bool} from 'prop-types';
const Loading = ({enabled}) => {
    return (
      <>
          <span className="loader" style={{display: enabled? "block" : "none"}}></span>
      </>
    );
};

export default Loading;

Loading.propTypes={
    enabled:bool
}