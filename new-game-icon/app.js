let tile;

document.addEventListener("DOMContentLoaded", function(event) { 

    tile = document.querySelector(".tile");

    tile.addEventListener("mouseenter", e => {
        e.target.classList.add("hover");
    });

    tile.addEventListener("mouseleave", e => {
        e.target.classList.remove("hover");
    });


});

