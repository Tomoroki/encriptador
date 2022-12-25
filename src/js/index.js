const btnToggle = document.querySelector("#dark-mode");

// Añadir el data-theme="dark" al elemento html
btnToggle.addEventListener("change", function () {
    if (this.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        // document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.removeAttribute("data-theme");
    }
});
