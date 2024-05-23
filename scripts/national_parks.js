"use strict";

window.onload = () => {
  // when page loads hide the table header, locationDropdown, and parkTypeDropdown
  document.querySelector("#tableContent").style.display = "none";
  document.querySelector('#parkDropdown').style.display = "none";
  
  // accessed the locationDropdown, locationRadioBtn, parkTypeRadioBtn and store it to a variable for later use
  let parkDropdown = document.querySelector("#parkDropdown");
  let locationRadioBtn = document.querySelector('#locationRadioBtn')
  let parkTypeRadioBtn = document.querySelector('#parkTypeRadioBtn')

  // called locationRadioBtn, and parkTypeRadioBtn variables and made it if the dropdown is clicked run showDropDown function
  locationRadioBtn.addEventListener('click', showDropDown)
  parkTypeRadioBtn.addEventListener('click', showDropDown)

  // called parkDropdown variable and made it if the dropdown changes run displayLocationDropdownContent function
  parkDropdown.addEventListener("change",showLocationOrPartType) }
// created a function called locationDropdownContent to add every content in the locationsArray into the dropdown for user to select
function locationDropdownContent() {
  //   created a variable called defualtOption to display select a park location on the dropdown and appended it to the location dropdown
  let locationDowndown = document.querySelector("#parkDropdown");
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Select a Park Location--";
  defaultOption.value = "";
  locationDowndown.appendChild(defaultOption);

  //  used forEach to loop through locationsArray to display all locationArray as categories
  locationsArray.forEach((location) => {
    let stateOption = document.createElement("option");
    stateOption.textContent = location;
    stateOption.value = location;
    locationDowndown.appendChild(stateOption);
  });
}

// created a function called locationDropdownContent to add every content in the locationsArray into the dropdown for user to select
function typeDropdownContent() {
  //   created a variable called defualtOption to display select a park location on the dropdown and appended it to the location dropdown
  let locationDowndown = document.querySelector("#parkDropdown");
  let defaultOption = document.createElement("option");
  defaultOption.textContent = "--Select a Park Type--";
  defaultOption.value = "";
  locationDowndown.appendChild(defaultOption);

  //  used forEach to loop through locationsArray to display all locationArray as categories
  parkTypesArray.forEach((location) => {
    let stateOption = document.createElement("option");
    stateOption.textContent = location;
    stateOption.value = location;
    locationDowndown.appendChild(stateOption);
  });
}

//  created displayLocationDropdownContent, and displayParkTypeDropdownContent function to display data in a table when user selects a category
function displayLocationDropdownContent() {
  let dropdown = document.querySelector("#parkDropdown");
  let tableBody = document.querySelector("#tableBody");

  //   if dropdown is index -1 hide table and else make the table empty string so it won't duplicate table data
  let selectedDropdownIndex = dropdown.selectedIndex - 1;
  if (selectedDropdownIndex === -1) {
    document.querySelector("#tableContent").style.display = "none";
  } else {
    tableBody.textContent = "";
  }
  // create a variable that gives me the value of chosen the chosen category
  let dropdownLocationValue = dropdown.value;
 
  // created a variable called selectedCategoryContents that creates a new array of all objects of the selected category by returning those that meet the condition and if the dropdown value is not in the array hide table
  let selectedCategoryContents = nationalParksArray.filter((parkContent) => {
    if( parkContent.State.indexOf(dropdown.value) === -1){
        document.querySelector("#tableContent").style.display = "none";
    }
    return dropdownLocationValue === parkContent.State
});
conditionsForDisplayData(selectedCategoryContents)
}
function displayParkTypeDropdownContent() {
  let dropdown = document.querySelector("#parkDropdown");
  let tableBody = document.querySelector("#tableBody");
  
  //   if dropdown is index -1 hide table and else make the table empty string so it won't duplicate table data
  let selectedDropdownIndex = dropdown.selectedIndex - 1;
  console.log(selectedDropdownIndex)
  if (selectedDropdownIndex === -1) {
    document.querySelector("#tableContent").style.display = "none"
  } else {
    tableBody.textContent = "";
  }

  // create a variable that gives me the value of chosen the chosen category
  let dropdownParkTypeValue = dropdown.value;

// created a variable called selectedParkContents that creates a new array of all objects of the selected category and returning what is only found of that category
let selectedParkContents = nationalParksArray.filter((parkType)=>{
 let parkSearch = parkType.LocationName.indexOf(dropdownParkTypeValue)
  console.log(parkSearch)
  if(parkSearch !== -1){
    console.log(`This is THIS NAME :${parkType.LocationName.substring(parkSearch)}`)
     return parkType.LocationName.substring(parkSearch)
  }
})
conditionsForDisplayData(selectedParkContents)
}

