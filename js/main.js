let leftSide = Array.from(document.getElementsByClassName("left-side"));
let rightSide = Array.from(document.getElementsByClassName("right-side"));
let scores = Array.from(document.getElementsByClassName("score"));
let teams = [];

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.teams.forEach((e, i) => {
      teams.push(e);
    });
  });

console.log(scores[0]);

leftSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    scores[i].innerText++;
  });
});

rightSide.forEach((e, i) => {
  e.addEventListener("click", (x) => {
    scores[i].innerText--;
  });
});
