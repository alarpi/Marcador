let leftSide = Array.from(document.getElementsByClassName("left-side"));

leftSide.forEach(e => {
    e.addEventListener("click", x => {
        alert("¡Hola!, soy de color: " + e.parentElement.getAttribute("data-value"));
    })
})