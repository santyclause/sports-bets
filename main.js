let bank = 200;
let currentBet = 0;
let betTeam = '';
let redSkillTotal = 0;
let blueSkillTotal = 0;

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

function bet(amount, team) {
  let betElem = document.getElementById("bet-amount");

  if (confirmTeam(team)) {
    currentBet += amount;
    if (currentBet > bank) {
      currentBet = bank;
    }

    betElem.innerText = currentBet;
  }
}

function confirmTeam(team) {
  if (betTeam != '') {
    if (betTeam == team) {
      return true;
    } else {
      return false;
    }
  } else {
    betTeam = team;
    document.getElementById('bet-amount-cont').style.backgroundColor = team;
    return true;
  }
}

function submitBet() {
  let bankElem = document.getElementById("bank-amount");
  let betElem = document.getElementById("bet-amount");
  let betElemCont = document.getElementById("bet-amount-cont");

  calculateWinner(betTeam);

  currentBet = 0;
  bankElem.innerText = bank;
  betElem.innerText = currentBet;
  betElemCont.style.backgroundColor = "#92a00f";
  betTeam = '';
}

function newGame() {
  let redTeamCount = 0;
  let blueTeamCount = 0;
  redSkillTotal = 0;
  blueSkillTotal = 0;
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
  drawTeams();
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

function calculateWinner(betOnTeam) {
  let winner;
  let resultElem = document.getElementById('result')
  let statsElem = document.getElementById('stats')

  players.forEach((player) => {
    if (player.team == 'red') {
      redSkillTotal += player.skill;
    } else {
      blueSkillTotal += player.skill;
    }
  })

  checkForTeamwork();

  if (redSkillTotal > blueSkillTotal) {
    winner = 'red';
  } else if (blueSkillTotal > redSkillTotal) {
    winner = 'blue';
  } else {
    winner = 'none';
  }

  if (betOnTeam == winner) {
    resultElem.innerText = "WINNER!";
    bank += currentBet;
  } else if (winner == 'none') {
    resultElem.innerText = "TIE GAME";
    bank -= currentBet / 2;
  } else {
    resultElem.innerText = "LOSER!";
    bank -= currentBet;
  }

  let finalPointPlayer = determineFinalPoint(winner);
  statsElem.innerHTML = `<p>Final Score: ${redSkillTotal} vs ${blueSkillTotal}</p><p>Final point scored by: ${finalPointPlayer.player} ${finalPointPlayer.name}</p>`

  newGame();
}

function checkForTeamwork() {
  let rat = players[0];
  let wolf = players[1];
  let cat = players[11];
  if (rat.team == cat.team) {
    if (rat.team == 'red') {
      redSkillTotal -= 150;
    } else {
      blueSkillTotal -= 150;
    }
  }

  if (rat.team == wolf.team) {
    if (rat.team == 'red') {
      redSkillTotal += 100;
    } else {
      blueSkillTotal += 100;
    }
  }
}

function determineFinalPoint(winner) {
  let winningPlayers = players.filter((winningPlayer) => winningPlayer.team == winner);
  let rand = Math.floor(Math.random() * winningPlayers.length);
  return winningPlayers[rand];
}

newGame();