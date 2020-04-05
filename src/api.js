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

var CancelToken = axios.CancelToken;
var source = CancelToken.source();

export const cancelBitcoin = () => {

  axios.get('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd', {
    cancelToken: source.token
  }).catch(function (thrown) {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled', thrown.message);
    } else {
      // handle error
    }
  });

  axios.post('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd', {
    name: 'new name'
  }, {
    cancelToken: source.token
  })
  // cancel the request (the message parameter is optional)
  source.cancel('Operation canceled by the user.');
}
  
var cancel;

export const cancelBitcoinToken = () => {

  axios.get('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd', {
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
    });

  // cancel the request
  cancel();

}



// export const test = async () => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
//     console.log(response);  
//   } catch (error) {
//     console.log(error);
//   }
// }; 


export const bitcoin = () => {
  axios.get('https://cloud-sse.iexapis.com/stable/cryptoQuotes?symbols=BTCUSDT&token=pk_9dbe2686af9e4869b46f1ff7fb1b54dd')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .then(() => {

    });
}


// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });