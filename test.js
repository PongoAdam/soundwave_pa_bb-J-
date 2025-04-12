document.addEventListener("DOMContentLoaded", function () {
    function initSlider(containerId, leftButtonId, rightButtonId) {
        const container = document.getElementById(containerId);
        const leftButton = document.getElementById(leftButtonId);
        const rightButton = document.getElementById(rightButtonId);
        const buttons = Array.from(container.children);
        let visibleStart = 0;

        // Dinamikusan állítjuk be a látható elemek számát
        const visibleCount = window.innerWidth < 600 ? buttons.length : 4; // 600px alatt mindent mutatunk, felette 4 elemet

        function updateVisibility(direction) {
            buttons.forEach((button, index) => {
                if (index >= visibleStart && index < visibleStart + visibleCount) {
                    button.classList.remove("hidden");
                    button.style.opacity = "1";
                    button.style.transform = "translateX(0)";
                } else {
                    button.classList.add("hidden");
                    button.style.opacity = "0";
                    button.style.transform = direction === "left" ? "translateX(-50px)" : "translateX(50px)";
                }
            });
        }


        rightButton.addEventListener("click", function () {
            if (visibleStart + visibleCount < buttons.length) {
                visibleStart++;
                updateVisibility("right");
            }
        });

        leftButton.addEventListener("click", function () {
            if (visibleStart > 0) {
                visibleStart--;
                updateVisibility("left");
            }
        });

        updateVisibility(); // Kezdőállapot beállítása
    }

    // Minden kategóriára külön inicializáljuk a slide funkciót
    initSlider("egyes", "hatra1", "elore1");
    initSlider("kettes", "hatra2", "elore2");
    initSlider("harmas", "hatra3", "elore3");
    initSlider("negyes", "hatra4", "elore4");
    initSlider("otos", "hatra5", "elore5");
});

// Az ablak méretének változása esetén újra ellenőrizzük, hogy szükséges-e a rejtés
window.addEventListener('resize', handleResize);

function handleResize() {
    // Módosítsuk a látható elemek számát a képernyő szélessége alapján
    const visibleCount = window.innerWidth <= 600 ? 8 : 4; // Ha 600px alatt, akkor 8 elem

    // Minden sliderre frissítjük az elemek számát
    ["egyes", "kettes", "harmas", "negyes", "otos"].forEach(id => {
        const container = document.getElementById(id);
        const buttons = Array.from(container.children);
        let visibleStart = 0;

        // Alapértelmezett láthatóság beállítása
        buttons.forEach((button, index) => {
            if (index >= visibleStart && index < visibleStart + visibleCount) {
                button.classList.remove("hidden");
                button.style.opacity = "1";
                button.style.transform = "translateX(0)";
            } else {
                button.classList.add("hidden");
                button.style.opacity = "0";
                button.style.transform = "translateX(50px)";
            }
        });

    });
}

handleResize(); // Inicializáláskor is meghívjuk

// A modal megjelenítése
function openModal() {
    document.getElementById("modeModal").style.display = "block";
}

// A modal eltüntetése
function closeModal() {
    document.getElementById("modeModal").style.display = "none";
}

// Világos mód beállítása
function setLightMode() {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    closeModal();
}

// Sötét mód beállítása
function setDarkMode() {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    closeModal();
}
