document.addEventListener("DOMContentLoaded", function(event) { 
    const pawn = document.querySelector('.pawn-body');
    const wrapper = document.querySelector('.pawn-wrapper');
    const shadow = document.querySelector('.pawn-shadow');

    const animationClasses = ["jump", "flip", "land"]
    let animationIndex = 0;

    pawn.addEventListener('click', (e) => {
        pawn.classList.add(animationClasses[0])
    });

    pawn.addEventListener('animationend', (e) => {

        animationIndex++;
        let animClass = animationClasses[animationIndex];
        pawn.classList.add(animClass);

        if(animClass == "flip") {
            wrapper.classList.add("moveUp");
            shadow.classList.add("shadowMoveUp");
        }
    });
});

