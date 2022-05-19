import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'src/styles.css';

const storeState = (startingValues) => {
  let currentState = startingValues;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

// Define starting values for our characters
const animalStart = { maxAge: 0, foodPerDay: 0, health: 100, funny: 0};

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

$(document).ready(function() {
  $("#monkey").hide();
  $("#cat").hide();
  $("#dog").hide();
  $("#owl").hide();
  let newAnimal;
  let updateAnimal;

  $("#submit").click(function(event) {
    event.preventDefault();
    const animal = $("#animals").val(); // animal from form
   
    switch(animal){
    case 'monkey':
      $("#monkey").show();
      $("#cat").hide();
      $("#dog").hide();
      $("#owl").hide();
      newAnimal = {...animalStart, maxAge: 15, foodPerDay: 3, funny: 5};
      console.log(newAnimal.funny);
      break;
    case 'cat':
      $("#monkey").hide();
      $("#cat").show();
      $("#dog").hide();
      $("#owl").hide();
      newAnimal = {...animalStart, maxAge: 17, foodPerDay: 1, funny: 6 }
      break;
    case 'dog':
      $("#monkey").hide();
      $("#cat").hide();
      $("#dog").show();
      $("#owl").hide();
      newAnimal = {...animalStart, maxAge: 14, foodPerDay: 1, funny: 7};
      break;
    case 'owl':
      $("#monkey").hide();
      $("#cat").hide();
      $("#dog").hide();
      $("#owl").show();
      newAnimal = {...animalStart, maxAge: 20, foodPerDay: 2, funny: 3};
      break;
    default:
      $("#monkey").show();
      $("#cat").show();
      $("#dog").show();
      $("#owl").show();
    }
    $('#food-value').text(`Food: ${newAnimal.foodPerDay}`);
    $('#funny-value').text(`Funny: ${newAnimal.funny}`);
    $('#age-value').text(`Age: ${newAnimal.maxAge}`);
    $('#health-value').text(`Health: ${newAnimal.health}`);
    updateAnimal = {...newAnimal}

  });
  
  $('#foodIncrease').click(function() {
   // prop value state
    updateAnimal = changeState("foodPerDay")(1)(updateAnimal)
    console.log(updateAnimal.foodPerDay);
    $('#food-value').text(`Food: ${updateAnimal.foodPerDay}`);
  });

  $('#ageIncrease').click(function() {
    updateAnimal = changeState("maxAge")(1)(updateAnimal);
    $('#age-value').text(`Age: ${updateAnimal.maxAge}`);
  });

  $('#funnyIncrease').click(function() {
    updateAnimal = changeState("funny")(1)(updateAnimal);
    $('#funny-value').text(`Funny: ${updateAnimal.funny}`);
  });

  $('#healthDecrease').click(function() {
    updateAnimal = changeState("health")(-1)(updateAnimal);
    $('#health-value').text(`Health: ${updateAnimal.health}`);
  });

});
