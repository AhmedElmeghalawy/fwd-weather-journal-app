
//API Key for OpenWeatherMap API
const apiKey = '7161d1591e1007b8c2eacfb82da83f7a';


let zipCode = "";
let unitType = "";
let countryCode = "";
let feelingsInfo = "";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' +d.getMonth()+1 + '.' + d.getFullYear();


document.getElementById('generate').onclick = function () {
  console.log("generate btn clicked!");
  getUserInputData();
  retrieveDataFromOpenWeatherApp();
};

function getUserInputData() {

  //user input Data
  zipCode = document.getElementById('zip').value; 
  feelingsInfo = document.getElementById('feelings');
  unitType = document.getElementById('unitType');
  countryCode = document.getElementById('countryCode');

  // for testing...
  zipCode = '34510';
  feelingsInfo = 'I feel GREAT! 😎';
  unitType = 'imperial';
  countryCode = 'fr';

}



const retrieveDataFromOpenWeatherApp = async () => {

  const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=${unitType}`);
  try {

    // Transform into JSON
    const allData = await request.json()
    console.log(allData)


    const cityName = allData.name
    const windSpeed = allData.wind.speed;

    const humidity = allData.main.humidity
    const pressure = allData.main.pressure

    const temp = allData.main.temp

    const Country = allData.sys.country

    const WeatherDiscriptionSummary = allData.weather[0].main;
    const WeatherDiscription = allData.weather[0].description;
    // const WeatherDiscriptionIcon = allData.weather[0].icon;

    const logString = 
    `Country: ${Country} |
    city name: ${cityName} |

    Weather is : ${WeatherDiscriptionSummary} |
    Weather Discription: ${WeatherDiscription} |

    temperature: ${Math.round(temp)} degrees |
    wind Speed: ${windSpeed} |
    humidity: ${humidity} |
    pressure: ${pressure} |

    Date: ${newDate} |
    `;

    console.log(logString);

    //Sending the data to Server
    PostDataToServer(allData);


    //Updating the UI
    UpdateUI(logString);
  }
  catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }


}
function PostDataToServer(DataObj) {
//................................
//................................
//................................
//................................
}

function UpdateUI(Text) {

      // Write updated data to DOM elements
      document.getElementById('content').innerHTML = Text;

}


