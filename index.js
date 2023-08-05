
//Fetch the roster from data.json
let roster = await fetch("./data.json").then((res) => {
  return res.json();
});

//state to manage whether the card is flipped
var flipped = false;

//state to filter by user input
var searchValue = "";

const playerContainer = document.querySelector(".players");
const search = document.getElementById("search");

search.addEventListener("input", (e) => {
  //set searchValue equal to user input
  searchValue = e.target.value;
  search.value = searchValue;
  if (searchValue.length === 0) {
    //if search field is empty show all players
    for (let i = 0; i < roster.length; i++) {
      document.getElementById(i).style.display = "";
    }
  }
  if (searchValue.length > 0) {
    //matching searchvalue to player name, if a character is not in the player name it will return -1 and set display to none
    for (let i = 0; i < roster.length; i++) {
      if (roster[i].firstName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        document.getElementById(i).style.display = "";
      } else {
        document.getElementById(i).style.display = "none";
      }
      if (roster[i].lastName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        document.getElementById(i).style.display = "";
      }
    }
  }
});

//map player info to playerContainer 
playerContainer.innerHTML = roster
  .map(
    (player, index) =>
      `<div id=${index} class="cardLayer1">
        <div class="cardLayer2">
            <div class="cardLayer3">
                <div class="cardLayer4">
                    <div class="cardLayer5">
                        <h2 class="cardFirstName">${player.firstName}</h2>
                        <h1 class="cardLastName">${player.lastName}</h1>
                        <div class="cardImage">
                            <img class="cardPlayer" src=${player.picture} />
                        </div>
                        <div class="cardDivider"></div>
                        <div class="cardPositon">
                            <h3 id=${player.id}>Position: ${player.primaryPosition}</h3>
                            <h3>PlayerID: ${player.id} <img class=svgLarger src=./mlb-color.svg /></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="${index}Flip" class="cardLayer1Flip">
        <div class="cardLayer2">
            <div class="cardLayer3">
                <div class="cardLayer4">
                    <div class="cardLayer5">
                        <h2 class="cardFirstName">Player</h2>
                        <h1 class="cardLastName">Stats</h1>
                        <div class="cardImage2">
                            <img class="cardPlayer2" src=${player.actionShot} alt="player" />
                        </div>
                        <div class="cardDivider"></div>
                        <div class="cardPositon padding">
                            <div class="cardPosition2">
                                <h3>Number: </h3> 
                                <h3>${player.number}</h3>
                            </div>
                            <div class="cardPosition2">
                                <h3>Bat Side: </h3> 
                                <h3 id="${index}bat">${player.batSide}</h3>
                            </div>
                            <div class="cardPosition2">
                                <h3>Throw Side: </h3> 
                                <h3 id="${index}throw">${player.throwSide}</h3>
                            </div>
                            <div class="cardPosition2">
                                <h3>Birth Country: </h3> 
                                <h3>${player.birthCountry}</h3>
                            </div>
                            <div class="cardPosition2">
                                <h3>Birth City: </h3> 
                                <h3>${player.birthCity}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
  )
  .join("");

//Changes position from abbreviated version to full
for (let i = 0; i < roster.length; i++) {
  if (roster[i].primaryPosition === "P") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Pitcher <box-icon name='baseball' type='solid' animation='flashing' rotate='90' ></box-icon>";
  }
  if (roster[i].primaryPosition === "LF") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Left Fielder <img class=svg src=./baseball-glove.svg />";
  }
  if (roster[i].primaryPosition === "RF") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Right Fielder <img class=svg src=./baseball-glove.svg />";
  }
  if (roster[i].primaryPosition === "2B") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Second Baseman <img class=svg src=./billed-cap.svg />";
  }
  if (roster[i].primaryPosition === "1B") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: First Baseman <img class=svg src=./billed-cap.svg />";
  }
  if (roster[i].primaryPosition === "CF") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Center Fielder <img class=svg src=./baseball-glove.svg />";
  }
  if (roster[i].primaryPosition === "SS") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Shortstop <img class=svg src=./billed-cap.svg />";
  }
  if (roster[i].primaryPosition === "C") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Catcher <img class=svg src=./baseball-glove.svg />";
  }
  if (roster[i].primaryPosition === "3B") {
    document.getElementById(`${roster[i].id}`).innerHTML =
      "Position: Third Baseman <img class=svg src=./billed-cap.svg />";
  }
  if (roster[i].batSide === "R") {
    document.getElementById(`${i}bat`).innerHTML = "Right"
  }
  if (roster[i].batSide === "L") {
    document.getElementById(`${i}bat`).innerHTML = "Left"
  }
  if (roster[i].throwSide === "R") {
    document.getElementById(`${i}throw`).innerHTML = "Right"
  }
  if (roster[i].throwSide === "L") {
    document.getElementById(`${i}throw`).innerHTML = "Left"
  }
}

function flipCard(flipped, divID) {
  if (flipped) { //if the card is flipped set display to none and show the additonal stats
    document.getElementById(`${divID}`).style.display = "none";
    document.getElementById(`${divID}Flip`).style.display = "flex";
  } else if (!flipped) { //if the card is flipped back set display to none and show the player side
    document.getElementById(`${divID}`.slice(0, -4)).style.display = "flex";
    document.getElementById(`${divID}`).style.display = "none";
  }
}

for (let i = 0; i < roster.length; i++) {
  document
    .getElementById(i)
    .addEventListener("click", () => flipCard((flipped = true), i));
  document
    .getElementById(`${i}Flip`)
    .addEventListener("click", () => flipCard((flipped = false), `${i}Flip`));
}
