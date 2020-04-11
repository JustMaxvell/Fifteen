const game = document.querySelector(".game");
const gameOptions = document.querySelector(".gameOptions");
const gameField = document.querySelector(".gameField");
const counter = document.querySelector(".counter");
const crossButton = document.querySelector(".crossButton");

const winMessage = document.querySelector(".winMessage");
winMessage.style.visibility = "hidden";

let mode;
let rightArr = [];
let posibility = false;
let data = [];
let count = 0;

const options = document.querySelectorAll(".option");

// Функция создания игрового поля

function createGame(option) {
  checkMode(option);
  while (!posibility) {
    createGameData();
    checkWinPosibility();
  }
  createGameField();
  render();
}

crossButton.onclick = () => {
  window.location.reload();
};

options.forEach((option) => {
  option.onclick = () => {
    createGame(option);
  };
});

// Определение мода игры

function checkMode(option) {
  mode = option.textContent.split(" x ");
  gameOptions.style.display = "none";
}

// Создание игровых данных

function createGameData() {
  data = [];
  for (let i = 0; i < mode[0] * mode[1]; ) {
    let randomNumber = Math.floor(Math.random() * mode[0] * mode[1]);
    if (!data.includes(randomNumber)) {
      data.push(randomNumber);
      i++;
    } else {
      randomNumber = Math.floor(Math.random() * mode[0] * mode[1]);
    }
  }
}

// Проверка данных на решаемость

function checkWinPosibility() {
  let sum = 0;
  data.forEach((number, index) => {
    let tempArr = data.slice(index);
    tempArr.forEach((number2) => {
      if (number2 < number && number2 !== 0) {
        sum++;
      }
    });
  });
  sum += Math.ceil(data.indexOf(0) / +mode[0]);
  if (sum % 2 != 0) {
    posibility = true;
  }
}

// Создание игрового поля

function createGameField() {
  // Задаём размеры поля
  gameField.style.display = "flex";
  gameField.style.width = `${mode[0] * 70}px`;
  gameField.style.height = `${mode[1] * 70}px`;

  // Задаём победное условие

  for (let i = 1; i < +mode[0] * +mode[1]; i++) {
    rightArr.push(i);
  }
  rightArr.push(0);
}
// Заполняем поле жетонами

function render() {
  gameField.innerHTML = "";
  data.forEach((point, index) => {
    let token = document.createElement("div");
    if (point !== 0) {
      token.className = "token point";
    } else {
      token.className = "token hole";
    }
    token.textContent = point;
    token.onclick = () => {
      if (
        data.indexOf(point) === data.indexOf(0) - 1 ||
        data.indexOf(point) === data.indexOf(0) + 1 ||
        data.indexOf(point) === data.indexOf(0) + +mode[0] ||
        data.indexOf(point) === data.indexOf(0) - +mode[0]
      ) {
        ++count;
        moveToken(point);
      }
    };
    gameField.append(token);
    counter.textContent = count;
  });
}

// Геймплей

function moveToken(value) {
  let index = data.indexOf(value);
  let zeroIndex = data.indexOf(0);
  data[index] = 0;
  data[zeroIndex] = value;
  checkWinCondition();
  render();
}

function checkWinCondition() {
  if (rightArr.every((v, i) => v === data[i])) {
    winMessage.textContent = `YOU'VE WIN FOR ${count} TIMES`;
    winMessage.style.visibility = "visible";
    gameField.style.display = "none";
  }
}
