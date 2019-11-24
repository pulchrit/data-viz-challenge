import React, { useState, useEffect } from 'react';
import csvData from './data/GBD_2017_death_rate_opioid_use_disorders_all_ages.csv';
import { csv }from 'd3';
import Header from './Header';
import Nav from './Nav';
import BarChart from './BarChart';
import Description from './Description';
import { formatChartData, sortByTotalDeaths, sortByLocation, getYearRange } from './data/processData';
import './App.css';

const App = () =>  {
  
  // Set unsorted data and error in state.
  const [chartData, setChartData] = useState([]);
  const [isError, setIsError] = useState(''); 

  // Get raw data from csv file and process it.
  const getData = async (csvFile) => {
    try {
        const rawData = await csv(csvFile);
        const formattedData = formatChartData(rawData);
        setChartData(formattedData);
    } catch(error) {
        setIsError('There was an error processing the csv file.');
    };
  }

  // Get data.
  useEffect( () => {
    getData(csvData)
  }, []);

  // Sort data. 
  const sortData = (chartData) => {
    //sort() sorts array in place, need to get copy first, then sort.
    const sortedByDeaths = [...chartData].sort(sortByTotalDeaths);
    const sortedByLocation = [...chartData].sort(sortByLocation);
    return [sortedByDeaths, sortedByLocation];
  }
 
  // Set sorted data and active button in state.
  const [sortedData, setSortedData] = useState(chartData.sort(sortByTotalDeaths));
  const [activeButton, setActiveButton] = useState('View by number of deaths');

  const handleButtonChange = (buttonName) => {
    setActiveButton(buttonName);
  }

  // Sort data.
  useEffect( () => {
    const sorted = sortData(chartData);
    setSortedData(activeButton === 'View by number of deaths' ? sorted[0] : sorted[1])
  }, [chartData, setSortedData, activeButton]);
  
  // Get year range for all countries. 
  // Individual countries may vary.
  const yearRangeAll = getYearRange(chartData);


  return (
    <div className="App">

        <Header />

        {!isError ? '' : <div className = "error">{isError}</div>}

        <Nav 
          activeButton={activeButton}
          onButtonChange={handleButtonChange}
        />

        <main className="main-content">
          <BarChart 
            chartData={sortedData}
          />
        </main>

        <Description 
          yearRangeAll={yearRangeAll}/>
    </div>
  );
}

export default App;
