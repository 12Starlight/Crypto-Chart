import * as d3 from 'd3'; 
import { data } from '../data/coins';
import LineChart from './lineChart';

console.log('Controller works!')

// Global Variables
let lineChart;
export const filteredData = {};
const parseTime = d3.timeParse('%d/%m/%Y');
const formatTime = d3.timeFormat('%d/%m/%Y'); 

// Helper Functions
const log = () => {
  console.log('changed');
  console.log(parseTime('31/10/2017'));
  console.log(formatTime(100004050)); // Always a number
}

// Event Listener
// document.getElementById('#chart').onchange = log();


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