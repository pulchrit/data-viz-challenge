import { extent } from 'd3';



// Sort by country name.
// TODO: Add interactivity, allow users to sort by country.
const sortByLocation = (a, b) => {
    if (a.location > b.location) {
        return 1;
    } else if (a.location < b.location) {
        return -1;
    }
    return 0;
}

// Sort by number of deaths.
const sortByTotalDeaths = (a, b) => {
    if (a.bothMean > b.bothMean) {
        return -1;
    } else if (a.bothMean < b.bothMean) {
        return 1;
    }
    return 0;
}

// Format raw data for use in charts.
const formatChartData = (rawData) => {

    // Get data by country
    const dataByCountry = rawData.reduce((accum, curr) => {
        accum[curr.location] 
        ? accum[curr.location] = [...accum[curr.location], curr] 
        : accum[curr.location] = [curr];

        return accum;
    }, {});

    // Consolidate data by country into new array of country objects
    // where mean, upper, lower values for all years are combined. 
    // Save years to array to use for display year range in viz.
    const chartData = Object.values(dataByCountry).map(countryArray => {
        return countryArray.reduce((accum, curr) => {

        // Get location, etc. as variables for readability.
        let { location, sex, mean, upper, lower } = curr;

        // Parse strings to floats for arithmetic.
        let meanFloat = parseFloat(mean);
        let upperFloat = parseFloat(upper);
        let lowerFloat = parseFloat(lower);
        
        // Set new object for each country, combining data 
        // for all years.

        // On first iteration, set location to '', on 
        // subsequent iterations reset location name.
        accum.location = location || '';
        // Combine # of death values for males
        if (sex === 'Male') {
            accum.maleMean = (accum.maleMean || 0) + meanFloat;
            accum.maleUpper = (accum.maleUpper || 0) + upperFloat;
            accum.maleLower = (accum.maleLower || 0) + lowerFloat;
        
            // Combine # of death values for females
        } else if (sex === 'Female') {
            accum.femaleMean = (accum.femaleMean || 0) + meanFloat;
            accum.femaleUpper = (accum.femaleUpper || 0) + upperFloat;
            accum.femaleLower = (accum.femaleLower || 0) + lowerFloat;
        
            // Combine # of death values for both
        } else if (sex === 'Both') {
            accum.bothMean = (accum.bothMean || 0) + meanFloat;
            accum.bothUpper = (accum.bothUpper || 0) + upperFloat;
            accum.bothLower = (accum.bothLower || 0) + lowerFloat;
        }
        // Before you use years, you must dedupe. Use Set to do so.
        // Below code creates a set (thus deduping), then spreads 
        // that set into a new array.
        // uniq = [...new Set(array)];
        accum.years = [...(accum.years || []), curr.year];
        
        return accum;
        }, {})
    });

    //return chartData.sort(sortByLocation);
    //return chartData.sort(sortByTotalDeaths);
    return chartData;
}

const getYearRange = (data) => {
    
    const years = data.reduce((accum, currVal) => 
        accum = [...accum, ...currVal.years]
    , []);

    const yearsDeduped = [...new Set(years)];

    return extent(yearsDeduped);
}

export { 
    formatChartData, 
    getYearRange,
    sortByLocation, 
    sortByTotalDeaths
};

