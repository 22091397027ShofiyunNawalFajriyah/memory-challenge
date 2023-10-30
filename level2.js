var cardList = [
  "alirandata",
  "atribut",
  "derivatif",
  "entity",
  "identifyrelatition",
  "komposit",
  "multivelue",
  "primarykey",
  "relatition",
  "weakentity",
  "update",
  "delete",
];

var cardSet;
var board = [];
var rows = 4;
var columns = 6;

var card1Selected;
var card2Selected;
var cardsFlipped = 0;
var canFlip = true;

window.onload = function () {
  shuffleCards();
  startGame();
};

function shuffleCards() {
  cardSet = cardList.concat(cardList);
  for (let i = 0; i < cardSet.length; i++) {
    let j = Math.floor(Math.random() * cardSet.length);
    let temp = cardSet[i];
    cardSet[i] = cardSet[j];
    cardSet[j] = temp;
  }
}

function startGame() {
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardImg = cardSet.pop();
      row.push(cardImg);

      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = "back.jpg";
      card.classList.add("card");
      card.addEventListener("click", pilihKartu);
      document.getElementById("board").appendChild(card);
    }
    board.push(row);
  }
  setTimeout(sembunyikanKartu, 1000);
}

function sembunyikanKartu() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let kartu = document.getElementById(r.toString() + "-" + c.toString());
      kartu.src = "back.jpg";
    }
  }
  canFlip = true;
}

function pilihKartu() {
  if (!canFlip) return;

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  if (board[r][c] === "") return;

  this.src = board[r][c] + ".jpg";

  if (!card1Selected) {
    card1Selected = this;
  } else {
    card2Selected = this;
    canFlip = false;
    setTimeout(update, 1000);
  }
}

function update() {
  if (card1Selected.src !== card2Selected.src) {
    card1Selected.src = "back.jpg";
    card2Selected.src = "back.jpg";
  } else {
    cardsFlipped += 2;
    if (cardsFlipped === rows * columns) {
      showWinMessage(); // Tampilkan pesan kemenangan
    }
  }
  card1Selected = null;
  card2Selected = null;
  canFlip = true;
}

function showWinMessage() {
  const winMessage = document.getElementById("win-message");
  winMessage.style.display = "block";
}

function proceedToLevel3() {
  window.location.href = "level3.html";

}