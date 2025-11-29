// ====== Главное: слово хранится прямо здесь (в коде) ======
const SECRET = "ФИЖМА"; // <- поменяйте слово, потом закоммитьте и запушьте для демонстрации редеплоя
// =========================================================

const MAX_ATTEMPTS = 5;
const WORD_LENGTH = 5;

const boardEl = document.getElementById('board');
const input = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const messageEl = document.getElementById('message');
const timerEl = document.getElementById('timer');

let attempts = [];
let currentAttempt = 0;
let startTime = Date.now();
let timerInterval;

function pad(n){return n<10? '0'+n: n; }

function startTimer(){
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(()=>{
    const diff = Date.now()-startTime;
    const s = Math.floor(diff/1000);
    timerEl.textContent = `Время: ${pad(Math.floor(s/60))}:${pad(s%60)}`;
  }, 500);
}
startTimer();

function createBoard(){
  boardEl.innerHTML = '';
  for(let r=0;r<MAX_ATTEMPTS;r++){
    const row = document.createElement('div');
    row.className = 'row';
    for(let c=0;c<WORD_LENGTH;c++){
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = r;
      cell.dataset.col = c;
      row.appendChild(cell);
    }
    boardEl.appendChild(row);
  }
}
createBoard();

function showMessage(text, success=false){
  messageEl.textContent = text;
  messageEl.style.color = success ? '#9be7a6' : '#f5c6cb';
}

function evaluateGuess(guess){
  guess = guess.toUpperCase();
  const secret = SECRET.toUpperCase();
  const rowCells = document.querySelectorAll(`.row:nth-child(${currentAttempt+1}) .cell`);
  // prepare frequency map for present marking
  const freq = {};
  for (let ch of secret) freq[ch] = (freq[ch]||0) + 1;

  // first pass: correct positions
  for(let i=0;i<WORD_LENGTH;i++){
    rowCells[i].textContent = guess[i];
    if(guess[i] === secret[i]){
      rowCells[i].classList.add('correct');
      freq[guess[i]]--;
    } else {
      rowCells[i].classList.add('absent'); // temporarily absent; may change to present
    }
  }
  // second pass: present but wrong place
  for(let i=0;i<WORD_LENGTH;i++){
    if(rowCells[i].classList.contains('correct')) continue;
    const ch = guess[i];
    if(freq[ch] > 0){
      rowCells[i].classList.remove('absent');
      rowCells[i].classList.add('present');
      freq[ch]--;
    } else {
      // remain absent
      rowCells[i].classList.add('absent');
    }
  }

  if(guess === secret){
    const t = Math.floor((Date.now()-startTime)/1000);
    showMessage(`Ты молодец, иди хвастайся друзьям. Время ${Math.floor(t/60)}:${pad(t%60)}`, true);
    submitBtn.disabled = true;
    input.disabled = true;
    clearInterval(timerInterval);
    return true;
  }
  currentAttempt++;
  if(currentAttempt >= MAX_ATTEMPTS){
    showMessage(`Попытки закончились. Загаданное слово: ${secret}`);
    submitBtn.disabled = true;
    input.disabled = true;
    clearInterval(timerInterval);
    return false;
  }
  return false;
}

submitBtn.addEventListener('click', ()=>{
  const value = input.value.trim();
  if(value.length !== WORD_LENGTH){
    showMessage('Введите ровно 5 букв.');
    return;
  }
  evaluateGuess(value);
  input.value = '';
  input.focus();
});

input.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') submitBtn.click();
});

resetBtn.addEventListener('click', ()=>{
  currentAttempt = 0;
  startTimer();
  createBoard();
  submitBtn.disabled = false;
  input.disabled = false;
  input.value = '';
  showMessage('');
});

const lastUpdate = new Date("%BUILD_DATE%");
const info = document.createElement("div");
info.textContent = `Последнее изменение: ${lastUpdate.toLocaleString()}`;
info.className = "last-update";
document.body.appendChild(info);


