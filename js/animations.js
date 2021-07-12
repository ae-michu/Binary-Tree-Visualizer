/*  =================
    button animations
    =================   */

//show button animation only if input is present
document.querySelectorAll('.button').forEach((element) => { 
    if (element.children[0].nodeName == "INPUT"){
        const input = element.children[0];
        const button = element.children[1];

        button.style.pointerEvents = "none";

        input.addEventListener("input", () => {
            if (input.value !== ""){
                button.style.pointerEvents = "all";
            }else{
                button.style.pointerEvents = "none";
            }
        });
    }
});

//clear input and disable animation
function clearInput(buttonId) {
    const button = document.getElementById(buttonId);
    const input = button.parentNode.children[0];

    input.value = "";
    button.style.pointerEvents = "none";
}