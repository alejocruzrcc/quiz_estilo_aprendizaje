import React from 'react'
import PropTypes from 'prop-types';

function Controls(props) {
    return (
        <div>
            <button
            onClick ={props.onAnswerButton} 
            className="boton-siguiente">Siguiente</button>

        </div>
    )
}
Controls.propTypes = {
    onAnswerButton: PropTypes.func.isRequired
  };

export default Controls
