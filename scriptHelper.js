// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
      <li>Name: ${name}</li>
      <li>Diameter: ${diameter}</li>
      <li>Star: ${star}</li>
      <li>Distance from Earth: ${distance}</li>
      <li>Number of Moons: ${moons}</li>
    </ol>
    <img src='${imageUrl}'>
  `;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  // Validate input
  if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
    window.alert("Fuel Level and Cargo Mass must be numeric values.");
    return;
  }

  // Check fuel level
  if (fuelLevel < 10000) {
    document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
    document.getElementById("fuelStatus").style.color = "red";
    window.alert("Fuel level too low for launch.");
  } else {
    document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
    document.getElementById("fuelStatus").style.color = "green";
  }

  // Check cargo level
  if (cargoLevel > 10000) {
    document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
    document.getElementById("cargoStatus").style.color = "red";
    window.alert("Cargo mass too heavy for launch.");
  } else {
    document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
    document.getElementById("cargoStatus").style.color = "green";
  }

  // Check overall launch status
  if (fuelLevel < 10000 || cargoLevel > 10000) {
    document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "red";
    window.alert("Shuttle is not ready for launch.");
  } else {
    document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "green";
    window.alert("Shuttle is ready for launch!");
  }

  // Update pilot and co-pilot status
  document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
  document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

  // Show the faulty items list
  list.style.visibility = "visible";
}

function validateInput(value) {
  if (value === "") {
    return "Empty";
  }
  if (isNaN(value)) {
    return "Not a Number";
  }
  return "Is a Number";
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then(response => response.json());
  
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