import _ from 'lodash';
import axios from 'axios'; 


function component() {
  const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());



// Build API
const bitcoin = async () => {
  try {
    const response = await axios.get('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd')
    console.log(response);
  } catch (error) {
    // handle error
    console.log(error);
  }
}


bitcoin(); 