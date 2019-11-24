import React from 'react';
import './Tooltip.css';
import * as d3 from 'd3';

// I'm sure there is a better way to render the tooltips, but this is what
// I could get working.
// Attribution: https://swizec.com/blog/tooltips-and-state-across-various-d3-charts-in-a-react-dashboard/swizec/8904

const Tooltip = ({ selected }) => {

    // Format tip to one decimal point.
    const tipFormat = d3.format(",.1f");

    // Dedupe years array and get min, max years.
    const years = d3.extent([...new Set(selected.years)]);

    return (
        // I'm sure there is a better way to control the position of the tooltips...
        <foreignObject x={selected.x - 40} y={selected.y - 200} width={125} height={100}>
            <div className='tooltip'>
                <h6>{selected.location}</h6>
                <ul className="tip-data">
                    <li>Mean: {tipFormat(selected.bothMean)}</li>
                    <li>Female: {tipFormat(selected.femaleMean)}</li>
                    <li>Male: {tipFormat(selected.maleMean)}</li>
                    <li>Years: {years[0]} - {years[1]}</li>
                </ul>
            </div>
        </foreignObject>
    )
}

export default Tooltip;