import React, { useState, useEffect } from 'react';
import csvData from './data/GBD_2017_death_rate_opioid_use_disorders_all_ages.csv';
import { csv }from 'd3';
import Header from './Header';
import Nav from './Nav';
import Content from './Content';
import Description from './Description';
import { formatChartData, sortByTotalDeaths, getYearRange } from './data/processData';
import './App.css';

const App = () =>  {
  
  // Set data and error in state.
  const [chartData, setChartData] = useState([]);
  const [isError, setIsError] = useState(''); 
  const [activeButton, setActiveButton] = useState('bar');

  // Get raw data from csv file and process it.
  const getData = async (csvFile) => {
    try {
        const rawData = await csv(csvFile);
        const formattedData = formatChartData(rawData);
        const sortedData = formattedData.sort(sortByTotalDeaths);
        setChartData(sortedData);

    } catch(error) {
        setIsError('There was an error processing the csv file.');
    };
  }

  // Get data as side effect.
  useEffect( () => {
    getData(csvData)
  }, []);
  
  // Get year range for all countries. 
  // Individual countries may vary.
  const yearRangeAll = getYearRange(chartData);
    
  console.log(chartData);


  return (
    <div className="App">

        <Header />

        {!isError ? '' : <div className = "error">{isError}</div>}

        <Nav 
          activeButton={activeButton}
          onButtonChange={setActiveButton}
        />

        <main className="main-content">
          <Content 
            chart={activeButton} 
            chartData={chartData}
          />
        </main>

        <Description 
          yearRangeAll={yearRangeAll}/>
    </div>
  );
}

export default App;
