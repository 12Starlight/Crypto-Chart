import _ from 'lodash';
import { test, bitcoin, cancelBitcoin, cancelBitcoinToken } from './api'; 


function component() {
  const element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

// bitcoin()
// abortController(); 
// cancelBitcoinToken();
cancelBitcoin();