import './style.scss';
import axios from "axios";
// https://swapi.dev/api/planets is not working as of now ( 06/01/22, 11:52), so I am using a different API 
// Found mirror https://swapi.py4e.com/api/planets/ ( 06/01/22, 14:29), seems to be the same data 

const container = document.getElementById('container');

// Date & Time variables 
let startDate = '';
let endDate = '';

// Buttons 
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', function() {
  filterAxios();
});
const orderBtn = document.getElementById('order');
orderBtn.addEventListener('click', function() {
  orderAxios(filteredResults);
});

// Input dates elements & functions
const startDateInput = document.getElementById('startDate')
startDateInput.addEventListener('change', (e) => {
  console.log(e.target.value);
  startDate = e.target.value;
});
const endDateInput = document.getElementById('endDate')
endDateInput.addEventListener('change', (e) => {
  console.log(e.target.value);
  endDate = e.target.value;
});

function convertDate(date) {
  return new Date(date); 
}

// Get data from API call
function getData() {
  console.log(startDate);
  axios({
    method : 'get',
    url : 'https://swapi.dev/api/planets',
  })
    .then((res) => {
      showData(res.data.results)
    })
    .catch(err => console.error(err))
}

// Display data from API call
function showData(res) {
  console.log("showdats",res);
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
getData();

let filteredResults = []

function filterAxios() {
  let planets = [];
  let promises = [];
  for (let i = 1; i <= 6; i++) {
    promises.push(
      axios.get(`https://swapi.dev/api/planets?page=${i}`).then(response => {
        planets.push(response.data.results);
      })
    )
  }
  Promise.all(promises).then(() => {
    let allPlanets = [];
    for ( let j = 0; j < planets.length; j++) {
      allPlanets.push(...planets[j]);
    }
    filteredResults = [];
    let filtered = allPlanets.filter((item) => {
      let convertedStartDate = convertDate(startDate);
      let tempEndDate = convertDate(endDate);
      let convertedEndDate = tempEndDate.setHours(23, 59, 59);
      let convertedCreatedDate = new Date(item.created);
      if ( convertedCreatedDate >= convertedStartDate && convertedCreatedDate <= convertedEndDate) {
        filteredResults.push(item);
        return item;
      }
    })
    showData(filtered);
  });
}

function orderAxios(array) {
  console.log("filteresuld", filteredResults)
  const sortedArray = array.sort((a, b) => -a.created.localeCompare(b.created));
  console.log(sortedArray);
  showData(sortedArray);
}