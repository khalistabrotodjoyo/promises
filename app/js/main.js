/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*jshint esversion: 6*/

const app = (() => {

  function getImageName(country) {

    // create and return a promise
	country = country.toLowerCase(); // teks yg di inputkan di ubah menjadi lowercase
	var promiseOfImageName = new Promise(function(resolve, reject) { //fungsi promise disini berfungsi utk melakukan apabila di terima akan kemana, dan tidak akan kemana
	setTimeout(function() {
		if (country === 'spain' || country === 'chile' || country === 'peru') {//jika teks berisi spain, chile, dan peru. maka akan muncul bendera negara
			resolve(country + '.png'); // mengambil nilai dari variabel country
		} else {
			reject(Error('Didn\'t receive a valid country name!'));
		}// resolve dan reject jika hanya ada dua pilihan atau keputusan
	  }, 1000);
	});
	console.log(promiseOfImageName);
	return promiseOfImageName; //return utk menampilkan bendera yang sesuai dengan teks yg di inputkan 
  }

  function isSpain(country) {

    // Optional - create and return a promise that resolves if input is "Spain"
	return new Promise((resolve, reject) => {
      if (country === 'Spain') {
        resolve('It is Spain!');
      } else {
        reject('It is not Spain!');
      }
    });
  }

  function flagChain(country) {

    // use the promise
	return getImageName(country)
    .catch(fallbackName) // jika ketemu error di get image name, maka akan dijalankan fallbackname
    .then(fetchFlag)
    .then(processFlag)
    .then(appendFlag)
    .catch(logError);

  }

  function allFlags(promiseList) {

    // use promise.all
	return Promise.all(promiseList)
    .catch(returnFalse);

  }


  // call the allFlags function


  // use Promise.race


  /* Helper functions */

  function logSuccess(result) {
    console.log('Success!:\n' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // fetch returns a promise
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // blob() returns a promise
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  } //menampilkan gambar 

  function fallbackName() {
    return 'chile.png';
  }

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();
