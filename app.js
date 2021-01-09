const player0 = document.querySelector('.player-0');
const player1 = document.querySelector('.player-1');
const player0Score = document.querySelector('.player-0-score');
const player1Score = document.querySelector('.player-1-score');
const round0 = document.querySelector('.rounds-0');
const round1 = document.querySelector('.rounds-1');
const playersForm = document.querySelector('.players-form');
const player0Input = document.querySelector('.player-0-input');
const player1Input = document.querySelector('.player-1-input');
const player0Name = document.querySelector('.player-0-name');
const player1Name = document.querySelector('.player-1-name');
const winnerName = document.querySelector('.winner-name');
const winnerMsg = document.querySelector('.winner-msg');
const tieMsg = document.querySelector('.tie-msg');
const diceImg = document.querySelector('.dice-img');
const play = document.querySelector('.play');
const reset = document.querySelector('.reset');
const score = [0, 0];
const attempts = [4, 4];
let currentScore;
let activePlayer;
let playing = false;

// CHECK NUMBER OF ATTEMPTS
const checkattempts = () => {
  if (attempts[0] > 0 || attempts[1] > 0) {
    switchPlayer();
  } else if (attempts[0] === 0 && attempts[1] === 0) {
    playing = false;
    compareScores();
    // Disable play button
    play.disabled = true;
    play.classList.add('start-disabled');
    // Hide Round counts
    round0.style.visibility = 'hidden';
    round1.style.visibility = 'hidden';
  }
};

// COMPARE SCORES
const compareScores = () => {
  if (score[0] > score[1]) {
    // Player 0 wins
    player0.classList.add('winner');
    player0Name.style.color = '#fff';
    winnerMsg.style.visibility = 'visible';
    winnerName.textContent = `${player0Name.textContent}`;
  } else if (score[0] < score[1]) {
    // player 1 wins
    player1.classList.add('winner');
    player1Name.style.color = '#fff';
    winnerMsg.style.visibility = 'visible';
    winnerName.textContent = `${player1Name.textContent}`;
  } else if (score[0] === score[1]) {
    // A tie
    player0.classList.add('winner');
    player1.classList.add('winner');
    player0Name.style.color = '#fff';
    player1Name.style.color = '#fff';
    tieMsg.style.visibility = 'visible';
  }
};

// SWITCH PLAYER
const switchPlayer = () => {
  player0.classList.toggle('player-active');
  player1.classList.toggle('player-active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

// REMOVE ERROR MESSAGE
const removeErrorMessage = () => {
  setTimeout(() => {
    document.querySelector('.pop-up-msg').remove();
  }, 3000);
};

// SHOW ERROR MESSAGE
const showErrorMessage = (message) => {
  const errorMessage = `
  <div class="pop-up-msg">${message}</div>
  `;
  playersForm.insertAdjacentHTML('beforebegin', errorMessage);

  removeErrorMessage();
};

// START GAME
const startGame = () => {
  if (playing) {
    // Roll dice
    let dice = Math.trunc(Math.random() * 6) + 1;
    // Set current score to dice num
    currentScore = dice;
    // Display dice
    diceImg.src = `./img/dice-${dice}.png`;
    diceImg.style.visibility = 'visible';
    // Set active player' score to current score
    score[activePlayer] += currentScore;
    // Deduct 1from attempts and update UI
    attempts[activePlayer] -= 1;
    document.querySelector(`.round-count-${activePlayer}`).textContent =
      attempts[`${activePlayer}`];
    // Update current player's score
    document.querySelector(`.player-${activePlayer}-score`).textContent =
      score[activePlayer];
    // Switch active player
    checkattempts();
  } else {
    // show Error
    showErrorMessage('Please enter names', 'bg-black');
  }
};

// RESET GAME
const resetGame = () => {
  init();
  player0.classList.add('player-active');
  player1.classList.remove('player-active');
  player0.classList.remove('winner');
  player1.classList.remove('winner');
};

// GET ITEM FROM LOCAL STORAGE
const getNamesFromLs = () => {
  let formInfo;

  if (localStorage.getItem('formInfo') === null) {
    formInfo = [];
  } else {
    formInfo = JSON.parse(localStorage.getItem('formInfo'));
  }
  return formInfo;
};

// SET ITEM TO LOCAL STORAGE
const setItemToLs = (name) => {
  let formInfo = getNamesFromLs();

  formInfo = name;
  localStorage.setItem('formInfo', JSON.stringify(formInfo));
};

// POPULATE NAMES FROM LOCAL STORAGE
const populateNames = () => {
  let formInfo = getNamesFromLs();
  player0Name.textContent = `${formInfo.name0}`;
  player1Name.textContent = `${formInfo.name1}`;
};

// CLEAR LOCAL STORAGE
const removeItemFromLs = () => {
  localStorage.clear();
};

// SUBMITFORM
const submitForm = (e) => {
  e.preventDefault();
  const users = {
    name0: player0Input.value,
    name1: player1Input.value,
  };
  if (users.name0 !== '' && users.name1 !== '') {
    player0Input.value = '';
    player1Input.value = '';
    setItemToLs(users);
    populateNames();
    playersForm.style.visibility = 'hidden';
    playing = true;
    // Show round count
    round0.style.visibility = 'visible';
    round1.style.visibility = 'visible';
    document.querySelector('.round-count-0').textContent = attempts[0];
    document.querySelector('.round-count-1').textContent = attempts[1];
  } else {
    // show Error
    showErrorMessage('Please enter names', 'bg-black');
  }
};

// GAME INITIALIZATION
const init = () => {
  playing = false;
  currentScore = 0;
  activePlayer = 0;
  diceImg.style.visibility = 'hidden';
  player0Score.textContent = 0;
  player1Score.textContent = 0;
  score[0] = 0;
  score[1] = 0;
  attempts[0] = 4;
  attempts[1] = 4;
  player0Name.style.color = '#000';
  player1Name.style.color = '#000';
  // Clear local storage
  removeItemFromLs();

  player0Name.textContent = 'Anon';
  player1Name.textContent = 'Anon';
  playersForm.style.visibility = 'visible';
  play.disabled = false;
  play.classList.remove('start-disabled');
  round0.style.visibility = 'hidden';
  round1.style.visibility = 'hidden';
  winnerMsg.style.visibility = 'hidden';
  tieMsg.style.visibility = 'hidden';
};

// EVENT LISTENERS
const loadAllEventListeners = () => {
  // PLAYERS FORM SUBMIT
  playersForm.addEventListener('submit', submitForm);

  // PLAY BUTTON
  play.addEventListener('click', startGame);

  // RESET BUTTON
  reset.addEventListener('click', resetGame);
};

init();
loadAllEventListeners();
