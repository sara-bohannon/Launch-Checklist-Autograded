// const { myFetch, pickPlanet, addDestinationInfo } = require("./scriptHelper");

// Write your JavaScript code here!
window.addEventListener("load", ()=> {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event)=> {
      event.preventDefault();
      //List DOM
      let pilot = document.querySelector("input[name=pilotName]").value;
      let copilot = document.querySelector("input[name=copilotName]").value;
      let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
      let cargoLevel = document.querySelector("input[name=cargoMass]").value;
      let list = document.getElementById('faultyItems');

      //use formsubmission to validate and update list
      formSubmission(document,list,pilot,copilot,fuelLevel,cargoLevel);
  });

  myFetch()
  .then(result => {
    let planet = pickPlanet(result);

    let name = planet.name;
    let diameter = planet.diameter;
    let star = planet.star;
    let distance = planet.distance;
    let imageUrl = planet.image;
    let moons = planet.moons;

    addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
  })
  .catch(error => {
    console.error("Error fetching planet data:", error);
  });
});

 