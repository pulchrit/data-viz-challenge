import React from 'react';
import Header from './Header';
import BarChart from './BarChart';
import csvData from './data/GBD_2017_death_rate_opioid_use_disorders_all_ages.csv';
import './App.css';

const App = () =>  {
  
  const size = {width: 1000, height: 700, padding: 50};

  const data = async () => await d3.csv(csvData);

  console.log(data);

  
  
  return (
    <div className="App">

        {/* Simple chart title. */}
        <Header />

        <BarChart size={size} data={data}

        />
        
        

        
    </div>
  );
}

export default App;
