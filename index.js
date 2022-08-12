let dict = [
  "gatos",
  "papas",
  "fuego",
  "huevo",
  "color",
  "casas",
  "arbol",
  "nueve",
  "zorro",
  "remar",
  "locro",
  "jamon",
  "feliz",
  "cinco",
  "tonto",
  "cuero",
  "volar",
  "vuelo",
  "avion",
  "genio",
  "pibes",
];

let input = document.getElementById("word");
let restartBtn = document.getElementById("restartBtn");
let WordleGame = document.getElementById("output");
let secretWord = dict[Math.floor(Math.random() * dict.length)];
let tries = 0;
let intentos = document.getElementById("tries");

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    checkWord(input);
  }
});

restartBtn.addEventListener("click", () => {
  restart();
});

function checkWord(input) {
  let word = input.value;
  if (word.match(/[^a-zA-Z]/)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Solo puedes ingresar letras 📏",
    });
  } else if (word === "") {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ingresa una palabra 📑",
    });
  } else if (word.length !== 5) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ingresa una palabra de 5 letras 📐",
    });
  } else if (word.length === 5) {
    startGame(word, secretWord);
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Algo salio mal 😞",
    });
  }
}

function startGame(word, secretWord) {
  word = word.toUpperCase();
  secretWord = secretWord.toUpperCase();
  tries++;
  intentos.innerHTML = "Intentos: " + tries;
  if (word === secretWord) {
    Swal.fire({
      icon: "success",
      title: "Ganador!",
      text: "Ganaste 🎉, tu palabra era: " + secretWord.toLowerCase(),
    });
    restart();
  } else {
    if (tries > 6) {
      Swal.fire({
        icon: "error",
        title: "Game Over!",
        text: "Perdiste😬, tu palabra era: " + secretWord.toLowerCase(),
      });
      restart();
    } else if (tries <= 6) {
      for (let i = 0; i < secretWord.length; i++) {
        var fila = document.createElement("div");
        fila.classList.add("fila");
        if (word[i] === secretWord[i]) {
          fila.style.backgroundColor = "#05c46b";
        } else if (secretWord.includes(word[i])) {
          fila.style.backgroundColor = "#ffd32a";
        } else {
          fila.style.backgroundColor = "gray";
        }
        fila.style.color = "#131313";
        fila.style.width = "50px";
        fila.style.height = "50px";

        fila.textContent = word[i];
        WordleGame.appendChild(fila);
      }

      WordleGame.appendChild(document.createElement("br"));
      WordleGame.appendChild(document.createElement("br"));
    }
  }
}

function restart() {
  WordleGame.innerHTML = "";
  input.value = "";
  tries = 0;
  intentos.innerHTML = "Intentos: " + tries;
  secretWord = dict[Math.floor(Math.random() * dict.length)];
  console.log(secretWord);
}
