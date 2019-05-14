import React from 'react';
import './PillButton.scss';
import PropTypes from 'prop-types';

export default function PillButton(props) {

    function generateButtons() {
        return props.buttonData.map((btn, i) => {
            return <button key={i} onClick={props.handler}>{btn}</button>
        });
    }

    return (
        <div className="buttonsWrapper">
            {generateButtons()}
        </div>
    );
}

PillButton.propTypes = {
    buttonData: PropTypes.array.isRequired,
    handler: PropTypes.func
};