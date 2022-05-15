let leftSide = Array.from(document.getElementsByClassName("left-side"));
let scores = document.getElementsByClassName("score");

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    data.teams.forEach((e, i) => {
      scores[i].innerText = e.score;
    });
  });

leftSide.forEach((e) => {
  e.addEventListener("click", (x) => {
    alert(
      "¡Hola!, soy de color: " + e.parentElement.getAttribute("data-value")
    );
  });
});
