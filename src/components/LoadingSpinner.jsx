import PropTypes from "prop-types";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  styles: PropTypes.string.isRequired,
};

/**
 * 
 *  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Centraliza verticalmente 
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8); /* Fundo semi-transparente opcional 
 */