// created a function that hides and shows the dropdown list for parkDropdown and parkTypeDropdown when radio button is checked
function showDropDown() {
   let parkTypeRadioBtn = document.querySelector('#parkTypeRadioBtn')
  let locationRadioBtn = document.querySelector('#locationRadioBtn')
  let parkDropdown = document.querySelector('#parkDropdown')
  parkDropdown.style.display = "inline";
  parkDropdown.length = 0
// if one of the two radio buttons are checked then hide the other one, vice versa
if(locationRadioBtn.checked){
  document.querySelector("#selectPark").style.display = "block";
  document.querySelector("#tableContent").style.display = "none";
  locationDropdownContent();
}
if(parkTypeRadioBtn.checked){
  document.querySelector("#selectPark").style.display = "block";
  document.querySelector("#tableContent").style.display = "none";
  typeDropdownContent()
}
}
// made a function for all the if conditions that are supposed to be displayed
function conditionsForDisplayData(array){
  let tableBody = document.querySelector('#tableBody')
  // created a new variable with the selected array and used the map method so it changes the copy of array parameter and returns a new array
let specificContentInArrayOfPark = array.map((specificContent) => {
    
  // created an array with the only objects I want to display for the user
  let specificContentArray = [specificContent.LocationID.toUpperCase(), specificContent.LocationName, specificContent.Address, specificContent.Phone, specificContent.Visit]
  let notAvailable = 'N/A'

  // made if conditions that check if the properties meet certain condition to display specific information to user
  if(!specificContent.Address){
      specificContentArray.splice(2,1,`${specificContent.City}, ${specificContent.State}: <b>This address could not be found</b>`)
    }

  //   check if there isn't a visit and then N/A if there is display it
  if(!specificContent.Visit){
  specificContentArray.splice(4,1,`${notAvailable}`)
} else{
  specificContentArray.splice(4,1,`<a href="${specificContent.Visit}">${specificContent.Visit}</a>`)
}

// check if there is a phone and fax then return
  if(specificContent.Fax && specificContent.Phone){
  specificContentArray.splice(3,1,`<div class='text-nowrap'> <b>Phone:</b> ${specificContent.Phone} <div><b>Fax:</b> ${specificContent.Fax}</div></div>`)
  return specificContentArray
   }

// check if there is not a phone and fax then return
  if(!specificContent.Phone && !specificContent.Fax){
      specificContentArray.splice(3,1,`<div class='text-nowrap'> <b>Phone:</b> ${notAvailable} <div><b>Fax:</b> ${notAvailable}</div></div>`)
      return specificContentArray
    }

// check if there isn't a phone but there is a fax then return
  if(!specificContent.Phone){
  specificContentArray.splice(3,1,`<div class='text-nowrap'><b>Phone:</b> ${notAvailable} <div><b>Fax:</b> ${specificContent.Fax}</div></div>`)
  return specificContentArray
}

// check if there isn't a fax but there is a phone then return
 if(!specificContent.Fax){
  specificContentArray.splice(3,1,`<div class='text-nowrap'><b>Phone:</b> ${specificContent.Phone} <div><b>Fax:</b> ${notAvailable}</div></div>`)
  return specificContentArray
} 
});

  // looping through the specificContentInArray array to display each objects data
  specificContentInArrayOfPark.forEach((content)=>{
    displayTableData(tableBody,content)
    document.querySelector("#tableContent").style.display = "block";
  })

//  made a function that creates a row and also creates cells inside the rows with data within the table body 
  function displayTableData(tableBody, data) {
    // create a new row for table data to be stored in
    let newRow = tableBody.insertRow(-1);
   
    // making a loop that creates a cell for each property that we declare
    for (let property in data) {
      let cells = newRow.insertCell();
      cells.innerHTML = data[property];

    }
  }
}
// created a function to show the content depending on which radio btn is checked 
function showLocationOrPartType(){
  let parkTypeRadioBtn = document.querySelector('#parkTypeRadioBtn')
  let locationRadioBtn = document.querySelector('#locationRadioBtn')

  if(locationRadioBtn.checked){
    displayLocationDropdownContent()
  document.querySelector("#selectPark").style.display = "none";
  }else if(parkTypeRadioBtn.checked){
    displayParkTypeDropdownContent()
    document.querySelector("#selectPark").style.display = "none";
  }
}
