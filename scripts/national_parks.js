"use strict";

window.onload = () => {
  // when page loads hide the table header
  document.querySelector("#tableContent").style.display = "none";

  // called locationDropdownContent function to display the categories on the locationdropdown as soon as pageloads
  locationDropdownContent();

};

// created a function called locationDropdownContent to add every content in the locationsArray into the dropdown for user to select
function locationDropdownContent() {
    
  //   created a variable called defualtOption to display select a park location on the dropdown and appended it to the location dropdown
  let locationDowndown = document.querySelector("#parkLocationDropdown");
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

