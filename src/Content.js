import React from 'react';
import BarChart from './BarChart';
import Map from './Map';


const Content = ({ chart, chartData }) => {
    
    switch(chart) {
      case 'bar':
        return (
          <BarChart 
            chartData={chartData} 
          />
        );
      case 'map':
        return (
          <Map 
            chartData={chartData} 
          />
        );
      default: 
    }
}

export default Content;