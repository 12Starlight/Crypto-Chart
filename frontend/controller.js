import * as d3 from 'd3'; 

console.log('Controller works!')

// Global Variables
let lineChart;
const filteredData = {};
const parseTime = d3.timeParse('%d/%m/%Y');
const formatTime = d3.timeFormat('%d/%m/%Y'); 
const color = d3.scaleOrdinal(d3.schemeDark2); 

// Helper Functions
const log = () => {
  console.log('changed');
  console.log(parseTime('31/10/2017'));
  console.log(formatTime(100004050)); // Always a number
}

// Event Listener
document.getElementsByClassName('chart').onchange = log();

