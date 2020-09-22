const gameContainer = document.getElementById("game");
const form = document.querySelector('#startform');

const COLORS = [
];

let card1 = null;
let card2 = null;
let pairs = 0;
let flips;
let disableClick = false;

let randomColor = "";
form.addEventListener('submit', function(e) {
  e.preventDefault();
  COLORS.splice(0, COLORS.length);
  document.getElementById("game").innerHTML = "";
  document.querySelector("button").innerHTML = "START NEW GAME";
  flips = "";
  pairs = 0;
  document.querySelector('p2').innerHTML = flips;
  let numberOfColors = document.querySelector('input[name="colorsnumber"]').value;
  document.querySelector('input[name="colorsnumber"]').value = "";
  for(let i = 0; i < numberOfColors; i++){
    var makeColorCode = '0123456789ABCDEF';
    let code = '#';
    for (let count = 0; count < 6; count++) {
      code = code + makeColorCode[Math.floor(Math.random() * 16)];
    }
    randomColor = code;
    console.log(randomColor);
    COLORS.push(randomColor);
    COLORS.push(randomColor);
  }

  function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  }

  let shuffledColors = shuffle(COLORS);

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  function handleCardClick(event) {

  if (card1 !== null && card2 !== null){
    disableClick = true;
  } else {
    disableClick = false;
  }

  if (disableClick) return;

    if (card2 === null){
      if (card1 === null){
        card1 = event.target;
        card1.style.backgroundColor = event.target.classList[0];
        flips++;
      }else{
        card2 = event.target
        if (card1 !== card2){
          card2.style.backgroundColor = event.target.classList[0];
          flips++;
          disableClick = true;
          if (card1.className === card2.className){
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            pairs += 2;
          } else{
            setTimeout(function(){
              card1.style.backgroundColor = ""
              card2.style.backgroundColor = ""
              card1 = null;
              card2 = null;
            },1000)
          }
        } else {
          card2 = null;
        }
      } 
    }
    document.querySelector('p2').innerHTML = flips;
    if (pairs === COLORS.length) {
      setTimeout(function() {
        alert(`You won the game of ${pairs} pairs with a score of ${flips}!`);
      }, 100);
    }
  }

  createDivsForColors(shuffledColors);

});