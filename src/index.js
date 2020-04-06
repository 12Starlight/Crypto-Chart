import _ from 'lodash';
import './style.css'
import { test, bitcoin, cancelBitcoin, cancelBitcoinToken } from './api'; 


const component = () => {
  const element = document.createElement('div');

    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('title'); 
    element.classList.add('selections-wrapper');
    element.classList.add('chart-wrapper');
    element.classList.add('chart');
    element.classList.add('crypto-table-wrapper');
    element.classList.add('crypto-table');

  return element;
}

document.body.appendChild(component());

// bitcoin()
// abortController(); 
// cancelBitcoinToken();
// cancelBitcoin();