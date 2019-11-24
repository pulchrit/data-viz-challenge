import React from 'react';
import './Description.css';

const Description = ({ yearRangeAll }) => {

    return (
        <div className="div-description">
            <h3>Chart Information</h3>
            <h4>Data sources:</h4>
                <ul className="description-title">
                    <li>Global Burden of Disease Collaborative Network.</li>
                    <li>Global Burden of Disease Study 2017 (GBD 2017) Results.</li>
                    <li>Seattle, United States: Institute for Health Metrics and Evaluation (IHME), 2018.</li>
                    <li><a href='http://ghdx.healthdata.org/gbd-results-tool'>Available from healthdata.org</a>.</li>
                    <li><a href='http://ghdx.healthdata.org/gbd-results-tool?params=gbd-api-2017-permalink/c12b65baf872c661f4640bb583320b4e'>Permalink to opioid use disorder data</a>.</li>
                </ul>
            <h4>Assumptions:</h4>
                <ul className="description-title">
                    <li>Population is defined as inhabitants of a country.</li>
                    <li>Opioid deaths are shown as number of opioid deaths per 100,000 deaths, cumulative for the period {yearRangeAll[0]} - {yearRangeAll[1]}.</li>
                    <li>Mean number of deaths for both sexes is plotted along with upper and lower uncertainty boundaries.</li>
                    <li>Data specific to males and females is shown when data points are hovered over.</li>
                </ul>
        </div>
    );
}

export default Description;
