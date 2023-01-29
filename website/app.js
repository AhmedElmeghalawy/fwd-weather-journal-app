//API Key for OpenWeatherMap API
const apiKey = "7161d1591e1007b8c2eacfb82da83f7a&units=imperial";

let customUserDataObject = {
  //user input
  zipCode: "",
  fealings: "",

  countryCode: "",

  cityName: "",
  temp: "",

  date: "",
};

const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", getUserInputData);

/*
//for testing and debugging only
//------------------------------------------------------------------------------------------------------
const buttonParent = document.getElementById("buttonParent");                                         //
const newelment = document.createElement("div");                                                     //
newelment.innerHTML += `<button id="testing" class="holder feel" type="submit"> Testing </button>`  //
buttonParent.appendChild(newelment);                                                               //
//used for testing only!...                                                                       //
const testBtn = document.getElementById("testing");                                              //
testBtn.addEventListener("click", testingData);                                                 //
function testingData() {                                                                       //
  console.log("Using Dummy data!");                                                           //
  document.getElementById("zip").value = "94040";                                            //
  document.getElementById("feelings").value = "I feel Awesome! 😎";                         //
}                                                                                          //
//----------------------------------------------------------------------------------------
*/

function getUserInputData() {
  //user input Data from the front-end/DOM elemnts value
  customUserDataObject.zipCode = document.getElementById("zip");
  customUserDataObject.fealings = document.getElementById("feelings");

  //date assigned dynamicly using JS
  const d = new Date();
  customUserDataObject.newDate =
    d.getDate() + "." + d.getMonth() + 1 + "." + d.getFullYear();

  //Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
  retrieveDataFromOpenWeatherApp();
}

//Get weather data from "OpenWeatherApp" based on the inputs that was enterd by the user
//and using the developer's(الي هو انا يعني😁) API key to get the data we want...
const retrieveDataFromOpenWeatherApp = async () => {
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${customUserDataObject.zipCode.value},&appid=${apiKey}`
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

  //Sending the the custome data object (user Inputs data + weather data ) to (my)Server.
  postDataToServer();
};

postDataToServer = function () {
  fetch(`http://127.0.0.1/postData`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    },

    body: JSON.stringify({ customUserDataObject })
  });

  //Updating the UI
  UpdateUI(customUserDataObject);
};

function UpdateUI(customUserDataObject) {

  //this part is not required ,i though it may look cool :P
  //--------------------------------------------------------------------------------------------------------------
  //here we are getting the recent entries
  //of example if we enterd and submeted three times then the code will show us thre entries but the code down 
  //check if they are just 2 , then remove the oldest entry so only two entries would show and the page does not get bloated..👌
  const entriesCount = document.querySelectorAll("#entryHolder");
  if (entriesCount.length >= 2) {
    entriesCount[0].remove();
  }
  //--------------------------------------------------------------------------------------------------------------


  //creating new entry element then assigng the user data to it...
  const newelment = document.createElement("div");
  newelment.id = "entryHolder";
  newelment.innerHTML += `
      <div id="country">Country: ${customUserDataObject.Country} </div>
      <div id="city">City: ${customUserDataObject.cityName} </div>
      <div id="temp">Temperature: ${customUserDataObject.temp} degrees </div>
      <div id="date">Date: ${customUserDataObject.newDate}</div>
      <div id="content">Feelings: ${customUserDataObject.fealings.value}</div>
    `

  // get "entryHolder" parent so we could appendthe new entry above to it 
  const entries = document.getElementById("entries");

  //appending the new entry(newelment) above..
  entries.appendChild(newelment);

}
