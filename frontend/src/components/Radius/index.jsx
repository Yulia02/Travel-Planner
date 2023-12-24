import React, { useState } from 'react';
import './Radius.css'

const RadiusControl = ({ radius, setRadius }) => {
    const handleRadiusChange = (event) => {
        const newRadius = parseInt(event.target.value, 10);
        setRadius(newRadius);
    };

    return (
        <div className="controller">
            <h2 style={{marginTop: 0}}>Радіус маркерів: {radius} м</h2>
            <input
                type="range"
                min={100}
                max={1000}
                step={100}
                value={radius}
                onChange={handleRadiusChange}
            />
        </div>
    );
};

export default RadiusControl;
