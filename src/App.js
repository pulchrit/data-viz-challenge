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
  
  // Set data and error in state.
  const [chartData, setChartData] = useState([]);

  // Get raw data from csv file and process it.
  const getData = async (csvFile) => {
    try {
        const rawData = await csv(csvFile);
        const formattedData = formatChartData(rawData);
        setChartData(formattedData);
        //const sortedDataByDeath = formattedData.sort(sortByTotalDeaths);
        //setChartDataByDeath(sortedDataByDeath);
        //console.log('sortedDAtaBydeath', sortedDataByDeath);
        //const sortedDataByLocation = formattedData.sort(sortByLocation);
       // setChartDataByLocation(sortedDataByLocation);
    } catch(error) {
        setIsError('There was an error processing the csv file.');
    };
  }

  // Get data as side effect.
  useEffect( () => {
    getData(csvData)
 // }, [setChartDataByDeath, setChartDataByLocation]);
  }, []);

  // Sort data. 
  const sortData = (chartData) => {
    //setChartDataByDeath(chartData = chartData.sort(sortByTotalDeaths));
    //setChartDataByLocation(chartData = chartData.sort(sortByLocation));
    const sortedByDeaths = [...chartData].sort(sortByTotalDeaths);
    const sortedByLocation = [...chartData].sort(sortByLocation);
    console.log('sortdeaths in sort data', sortedByDeaths);
    console.log('sortedLocation in sort data', sortedByLocation);
    return [sortedByDeaths, sortedByLocation];
    
  }
 
  //const [chartDataByDeath, setChartDataByDeath] = useState([]);
  //const [chartDataByLocation, setChartDataByLocation] = useState([]);
  const [sortedData, setSortedData] = useState(chartData.sort(sortByTotalDeaths));
  const [isError, setIsError] = useState(''); 
  const [activeButton, setActiveButton] = useState('View by number of deaths');

  const handleButtonChange = (buttonName) => {
    /* setSortedData(sorted => {
      activeButton === 'View by number of deaths' 
      ? sorted = chartDataByDeath
      : sorted = chartDataByLocation; 
      }
    );  */

    setActiveButton(button => button = buttonName);
   /*  setSortedData(buttonName === 'View by number of deaths' 
      ? sortedByDeaths 
      : sortedByLocation) */
    
  }

  useEffect( () => {
    const sorted = sortData(chartData);
    setSortedData(activeButton === 'View by number of deaths' ? sorted[0] : sorted[1])
  }, [chartData, setSortedData, activeButton]);
  
  // Get year range for all countries. 
  // Individual countries may vary.
  //const yearRangeAll = getYearRange(chartDataByDeath);
  const yearRangeAll = getYearRange(chartData);

  /* const sortedChartData = activeButton === 'View by number of deaths' 
    ? chartData.sort(sortByTotalDeaths) 
    : chartData.sort(sortByLocation);
 */
  console.log('activeButton', activeButton);
  console.log('sortedData from state', sortedData);
    
  //console.log('bydeath', chartDataByDeath);
  //console.log('bylocation', chartDataByLocation);


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
            //chartData={activeButton === 'View by number of deaths' ? chartDataByDeath : chartDataByLocation}
            chartData={sortedData}
          />
          {/* <Content 
            chart={activeButton} 
            chartData={chartData}
          /> */}
        </main>

        <Description 
          yearRangeAll={yearRangeAll}/>
    </div>
  );
}

export default App;
