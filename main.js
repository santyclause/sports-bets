let bank = 200;

const players = [
  { team: 'red', player: '🐀', skill: 100, name: 'Lurk' },
  { team: 'red', player: '🐺', skill: 99, name: 'Milo' },
  { team: 'red', player: '🦊', skill: 88, name: 'Kit' },
  { team: 'red', player: '🐷', skill: 27, name: 'Oinkington' },
  { team: 'red', player: '🐮', skill: 10, name: 'Bessie' },
  { team: 'red', player: '🐵', skill: 71, name: 'Steve' },
  { team: 'red', player: '🐻', skill: 64, name: 'Smokey' },
  { team: 'red', player: '🦝', skill: 42, name: 'Tanner' },
  { team: 'red', player: '🐹', skill: 1, name: 'Hammy' },
  { team: 'red', player: '🐭', skill: 75, name: 'Mannfred' },
  { team: 'blue', player: '🐴', skill: 76, name: 'Stanley' },
  { team: 'blue', player: '🐱', skill: 50, name: 'Thunder' },
  { team: 'blue', player: '🐯', skill: 82, name: 'Mr. Whiskers' },
  { team: 'blue', player: '🦁', skill: 73, name: 'Simba' },
  { team: 'blue', player: '🐰', skill: 51, name: 'Rapscallion' },
  { team: 'blue', player: '🐻‍❄️', skill: 77, name: 'Barry' },
  { team: 'blue', player: '🐼', skill: 31, name: 'Po' },
  { team: 'blue', player: '🐸', skill: 5, name: 'Kermit' },
  { team: 'blue', player: '🐨', skill: 19, name: 'Dropbear' },
  { team: 'blue', player: '🦄', skill: 98, name: 'Celestia' }
]

function newGame() {
  let redTeamCount = 0;
  let blueTeamCount = 0;
  players.forEach((player) => {
    let rand = Math.round(Math.random());
    if (rand == 1 && blueTeamCount < 10) {
      player.team = 'blue';
      blueTeamCount++;
    } else if (redTeamCount < 10) {
      player.team = 'red';
      redTeamCount++;
    } else {
      player.team = 'blue';
    }
  })
}

function drawTeams() {
  let redTeamElem = document.getElementById("red-team");
  let blueTeamElem = document.getElementById("blue-team");
  let redTeam = "";
  let blueTeam = "";

  players.forEach((player) => {
    if (player.team == 'red') {
      redTeam += player.player;
    } else {
      blueTeam += player.player;
    }
  })

  redTeamElem.innerText = redTeam;
  blueTeamElem.innerText = blueTeam;
}

function calculateWinner() {
  let redSkillTotal = 0;
  let blueSkillTotal = 0;

  players.forEach((player) => {
    if (player.team == 'red') {
      redSkillTotal += player.skill;
    } else {
      blueSkillTotal += player.skill;
    }
  })

  if (redSkillTotal > blueSkillTotal) {
    console.log("WINNER: RED");
  } else if (blueSkillTotal > redSkillTotal) {
    console.log("WINNER: BLUE");
  } else {
    console.log("TIE GAME");
  }
  console.log("SCORES: ", redSkillTotal, blueSkillTotal);
}

newGame();
drawTeams();
calculateWinner();