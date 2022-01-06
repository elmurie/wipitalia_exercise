import './style.scss';
import axios from "axios";

const planets = () => {
    // https://www.swapi.dev/ is not working as of now ( 06/01/22, 11:52), so I am using a different API 
    const axiosEndPoint = 'https://www.swapi.tech/api/planets'
    const getData = async (url) => {
        try {
            const data = await axios.get(axiosEndPoint);
            return data.data.results;
        } catch (err) {
            console.error('The Axios call has failed');
        }
    }
    return getData(axiosEndPoint);
}


const main = document.querySelector('main')

function extract() {
    planets().then((output) => {
        console.log(output);
        let planetsArray = [];
        output.forEach((element, index) => {
            planetsArray.push(element);
            let divPlanet = document.createElement("Div");
            divPlanet.className = "planet";
            divPlanet.innerHTML = element.name;
            main.appendChild(divPlanet);
            if ( index % 2 == 1 ) {
                divPlanet.classList.add('right');
            }
        });
        return planetsArray;
    });
}

let dio = extract();
console.log("test ", dio);


