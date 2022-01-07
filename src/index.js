import './style.scss';
import axios from "axios";
// https://swapi.dev/api/planets is not working as of now ( 06/01/22, 11:52), so I am using a different API 
// Found mirror https://swapi.py4e.com/api/planets/ ( 06/01/22, 14:29), seems to be the same data 

let startDate = '';
let endDate = '';

// Buttons 
const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', function() {
  filterAxios();
});


// Input dates elements 
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

// Get data from API call
function getData() {
  console.log(startDate);
  axios({
    method : 'get',
    url : 'https://swapi.dev/api/planets',
  })
    .then((res) => showData(res.data.results))
    .catch(err => console.error(err))
}

// Display data from API call
function showData(res) {
  const container = document.getElementById('container');
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
    let convertedStartDate = new Date(startDate);
    let tempEndDate = new Date(endDate);
    let convertedEndDate = tempEndDate.setHours(23, 59, 59);
    console.log("boyyyyyy",convertedStartDate, convertedEndDate);
    let allPlanets = [];
    for ( let j = 0; j < planets.length; j++) {
      allPlanets.push(...planets[j]);
    }
    let filtered = allPlanets.filter((item) => {
      let convertedCreatedDate = new Date(item.created);
      if ( convertedCreatedDate >= convertedStartDate && convertedCreatedDate <= convertedEndDate) {
        console.log("convertCreated", convertedCreatedDate);
        return item;
      }
    })
    showData(filtered);
  });
}
