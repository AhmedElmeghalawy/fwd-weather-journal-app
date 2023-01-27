//API Key for OpenWeatherMap API
const apiKey = "7161d1591e1007b8c2eacfb82da83f7a";

let customUserDataObject = {
  //user input
  zipCode: "",
  fealings: "",

  unitType: "",
  countryCode: "",

  cityName: "",
  temp: "",

  date: "",
};

// Create a new date instance dynamically with JS

document.getElementById("generate").onclick = function () {
  console.log("generate btn clicked!");

  getUserInputData();

  //Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
  retrieveDataFromOpenWeatherApp();

  //Sending the the custome data object (user Inputs data + weather data ) to (my)Server.
  postDataToServer();
};

document.getElementById("testing").onclick = function () {
  testingData();
};
//used for debugging and testing only!...
function testingData() {
  console.log("Using Dummy data!");
  document.getElementById("zip").value = "34510";
  document.getElementById("feelings").value = "I feel Awesome! 😎";
  document.getElementById("unitType").value = "imperial"; //imperial,metric
  document.getElementById("countryCode").value = "fr"; //us,fr,eg,uk, etc...
}

function getUserInputData() {
  //user input Data from the front-end/DOM elemnts value
  customUserDataObject.zipCode = document.getElementById("zip");
  customUserDataObject.fealings = document.getElementById("feelings");
  customUserDataObject.unitType = document.getElementById("unitType");
  customUserDataObject.countryCode = document.getElementById("countryCode");

  //date assigned dynamicly using JS
  const d = new Date();
  customUserDataObject.newDate =
    d.getDate() + "." + d.getMonth() + 1 + "." + d.getFullYear();
}

//Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
//and using the developer's(الي هو انا يعني😁) API key to get the data we want...
const retrieveDataFromOpenWeatherApp = async () => {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${customUserDataObject.zipCode.value},${customUserDataObject.countryCode.value}&appid=${apiKey}&units=${customUserDataObject.unitType}`
  );
  try {
    // Transform into JSON
    const allData = await request.json();
    // console.log(allData);

    customUserDataObject.cityName = allData.name;
    customUserDataObject.temp = allData.main.temp;
    customUserDataObject.Country = allData.sys.country;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

postDataToServer = function (){
  fetch(`http://127.0.0.1/post1`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    },

    body: JSON.stringify({customUserDataObject}) 
  });

    // customUserDataObject.cityName = allData.name;
    // customUserDataObject.temp = allData.main.temp;
    // customUserDataObject.Country = allData.sys.country;

    //Updating the UI
    UpdateUI(customUserDataObject);
};

function UpdateUI(customUserDataObject) {

  const logString = `
    Country: ${customUserDataObject.Country} |
    city name: ${customUserDataObject.cityName} |
    temperature: ${Math.round(customUserDataObject.temp)} degrees |
    Date: ${customUserDataObject.newDate} |
    Feelings: ${customUserDataObject.fealings.value}
    `;

  // Write updated data to DOM elements
  document.getElementById("content").innerHTML = logString;
  console.log("UI Updated!");
}
