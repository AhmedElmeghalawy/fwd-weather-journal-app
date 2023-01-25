
//API Key for OpenWeatherMap API
const apiKey = '7161d1591e1007b8c2eacfb82da83f7a';


let customUserDataObject = {

  //user input
  zipCode: '',
  fealings: '',

  unitType: '',
  countryCode: '',

  //weather app data
  cityName: '',

  temp: '',


  //date dynamically with JS
  date: ''

}


// Create a new date instance dynamically with JS

document.getElementById('generate').onclick = function () {
  console.log("generate btn clicked!");

  getUserData();

};

document.getElementById('testing').onclick = function () {
  console.log("testingData btn clicked!");

  testingData();
};

function testingData() {
  //used for debugging and testing only!...
  console.log("Using Dummy data!");
  document.getElementById('zip').value = '34510';
  document.getElementById('feelings').value = 'I feel Awesome! 😎';
  document.getElementById('unitType').value = 'imperial'; //imperial,metric
  document.getElementById('countryCode').value = 'fr'; //us,fr,eg,uk, etc...
}

function getUserData() {
  
  //user input Data from the front-end/DOM elemnts value
  customUserDataObject.zipCode = document.getElementById('zip');
  customUserDataObject.fealings = document.getElementById('feelings');
  customUserDataObject.unitType = document.getElementById('unitType');
  customUserDataObject.countryCode = document.getElementById('countryCode');


  //date assigned dynamicly using JS
  const d = new Date();
  customUserDataObject.newDate = d.getDate() + '.' + d.getMonth() + 1 + '.' + d.getFullYear();



  //Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
  retrieveDataFromOpenWeatherApp();
}

//Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
//and using the developer(الي هو انا يعني😁) API key to get the data we want...
const retrieveDataFromOpenWeatherApp = async () => {

  const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${customUserDataObject.zipCode.value},${customUserDataObject.countryCode.value}&appid=${apiKey}&units=${customUserDataObject.unitType}`);
  try {

    // Transform into JSON
    const allData = await request.json()
    console.log(allData)

    customUserDataObject.cityName = allData.name


    customUserDataObject.temp = allData.main.temp

    customUserDataObject.Country = allData.sys.country


    const logString =
      `Country: ${customUserDataObject.Country} |
    city name: ${customUserDataObject.cityName} |

    temperature: ${Math.round(customUserDataObject.temp)} degrees |

    Date: ${customUserDataObject.newDate} |

    Feelings: ${customUserDataObject.fealings.value} |
    `;

    console.log(logString);

    //Sending the the custome data object (user Inputs data + weather data ) to the Server.
    PostDataToServer(customUserDataObject);


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
}

function UpdateUI(Text) {

  // Write updated data to DOM elements
  document.getElementById('content').innerHTML = Text;

}


