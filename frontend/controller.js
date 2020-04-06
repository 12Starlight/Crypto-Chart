console.log('Controller works!')

// Global Variables
let lineChart;

// Helper Functions
const log = () => {
  console.log('changed');
}

// Event Listener
document.getElementsByClassName('chart').onchange = log();

