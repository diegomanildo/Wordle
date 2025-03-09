const wordsList = [
  "apple",
  "table",
  "chair",
  "stone",
  "water",
  "light",
  "music",
  "peace",
  "dance",
  "watch",
  "smile",
  "happy",
  "grass",
  "pizza",
  "cloud",
  "sleep",
  "drink",
  "flame",
  "brush",
  "beach",
  "plant",
  "liver",
  "piano",
  "peace",
  "vivid",
  "plane",
  "sport",
  "dream",
  "earth",
  "fruit",
  "grape",
  "bacon",
  "candy",
  "laser",
  "ghost",
  "sword",
  "sweep",
  "track",
  "jumpy",
  "swirl",
];

const WORD_LENGTH = 5;

const verifyWords = () => {
  wordsList.forEach(word => {
    if (word.length !== WORD_LENGTH) {
      console.error(`Word ${word} is not valid because it must be of length ${WORD_LENGTH} and is ${word.length}`);
    }
  });
};

verifyWords();

function getRandomWord() {
  const word = wordsList[Math.floor(Math.random() * wordsList.length)].toLowerCase();
  console.log(`Secret word: "${word}"`);
  return word;
}

let correctWord = getRandomWord();

let tries = 0;
const maxTries = 6;
let gameOver = false;

const wordInput = document.getElementById("word");
const triesElement = document.getElementById("tries");
const outputElement = document.getElementById("output");
const restartBtn = document.getElementById("restartBtn");

function isValidWord(word) {
  let error;

  if (!/^[a-zA-Z]+$/.test(word)) {
    error = "📏 You can only enter letters.";
  }

  if (word.length !== WORD_LENGTH) {
    error = `📐 Enter a ${WORD_LENGTH} letter word.`;
  }

  if (word === "") {
    error = "📑 Enter a word.";
  }

  if (error) {
    Swal.fire({
      icon: "warning",
      title: error,
    });
  }

  return error === undefined;
}

function handleAttempt() {
  if (gameOver)
    return;

  const userWord = wordInput.value.toLowerCase().trim();

  if (!isValidWord(userWord))
    return;

  tries++;
  triesElement.textContent = `Try: ${tries} of ${maxTries}`;

  if (userWord === correctWord) {
    Swal.fire({
      icon: "success",
      title: "You win!",
      text: "🎉 Congratulations, you guessed the word!",
    });

    gameOver = true;
    return;
  }

  displayAttempt(userWord);

  if (tries === maxTries) {
    Swal.fire({
      icon: "error",
      title: "You lost!",
      text: `😞 The word was "${correctWord}"`,
    });
    gameOver = true;
  }

  wordInput.value = "";
}

function displayAttempt(word) {
  const attemptContainer = document.createElement("div");
  attemptContainer.classList.add("attempt-container");

  for (let i = 0; i < word.length; i++) {
    const letterBox = document.createElement("div");
    letterBox.classList.add("fila");

    if (word[i] === correctWord[i]) {
      letterBox.style.backgroundColor = "#05c46b"; // Green
    } else if (correctWord.includes(word[i])) {
      letterBox.style.backgroundColor = "#f39c12"; // Yellow
    } else {
      letterBox.style.backgroundColor = "#808080"; // Red
    }

    letterBox.textContent = word[i].toUpperCase();
    attemptContainer.appendChild(letterBox);
  }

  outputElement.appendChild(attemptContainer);
}

function restartGame() {
  tries = 0;
  gameOver = false;
  triesElement.textContent = "";
  outputElement.innerHTML = "";
  wordInput.value = "";

  correctWord = getRandomWord();
}

restartBtn.addEventListener("click", restartGame);

wordInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    handleAttempt();
  }
});