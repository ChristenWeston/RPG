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

const foodIncrease = changeState("foodPerDay")(1);
const ageIncrease = changeState("maxAge")(2);
const funnyIncrease = changeState("funny")(3);
const healthDecrease = changeState("health")(-10);

$(document).ready(function() {
  $("#monkey").hide();
  $("#cat").hide();
  $("#dog").hide();
  $("#owl").hide();
  let newAnimal;

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

  });
  let updateAnimal = {...newAnimal}
  $('#foodIncrease').click(function() {
    //const newStateFood = {...newAnimal};
   // const foodValue = newStateFood.foodPerDay + 1;
   // newStateFood.foodPerDay = foodValue;
    updateAnimal = changeState("foodPerDay")(1)(updateAnimal)
    console.log(updateAnimal.foodPerDay);
    $('#food-value').text(`Food: ${updateAnimal.foodPerDay}`);
  });

  $('#ageIncrease').click(function() {
    const newStateAge = newAnimal(ageIncrease);
    $('#age-value').text(`Age: ${newStateAge.maxAge}`);
  });

  $('#funnyIncrease').click(function() {
    //updateAnimal = {...updateAnimal, funny(funnyIncrease)};
    const newStateFunny = newAnimal(funnyIncrease);
    $('#funny-value').text(`Funny: ${newStateFunny.funny}`);
  });

  $('#healthDecrease').click(function() {
    const newStateHealth = newAnimal(healthDecrease);
    $('#health-value').text(`Health: ${newStateHealth.health}`);
  });

  // $('#show-state').click(function() {
  //   console.log("Show state clicked");
  //   const newStateFood = {...newAnimal};
  //   console.log(newStateFood.foodPerDay)
  //   console.log(newAnimal.health);
  //   $('#food-value').text(`Food: ${newStateFood.foodPerDay}`);
  //   $('#funny-value').text(`Funny: ${newStateFood.funny}`);
  //   $('#age-value').text(`Age: ${newStateFood.maxAge}`);
  //   $('#health-value').text(`Health: ${newStateFood.health}`);
  // });

});
