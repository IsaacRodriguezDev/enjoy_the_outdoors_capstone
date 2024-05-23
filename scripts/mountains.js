"use strict"


window.onload = () => {
  // called function mountainDropdownContent to run when page loads
    mountainDropdownContent()
    
    // created a variable called mountainDropdowna and added an event listener to run function showMountains on change
    let mountainDropdown = document.querySelector("#mountainDropdown");
    mountainDropdown.addEventListener("change", showMountains)
    
}
// created a function mountainDropdownContent to add all mountains in array to the drop down
function mountainDropdownContent() {
    //   created a variable called defualtOption to display select a Mountain on the dropdown and appended it to the mountainDropdown
    let mountainDropdown = document.querySelector("#mountainDropdown");
    let defaultOption = document.createElement("option");
    defaultOption.textContent = "--Select a Mountain--";
    defaultOption.value = "";
    mountainDropdown.appendChild(defaultOption);
  
    //  used forEach to loop through mountainsArray to display all mountainsArray as categories
    mountainsArray.forEach((mountain) => {
      let stateOption = document.createElement("option");
      stateOption.textContent = mountain.name;
      stateOption.value = mountain.name;
      mountainDropdown.appendChild(stateOption);
    });
  }
  // created a showMountains function that creates html elements and makes a card with mountain information with it's images as well 
function showMountains(event){
 // created a mountainDiv and set it's innerHTML to empty string so it resets every time we want to show a different mountain card
  let mountainDiv = document.querySelector('#moutain')
  let selectMountain = document.querySelector('#selectMountain')
  mountainDiv.innerHTML =''
  if(event.target.value !== ''){
 mountainDiv.style.display = 'block'
 // made a variable called mountainSearch that finds a specific mountain depending on the users selected dropdown's value
   let mountainSearch = mountainsArray.find((mountain)=>{
         return mountain.name === event.target.value
     })
// gave selected mountainSearch img property the correct path to get all the images
let mountainImageSearch =  './images/'+mountainSearch.img
// created a cardDiv div-tag and gave it different boostrap styles 
let cardDiv = document.createElement('div')
cardDiv.classList.add('mx-auto','card', 'bg-dark','text-light','w-25')

// created a cardHeader div-tag and gave it different boostrap styles as well as gave the innerHTML whatever user selects on dropdown for mountain name
let cardHeader = document.createElement('div')
cardHeader.classList.add('card-header','fw-bold','text-center')
cardHeader.innerHTML = `${mountainSearch.name}`

//  created a cardImage img-tag element and gave it different boostrap styles and assigned a src of the selected mountain img and the alt a mountain name
let cardImage = document.createElement('img')
cardImage.classList.add('card-img-top', 'card-img-fit')
cardImage.src = mountainImageSearch
cardImage.alt = mountainSearch.name

// created a cardListBodyPDiv div-tag and gave it different boostrap style
let cardListBodyPDiv = document.createElement('div')
cardListBodyPDiv.classList.add('card-body')

// created a cardP p-tag and gave it boostrap style and made the innerHTML to display the selected mountain's description
let cardP = document.createElement('p')
 cardP.classList.add('card-text')
cardP.innerHTML = mountainSearch.desc

// created a unordered list and list item elements and gave them bootstrap styles and to display different mountains details
let cardUl = document.createElement('ul')
cardUl.classList.add('list-group','list-group-flush', 'list-group-item-dark')
let cardL1 = document.createElement('li')
cardL1.classList.add('list-group-item')
cardL1.innerHTML = `<b>Elevation:</b> ${mountainSearch.elevation} feet.`
let cardL2 = document.createElement('li')
cardL2.classList.add('list-group-item')
cardL2.innerHTML = `<b>Effort:</b> ${mountainSearch.effort}`
let cardL3 = document.createElement('li')
cardL3.classList.add('list-group-item')
cardL3.innerHTML = `<b>Lat:</b> ${mountainSearch.coords.lat} <b>Lng:</b> ${mountainSearch.coords.lng}`
// created mountainTime to get me the mountains sunrise and sunset by using the lat and lng property from getSunsetForMountain function
let mountainTime = getSunsetForMountain(mountainSearch.coords.lat,mountainSearch.coords.lng).then(sunsetData =>{
let sunsetObject = {
 sunset:sunsetData.results.sunset,
 sunrise: sunsetData.results.sunrise
}
return sunsetObject
})

// cardL4 is for the mountainTime details
let cardL4 = document.createElement('li')
cardL4.classList.add('list-group-item')

//Using the mountainTime to fetch the sunset/sunrise times for a specific mountain and display them
mountainTime.then(sunsetObject =>{ cardL4.innerHTML = `<b>Sunrise:</b> ${sunsetObject.sunrise} <b>Sunset:</b> ${sunsetObject.sunset}`})
// appended data to the cardDiv to then get appended to the mountainDiv to display
cardDiv.appendChild(cardHeader)
cardDiv.appendChild(cardImage)
cardDiv.appendChild(cardListBodyPDiv)
cardDiv.appendChild(cardUl)
cardListBodyPDiv.appendChild(cardP)
cardUl.appendChild(cardL1)
cardUl.appendChild(cardL2)
cardUl.appendChild(cardL3)
cardUl.appendChild(cardL4)
mountainDiv.appendChild(cardDiv)
selectMountain.style.display = 'none'
  }else{
    mountainDiv.style.display = 'none'
    selectMountain.style.display = 'block'
  }
    }
    
    //Using the function to get me the data for sunset/sunrise times for a specific mountain 
    async function getSunsetForMountain(lat, lng){
      let response = await fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
      let data = await response.json()
      return data
    }
    
  

