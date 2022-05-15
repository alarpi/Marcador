let leftSide = Array.from(document.getElementsByClassName("left-side"));

let teams = JSON.parse()

leftSide.forEach(e => {
    e.addEventListener("click", x => {
        alert("¡Hola!, soy de color: " + e.parentElement.getAttribute("data-value"));
    })
})