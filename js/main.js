import {
  formatNumber,
  getCurrentTime,
  downloadResults,
  reproduceSound,
} from "./utility.js";

let leftSide = Array.from(document.getElementsByClassName("left-side"));
let rightSide = Array.from(document.getElementsByClassName("right-side"));
let scores = Array.from(document.getElementsByClassName("score"));
let timer;
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

function startTimer() {
  // Clean previous timer if were one.
  clearInterval(timer);
  timer = setInterval(() => {
    calculateTime();
    if (
      parseInt(localStorage.getItem("minutes")) <= 0 &&
      localStorage.getItem("seconds") < 0
    ) {
      // Stop the timer, download file, reproduce sound, and refill local data with default values
      clearInterval(timer);
      downloadResults(
        JSON.stringify(JSON.parse(localStorage.getItem("teams")), null, 2),
        getCurrentTime() + ".json"
      );
      reproduceSound("../audio/finish.mp3");
      // This prevent weird values if reset when timer has ended
      localStorage.setItem("minutes", 0);
      localStorage.setItem("seconds", 0);
      localStorage.setItem("timer", false);
    }
  }, 1000);
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
  updateTimer();

  // Decrease one second in timer
  localStorage.setItem(
    "seconds",
    parseInt(localStorage.getItem("seconds")) - 1
  );
}

function updateTimer() {
  document.getElementById("timer").innerText =
    formatNumber(localStorage.getItem("minutes")) +
    ":" +
    formatNumber(localStorage.getItem("seconds"));
}

// Fill default values to empty local data and containers
window.onload = () => {
  if (!localStorage.getItem("teams")) {
    localStorage.setItem("teams", JSON.stringify(jsonScores));
  }
  scores.forEach((e, i) => {
    e.innerText = JSON.parse(localStorage.getItem("teams")).teams[i].score;
  });
  if (!localStorage.getItem("minutes")) {
    localStorage.setItem("minutes", 0);
  }
  if (!localStorage.getItem("seconds")) {
    localStorage.setItem("seconds", 0);
  }
  if (localStorage.getItem("timer") === "true") {
    startTimer();
  }
  updateTimer();
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
document.getElementById("play").addEventListener("click", () => {
  // Activate timer
  localStorage.setItem("timer", true);
  startTimer();
});

// Set timer to fifteen minutes and stop current timer if were one.
document.getElementById("fifteen-minutes").addEventListener("click", () => {
  localStorage.setItem("minutes", 15);
  localStorage.setItem("seconds", 0);
  localStorage.setItem("timer", false);
  clearInterval(timer);
  updateTimer();
});

// Set timer to twenty minutes and stop current timer if were one.
document.getElementById("twenty-minutes").addEventListener("click", () => {
  localStorage.setItem("minutes", 20);
  localStorage.setItem("seconds", 0);
  localStorage.setItem("timer", false);
  clearInterval(timer);
  updateTimer();
});

// Reset timer and scores
document.getElementById("reset").addEventListener("click", (e) => {
  localStorage.clear();
  window.location.reload();
});
