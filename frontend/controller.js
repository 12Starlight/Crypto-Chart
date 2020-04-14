import * as d3 from 'd3'; 
import { data } from '../data/coins';
import LineChart from './lineChart';

console.log('Controller works!')

// Global Variables
let lineChart; 
// debugger; 
export const filteredData = {};
const parseTime = d3.timeParse('%d/%m/%Y');
const formatTime = d3.timeFormat('%d/%m/%Y'); 
export const color = d3.scaleOrdinal(d3.schemeDark2); 

// Helper Functions
const log = () => {
  console.log('changed');
  console.log(parseTime('31/10/2017'));
  console.log(formatTime(100004050)); // Always a number
}

const coinChanged = () => {
  lineChart.wrangleData();  
}

// // Event Listener
document.getElementById('coin-selector').onchange = () => {
  coinChanged(); 
  // console.log('coin changed');
}

document.getElementById('perspective-selector').onchange = () => {
  lineChart.wrangleData(); 
}

// Retrieve Data
// d3.json('../data/coins.json').then((data) => {
// })
console.log(data);


// Prepare and clean data
for (let coin in data) {
  if (!data.hasOwnProperty(coin)) {
    continue;
  }

  filteredData[coin] = data[coin].filter((d) => {
    return !(d.price_usd === null)
  })

  filteredData[coin].forEach((d) => {
    d.price_usd = +d.price_usd;
    d['24h_vol'] = +d['24h_vol'];
    d.market_cap = +d.market_cap;
    d.date = parseTime(d.date)
  }); 
}
console.log(filteredData); 


lineChart = new LineChart('#chart');