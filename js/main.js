function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

//NewTAB

//Variable Creation
const plaintextAlphabet = [];
let cryptotextAlphabet = "zyxwvutsrqponmlkjihgfedcba";
let plaintext = "abcdefghijklmnopqrstuvwxyz";
let cryptotext = "";

//Builds Alphabet
for (let i = 0; i < 26; i++) {
  let char = String.fromCharCode(97+i);
  plaintextAlphabet.push(char);
}
let plaintextAlphabetLength = plaintextAlphabet.length;

//Builds Map of plaintextAlphabet to corresponding frequency in English Language
const plaintextAlphabetFrequencies = new Array(8.2,1.5,2.8,4.3,13.0,2.2,2,6.1,7.0,0.15,0.77,4,2.4,6.7,7.5,1.9,0.095,6.0,6.3,9.1,2.8,0.98,2.4,0.15,2.0,0.074);
const plaintextAlphabetFrequencyAnalysis = new Map();
for (let i = 0; i < plaintextAlphabetLength; i++) {
  plaintextAlphabetFrequencyAnalysis.set(plaintextAlphabet.at(i),plaintextAlphabetFrequencies.at(i));
}

//Frequency Analysis Functions

//Creates Map of each letter in the cryptotext and its proportional occurrence
function analyzeFrequency(cryptotext) {
  cryptotext = cryptotext.toLowerCase();
  let cryptotextLength = (cryptotext.replaceAll(" ","")).length;
  let cryptotextFrequencyAnalysis = new Map();

  for (let i = 0; i < plaintextAlphabetLength; i++) {
    let letter = plaintextAlphabet.at(i);
    let count = 0;
    for (let c = 0; c < cryptotextLength+1; c++) {
      if (cryptotext.substring(c,c+1) == letter) {
        count += 1;
      }
    }
    cryptotextFrequencyAnalysis.set(plaintextAlphabet.at(i),(count/cryptotextLength));
  }
  return cryptotextFrequencyAnalysis;
}

console.log(analyzeFrequency("The Eae"));

//Cipher Functions
function encrypt(plaintext, plaintextAlphabet, cryptotextAlphabet) {
  let cryptotext = "";
  for (let i = 0; i < plaintext.length; i++) {
    if (plaintext.substring(i, i+1) == (" ")) {
      cryptotext += " ";
    }
    else {
      cryptotext += cryptotextAlphabet.substring(plaintextAlphabet.indexOf(plaintext.substring(i, i+1)), plaintextAlphabet.indexOf(plaintext.substring(i, i+1))+1);
    }
  }
  return cryptotext;
}

//Preforms atbash(reversal) cipher
function atbash(plaintextAlphabet) {
  let cyrptotextAlphabet = "";

  for (let i = 0; i < -(plaintextAlphabetLength); i--) {
    cryptotextAlphabet += plaintextAlphabet.slice(i-1,1)
  }
  return cryptotextAlphabet;
}

//Preforms caesar(shift) cipher by n characters
function caesar(plaintextAlphabet, shiftValue) {
  let cryptotextAlphabet = "";

  for (let i = 0; i < plaintextAlphabetLength; i++) {
    cryptotextAlphabet += plaintextAlphabet.at(i-shiftValue);
  }
  return cryptotextAlphabet
}

//Preforms Rot??(swap with previous character) for every nth character
function rote(plaintextAlphabet, swapInterval) {
  let cryptotextAlphabet = "";

  if (swapInterval == 1) {
    return caesar(plaintextAlphabet, 25);
  }

  for (let i = 0; i < plaintextAlphabetLength; i++) {
    if ((i != 0) && (i % swapInterval == 0)) {
      cryptotextAlphabet = cryptotextAlphabet.substring(0,i-1) + plaintextAlphabet.at(i) + plaintextAlphabet.at(i-1);
    }
    else {
      cryptotextAlphabet += plaintextAlphabet.at(i);
    }
  }
  return cryptotextAlphabet;
}

function keyword(plaintextAlphabet, keyword, keyletter) {
  let cryptotextAlphabet = "";
  cryptotextAlphabet += keyword;

  for (let i = 0; i < plaintextAlphabetLength; i++) {
    if (keyword.indexOf(plaintextAlphabet.at(i)) >= 0) {
    } else {
      cryptotextAlphabet += plaintextAlphabet.at(i);
    }
  }
  return caesar(cryptotextAlphabet, plaintextAlphabet.indexOf(keyletter));
}


