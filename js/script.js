/* global document */

const bell = document.querySelector('.bellHover');
const shakeBell = bell.querySelector('.shakeBell');
const ghostMove = document.querySelector('.ghostMove');
const audioBell = document.querySelector("audio[src='audio/bell.mp3']");
const audioCrack = document.querySelector("audio[src='audio/crack.mp3']");
let bellCounter = 0;

function inactivate(e) {
  if (e.animationName === 'shakeBell' || e.animationName === 'bellSprite') {
    shakeBell.classList.remove('active');
    shakeBell.classList.add('inactive');
  } else if (e.animationName === 'ghostMove') {
    ghostMove.classList.remove('active');
    ghostMove.classList.add('inactive');
  }
}

function handleBellClick() {
  if (bellCounter === 0) {
    ghostMove.addEventListener('animationend', inactivate);
    ghostMove.classList.remove('inactive');
    ghostMove.classList.add('active');
  }
  shakeBell.addEventListener('animationend', inactivate);
  shakeBell.classList.remove('inactive');
  shakeBell.classList.add('active');
  audioBell.currentTime = 0;
  audioBell.play();
  bellCounter += 1;
  handleBellCount();
}

function handleBellCount() {
  const message = document.querySelector('.message');
  const volWarning = document.querySelector('.volWarning');
  const viewPort = document.querySelector('.viewPort');
  const ghostAll = document.querySelector('.ghostAll');
  const escapeGhosts = ghostAll.querySelectorAll('.escapeGhost');
  if (bellCounter === 1) {
    volWarning.innerHTML = '&nbsp;';
    setTimeout(() => { message.textContent = 'What was that??'; }, 1000);
    setTimeout(() => { message.textContent = 'You saw that right...?'; }, 2500);
  } else if (bellCounter > 1 && bellCounter < 4) {
    message.textContent = '?...';
  } else if (bellCounter === 4) {
    message.textContent = '...no';
    setTimeout(() => { message.textContent = 'stop, Stop, STOP!!'; }, 1000);
    setTimeout(() => { message.innerHTML = '&nbsp;'; }, 2000);
    shakeBell.removeEventListener('animationend', inactivate);
    shakeBell.classList.add('active');
    shakeBell.style.animationIterationCount = 'infinite';
    audioBell.currentTime = 0;
    audioBell.loop = true;
    ghostMove.classList.add('hidden');
    viewPort.classList.add('showOverflow');
    escapeGhosts.forEach(ghost => ghost.classList.add('active'));
    bell.removeEventListener('click', handleBellClick);
    setTimeout(() => {
      const bellImage = document.querySelector("[data='images/bellSprite.svg']");
      const bellBroken = document.querySelector("[data='images/bellBroken.svg']");
      bellImage.classList.add('hidden');
      bellBroken.classList.remove('hidden');
      shakeBell.classList.remove('active');
      shakeBell.classList.add('inactive');
      audioCrack.play();
      audioBell.loop = false;
      message.textContent = '[ E R R O R ]';
    }, 3500);
  }
}

bell.addEventListener('click', handleBellClick);
