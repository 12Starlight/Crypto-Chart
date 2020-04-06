import _ from 'lodash';
import './style.css'
import { test, bitcoin, cancelBitcoin, cancelBitcoinToken } from './api'; 


function component() {
  const element = document.createElement('div');

    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('title'); 
    element.classList.add('selections-wrapper')

  return element;
}

document.body.appendChild(component());

// bitcoin()
// abortController(); 
// cancelBitcoinToken();
// cancelBitcoin();