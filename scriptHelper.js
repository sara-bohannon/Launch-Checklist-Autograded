// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null) {
        return `Empty`
    } else if (!isNaN(Number(testInput)) && testInput !== "") {
        return `Is a Number`
    } else {
        return 'Not a Number'
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if (validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty' ||
        validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {        
        list.style.visibility = 'visible';
        document.getElementById('launchStatus').textContent = 'All fields are required';
        document.getElementById('launchStatus').style.color = 'red';
        return;
    }

    if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {        
        list.style.visibility = 'visible';
        document.getElementById('launchStatus').textContent = 'Please enter valid numbers for fuel and cargo levels';
        document.getElementById('launchStatus').style.color = 'red';
        return;
    }

    fuelLevel = Number(fuelLevel);
    cargoLevel = Number(cargoLevel);
    
    list.style.visibility = 'hidden';

    
    if (fuelLevel < 10000) {
        document.getElementById('fuelStatus').textContent = 'Fuel level too low for launch';
    } else {
        document.getElementById('fuelStatus').textContent = 'Fuel level high enough for launch';
    }

    
    if (cargoLevel > 10000) {
        document.getElementById('cargoStatus').textContent = 'Cargo mass too heavy for launch';
    } else {
        document.getElementById('cargoStatus').textContent = 'Cargo mass low enough for launch';
    }

    
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        document.getElementById('launchStatus').textContent = 'Shuttle is Ready for Launch';
        document.getElementById('launchStatus').style.color = 'green';
        list.style.visibility = 'hidden';
    } else {
        document.getElementById('launchStatus').textContent = 'Shuttle Not Ready for Launch';
        document.getElementById('launchStatus').style.color = 'red';
        list.style.visibility = 'visible'; 
    }

   
    document.getElementById('pilotStatus').textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById('copilotStatus').textContent = `Co-pilot ${copilot} is ready for launch`;
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()

        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
