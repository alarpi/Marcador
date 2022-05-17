let leftSide = Array.from(document.getElementsByClassName("left-side"));
let rightSide = Array.from(document.getElementsByClassName("right-side"));
let scores = Array.from(document.getElementsByClassName("score"));
let timer = document.getElementById("timer");
let jsonScores = {
  teams: [
    {
      color: "red",
      score: 0,
    },
    {
      color: "yellow",
      score: 0,
    },
    {
      color: "blue",
      score: 0,
    },
    {
      color: "purple",
      score: 0,
    },
    {
      color: "green",
      score: 0,
    },
    {
      color: "orange",
      score: 0,
    },
  ],
};

function formatNumber(number) {
  return number < 10 ? "0" + number : number;
}

function updateJSON(currentLocalStorage, currentIteration, operator) {
  let currentData = JSON.parse(currentLocalStorage);
  if (operator === "+") {
    currentData.teams[currentIteration].score++;
  } else {
    // Prevents negative numbers in score
    if (currentData.teams[currentIteration].score != 0) {
      currentData.teams[currentIteration].score--;
    }
  }
  // Upload local storage values
  localStorage.setItem("teams", JSON.stringify(currentData));
}

function setTimer(minutes, seconds) {
  if (!localStorage.getItem("minutes")) {
    localStorage.setItem("minutes", minutes);
  }
  if (!localStorage.getItem("seconds")) {
    localStorage.setItem("seconds", seconds);
  }
}

function calculateTime() {
  if (localStorage.getItem("seconds") < 0) {
    localStorage.setItem("seconds", 59);
    localStorage.setItem(
      "minutes",
      parseInt(localStorage.getItem("minutes")) - 1
    );
    if (localStorage.getItem("minutes") < 0) {
      localStorage.setItem("minutes", 59);
    }
  }

  // Refill HTML container
  document.getElementById("timer").innerText =
    formatNumber(localStorage.getItem("minutes")) +
    ":" +
    formatNumber(localStorage.getItem("seconds"));

  // Decrease one second in timer
  localStorage.setItem(
    "seconds",
    parseInt(localStorage.getItem("seconds")) - 1
  );
}

function reproduceSound(fileSource) {
  new Audio(fileSource).play();
}

// Timer will start. You can save half-one second above onload.
// You can define here: Minutes and seconds. You will need to reset with Ctrl + E after change values.
setTimer(20, 0);

// Fill default values to empty local data and containers
window.onload = () => {
  if (!localStorage.getItem("teams")) {
    localStorage.setItem("teams", JSON.stringify(jsonScores));
  }
  scores.forEach((e, i) => {
    e.innerText = JSON.parse(localStorage.getItem("teams")).teams[i].score;
  });
  document.getElementById("timer").innerText =
    formatNumber(localStorage.getItem("minutes")) +
    ":" +
    formatNumber(localStorage.getItem("seconds"));
};

// Increase score of selected team
rightSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    updateJSON(localStorage.getItem("teams"), i, "+");
    scores[i].innerText = JSON.parse(localStorage.getItem("teams")).teams[
      i
    ].score;
  });
});

// Decrease score of selected team
leftSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    updateJSON(localStorage.getItem("teams"), i, "-");
    scores[i].innerText = JSON.parse(localStorage.getItem("teams")).teams[
      i
    ].score;
  });
});

// The code will repeat each one second until all values are equal to zero
const interval = setInterval(() => {
  calculateTime();
  if (
    parseInt(localStorage.getItem("minutes")) <= 0 &&
    localStorage.getItem("seconds") < 0
  ) {
    // Stop the timer, download file, reproduce sound, and refill local data with default values
    clearInterval(interval);
    downloadResults(
      JSON.stringify(JSON.parse(localStorage.getItem("teams")), null, 2),
      "scores.json"
    );
    reproduceSound("../audio/finish.mp3");
    // This prevent weird values if reset when timer has ended
    localStorage.setItem("minutes", 0);
    localStorage.setItem("seconds", 0);
  }
}, 1000);

// Press Ctrl + E to reset local storage values and timer
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "e") {
    localStorage.clear();
    window.location.reload();
  }
});

// All the contents of local JSON will be displayed in the download's folder
function downloadResults(localValues, fileName) {
  let anchor = document.createElement("a");
  anchor.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(localValues)
  );
  anchor.setAttribute("download", fileName);
  anchor.click();
}
