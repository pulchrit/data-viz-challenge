import React, { useState, useRef, useEffect } from 'react';
import Tooltip from './Tooltip';
import './BarChart.css';
import * as d3 from 'd3';

const BarChart = ({ chartData }) => {

    // Set state for tooltip
    const [tooltip, setTooltip] = useState(null);

    const width = 1000, height = 3500, leftPadding = 200, padding = 80;

    // Get access to DOM for svg.g. Will create chart here.
    const barRef = useRef();

   
    // I'm doing something incorrectly with the render because 
    // the chart is rendering twice. Maybe I need to look into 
    // performance optimizers in React.
    useEffect( () => {

        const drawBarChart = (data) => {

            // Access ref (svg.g) to place chart inside. 
            const barChart = d3.select(barRef.current);

            
            
            const chartGroup = barChart.append('g')
                .attr('transform', 'translate(0,0)')
                .attr('id', 'chartGroup');

            // Define xScale as linear for # of deaths.
            const xScale = d3.scaleLinear()
                .domain([0, d3.max(chartData, (d) => d.bothUpper)]).clamp(true).nice()
                .range([leftPadding, width - padding]);
                
            // Define yScale as band scale on country name.
            const yScale = d3.scaleBand()
                .domain(chartData.map(d => d.location))
                .range([padding, height - padding])
                .padding(.05);
    
            // Append bottom x axis (# of deaths).
            chartGroup.append('g')
            //barChart.append('g')
                .attr('transform', `translate(0, ${height - padding})`)
                .attr('class', 'axis')
                .call(
                    d3.axisBottom(xScale)
                        .ticks(25, ",f")      
                );
    
            // Append top x axis (# of deaths).
            chartGroup.append('g')
            //barChart.append('g')
                .attr('transform', `translate(0, ${padding})`)
                .attr('class', 'axis')
                .call(
                    d3.axisTop(xScale)
                        .ticks(25, ",f")
                );
    
            // Append y axis
            chartGroup.append('g')
            //barChart.append('g')
                    .attr('transform', `translate(${leftPadding}, 0)`)
                    .attr('class', 'axis')
                    .call(d3.axisLeft(yScale));
            
            // Append top axis label.
            chartGroup.append('text')
            //barChart.append('text')
                .attr('transform', `translate(${((width - leftPadding - padding)/2) + leftPadding}, ${padding/2})`)
                .attr('class', 'x-labels')
                .style('text-anchor', 'middle')
                .text('Number of deaths per 100,000 people')
    
            // Append bottom axis label.
            chartGroup.append('text')
            //barChart.append('text')
                .attr('transform', `translate(${((width - leftPadding - padding)/2) + leftPadding}, ${height - padding/2})`)
                .attr('class', 'x-labels')
                .style('text-anchor', 'middle')
                .text('Number of deaths per 100,000 people')
                
            // Add bars/rects to chart. 
            chartGroup.append('g')
            //barChart.append('g')
                .selectAll('rect')
                .data(chartData)
                .join('rect')
                .attr('width', (d) => xScale(d.bothMean) - leftPadding)
                .attr('height', yScale.bandwidth())
                .attr('fill', "lightgray")
                .attr('x', leftPadding + 1)
                .attr('y', (d) => yScale(d.location))
                .on('mouseover', (d) => {
                    let x = d3.event.pageX;
                    let y = d3.event.pageY; 
                    setTooltip({
                        ...d,
                        x,
                        y  
                    });
                }) 
                .on('mouseout', (d) => setTooltip(null))
    
            // Add error bars to chart.
            chartGroup.append('g')
            //barChart.append('g')
                .selectAll('line')
                .data(chartData)
                .join('line')
                .attr('x1', (d) => xScale(d.bothLower))
                .attr('x2', (d) => xScale(d.bothUpper))
                .attr('y1', (d) => yScale(d.location) + yScale.bandwidth()/2)
                .attr('y2', (d) => yScale(d.location) + yScale.bandwidth()/2)
                .attr('stroke', '#667580')
                .attr('stroke-width', '2px')
                .attr('stroke-linecap', 'round');
        }
       
        d3.select('#chartGroup').remove();
       
        drawBarChart(chartData);

    }, [chartData]);


    return (
        <svg 
            className="svgChart"
            width={width} 
            height={height}
            ref={barRef}
            // This makes the chart technically responsive, but there must be 
            // another better, more readable way to manage it.
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
        >
           {/*  <g 
                ref={barRef}
                transform={`translate(0, 0)`}
            /> */}

            {tooltip && 
                <Tooltip 
                    selected={tooltip}
                />
            }
        </svg>
    )
}

export default BarChart;