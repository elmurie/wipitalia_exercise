import './style/style.scss';
import axios from "axios";

// Planets Container and error field

const container = document.getElementById('container');
const errorMessage = document.getElementById('error');

// Input dates elements
const startDateInput = document.getElementById('startDateInput');
const endDateInput = document.getElementById('endDateInput');

// API Call variables
let call = {
  incomingData : [],
  filteredData : [],
  ordered : false
};

// Search Button 
const searchBtn = document.getElementById('search');

searchBtn.addEventListener('click', function() {
  container.innerHTML = '';
  errorMessage.innerHTML = '';
  let startDate = new Date(startDateInput.value);
  let endDate = new Date(endDateInput.value).setHours(23, 59, 59);
  if ( isNaN(startDate) || isNaN(endDate) ) {
    errorMessage.innerHTML = 'Please choose a start and an end date';
    
  } else if ( startDate > endDate ) {
    errorMessage.innerHTML = 'Start date cannot be later than end date'
  }
  else {
    call.filteredData = call.incomingData.filter( planet => {
      let createdPlanet = new Date(planet.created);
      return (createdPlanet >= startDate && createdPlanet <= endDate)
    });
    showData(call.filteredData);
  }
});

// Order button
const orderBtn = document.getElementById('order');

orderBtn.addEventListener('click', function() {
  errorMessage.innerHTML = '';
  call.filteredData = call.filteredData.sort((a, b) => {
    if ( call.ordered ) {
      return new Date(a.created) - new Date(b.created);
    } else {
      return new Date(b.created) - new Date(a.created);
    }
  })
  call.ordered ^= true;
  showData(call.filteredData);
});

// Get data from API call
const getData = (call) => {
  errorMessage.innerHTML = '';
  axios({
    method : 'get',
    url : 'https://swapi.dev/api/planets', // alternative URL https://swapi.py4e.com/api/planets/ 
  })
    .then((res) => {
      call.filteredData = call.incomingData = res.data.results;
      showData(call.filteredData)
    })
    .catch(err => {
      console.error(err);
      errorMessage.innerHTML = 'API resource not responding';
    })
}

// Display data from API call
function showData(res) {
  container.innerHTML = ''; // empties old data in container before it gets updated
  for ( let i = 0; i < res.length; i++) {
    let planetCard = document.createElement('Div');
    planetCard.className = 'planet';
    container.appendChild(planetCard);
    if ( i % 2 == 0) {
      planetCard.classList.add('right');
    } else {
      planetCard.classList.add('left');
    }
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