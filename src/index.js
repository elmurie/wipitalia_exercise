import './style.scss';
import axios from "axios";
// https://swapi.dev/api/planets is not working as of now ( 06/01/22, 11:52), so I am using a different API 
// Found mirror https://swapi.py4e.com/api/planets/ ( 06/01/22, 14:29), seems to be the same data 

const container = document.getElementById('container');
const errorMessage = document.getElementById('error');

// Input dates elements
const startDateInput = document.getElementById('startDateInput');
const endDateInput = document.getElementById('endDateInput');

// API Call variables
let call = {
  incomingData : [],
  filteredData : []
};

// Search Button 
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', function() {
  errorMessage.innerHTML = '';
  let startDate = new Date(startDateInput.value);
  let endDate = new Date(endDateInput.value).setHours(23, 59, 59);
  if ( isNaN(startDate) || isNaN(endDate) ) {
    errorMessage.innerHTML = 'Please choose a start and an end date';
    
  }
  else {
    call.filteredData = call.incomingData.filter( planet => {
      let createdPlanet = new Date(planet.created);
      return (createdPlanet >= startDate && createdPlanet <= endDate)
    });
  }
  showData(call.filteredData);
});

// Order button
const orderBtn = document.getElementById('order');

orderBtn.addEventListener('click', function() {
  call.filteredData = call.filteredData.sort((a, b) => {
    return b.created - a.created;
  })
  showData(call.filteredData);
});





// Get data from API call
const getData = (call) => {
  axios({
    method : 'get',
    url : 'https://swapi.dev/api/planets',
  })
    .then((res) => {
      call.filteredData = call.incomingData = res.data.results;
      showData(call.filteredData)
    })
    .catch(err => console.error(err))
}

// Display data from API call
function showData(res) {
  container.innerHTML = ''; // empties old data in container before it gets updated
  for ( let i = 0; i < res.length; i++) {
    let planetCard = document.createElement('Div');
    planetCard.className = 'planet';
    container.appendChild(planetCard);
    planetCard.innerHTML = `
    <div class="planet__name">
      <h2>${res[i].name}</h2>
    </div>
    <div class="planet__date">
      <h5>${res[i].created.substring(0, 10)} ${res[i].created.substring(11, 16)}</h5>
    </div>
    `
  }
}

// API call on page load 
getData(call);