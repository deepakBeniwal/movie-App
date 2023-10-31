import React, { useState } from 'react';
import './SideArrow.css';

const SideArrow = ({ isArrowClicked, onArrowClick }) => {
    const arrowStyles = {
        transition: 'all 0.2s ease-out',
        transform: isArrowClicked ? 'rotate(-45deg) scale(1.2)' : 'rotate(-45deg)'
    };

    return (
        <div id="arrowAnim">
            <div className={`arrowSliding ${isArrowClicked ? 'fade-in-left' : ''}`} onClick={onArrowClick}>
                <div className="arrow" style={arrowStyles}></div>
            </div>
            <div className="arrowSliding delay1">
                <div className="arrow"></div>
            </div>
            <div className="arrowSliding delay2">
                <div className="arrow"></div>
            </div>
            <div className="arrowSliding delay3">
                <div className="arrow"></div>
            </div>
        </div>
    );
};

export default SideArrow;
