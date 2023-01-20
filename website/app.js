/* Global Variables */

// Personal API Key for OpenWeatherMap API
// const apikeystring= '7161d1591e1007b8c2eacfb82da83f7a';
const apiKey = '7161d1591e1007b8c2eacfb82da83f7a&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();




const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById(""date"").innerHTML =allData.date;
    }
    catch(error) {
      console.log(""error"", error);
      // appropriately handle the error
    }
   }



