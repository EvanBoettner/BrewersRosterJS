let roster = await fetch('./data.json')
    .then((res) => {
        return res.json();
    });

console.log(`Roster: ${roster}`)
var flipped = false;

const container = document.querySelector('.container');
const playerContainer = document.querySelector('.players');

playerContainer.innerHTML = roster.map((player, index) => 
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
                                <h3>${player.batSide}</h3>
                            </div>
                            <div class="cardPosition2">
                                <h3>Throw Side: </h3> 
                                <h3>${player.throwSide}</h3>
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
).join('');


//Changes position from abbreviated version to full
for (let i = 0; i < roster.length; i++) {
    if (roster[i].primaryPosition === 'P') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Pitcher <box-icon name='baseball' type='solid' animation='flashing' rotate='90' ></box-icon>";
    }
    if (roster[i].primaryPosition === 'LF') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Left Fielder <img class=svg src=./baseball-glove.svg />";
    }
    if (roster[i].primaryPosition === 'RF') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Right Fielder <img class=svg src=./baseball-glove.svg />";
    }
    if (roster[i].primaryPosition === '2B') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Second Baseman <img class=svg src=./billed-cap.svg />";
    }
    if (roster[i].primaryPosition === '1B') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: First Baseman <img class=svg src=./billed-cap.svg />";
    }
    if (roster[i].primaryPosition === 'CF') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Center Fielder <img class=svg src=./baseball-glove.svg />";
    }
    if (roster[i].primaryPosition === 'SS') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Shortstop <img class=svg src=./billed-cap.svg />";
    }
    if (roster[i].primaryPosition === 'C') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Catcher <img class=svg src=./baseball-glove.svg />";
    }
    if (roster[i].primaryPosition === '3B') {
        document.getElementById(`${roster[i].id}`).innerHTML = "Position: Third Baseman <img class=svg src=./billed-cap.svg />";
    }
};

function flipCard(flipped, divID) {
   
    if (flipped) {
        document.getElementById(`${divID}`).style = "display: none"
        document.getElementById(`${divID}Flip`).style = "display: block"
    } else if (!flipped) {       
        document.getElementById(`${divID}`.slice(0, -4)).style = "display: block"
        document.getElementById(`${divID}`).style = "display: none"
    }
};

for (let i = 0; i< roster.length; i++) {
    document.getElementById(i).addEventListener('click', () => flipCard(flipped = true, i))
    document.getElementById(`${i}Flip`).addEventListener('click', () => flipCard(flipped = false, `${i}Flip`))
}

