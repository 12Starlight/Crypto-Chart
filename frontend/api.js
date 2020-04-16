import axios from 'axios';


// // Build API
// export const bitcoin = async () => {
//   try {
//     const response = await axios.get('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd')
//     console.log(response);
//   } catch (error) {
//     // handle error
//     console.log(error);
//   }
// }

// bitcoin(); 


// Testing AXIOS
// export const test = async () => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     console.log(response);  
//   } catch (error) {
//     console.log(error);
//   }
// }; 
export const test = () => {
  return console.log('test'); 
}


// const config = {
//   headers: {
//     'Content-Type': 'text/event-stream'
//   }
// }

// export const bitcoin = () => {
//   debugger; 
//   axios.get(
//     'https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd',
//     config
//     )
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .then(() => {

//     });
// }


// Node.js SSE Client
const request = require('request');

let stream;
let partialMessage;

const connect = () {
  stream = request({
    url: 'https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd',
    headers: {
      'Content-Type': 'text/event-stream'
    }
  })
}
connect(); 

stream.on('socket', () => {
  console.log('Connected');
});

stream.on('end', () => {
  console.log('Reconnecting');
  connect();
});

stream.on('complete', () => {
  console.log('Reconnecting');
});

stream.on('error', () => {
  console.log('Error', err);
  connect();
});





