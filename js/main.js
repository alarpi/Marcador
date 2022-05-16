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
    if (currentData.teams[currentIteration].score != 0) {
      currentData.teams[currentIteration].score--;
    }
  }
  localStorage.setItem("teams", JSON.stringify(currentData));
}

function setTimer(hours, minutes, seconds) {
  if (!localStorage.getItem("hours")) {
    localStorage.setItem("hours", hours);
  }
  if (!localStorage.getItem("minutes")) {
    localStorage.setItem("minutes", minutes);
  }
  if (!localStorage.getItem("seconds")) {
    localStorage.setItem("seconds", seconds);
  }
}

window.onload = () => {
  if (!localStorage.getItem("timer")) {
    localStorage.setItem("timer", "20:00:00");
  }
  document.getElementById("timer").innerText =
    formatNumber(localStorage.getItem("hours")) +
    ":" +
    formatNumber(localStorage.getItem("minutes")) +
    ":" +
    formatNumber(localStorage.getItem("seconds"));
  if (!localStorage.getItem("teams")) {
    localStorage.setItem("teams", JSON.stringify(jsonScores));
  }
  scores.forEach((e, i) => {
    e.innerText = JSON.parse(localStorage.getItem("teams")).teams[i].score;
  });
  setTimer(20, 0, 0);
};

rightSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    updateJSON(localStorage.getItem("teams"), i, "+");
    scores[i].innerText = JSON.parse(localStorage.getItem("teams")).teams[
      i
    ].score;
  });
});

leftSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    updateJSON(localStorage.getItem("teams"), i, "-");
    scores[i].innerText = JSON.parse(localStorage.getItem("teams")).teams[
      i
    ].score;
  });
});

function calculateTime() {
  if (localStorage.getItem("seconds") < 0) {
    localStorage.setItem("seconds", 59);
    localStorage.setItem(
      "minutes",
      parseInt(localStorage.getItem("minutes")) - 1
    );
    if (localStorage.getItem("minutes") < 0) {
      localStorage.setItem("minutes", 59);
      localStorage.setItem(
        "hours",
        parseInt(localStorage.getItem("hours")) - 1
      );
    }
  }
  document.getElementById("timer").innerText =
    formatNumber(localStorage.getItem("hours")) +
    ":" +
    formatNumber(localStorage.getItem("minutes")) +
    ":" +
    formatNumber(localStorage.getItem("seconds"));
  localStorage.setItem(
    "seconds",
    parseInt(localStorage.getItem("seconds")) - 1
  );
}

const interval = setInterval(() => {
  calculateTime();
  if (
    localStorage.getItem("hours") === 0 &&
    localStorage.getItem("minutes") === 0 &&
    localStorage.getItem("seconds") < 0
  ) {
    clearInterval(interval);
  }
}, 1000);
