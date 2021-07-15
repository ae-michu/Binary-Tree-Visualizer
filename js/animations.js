/*  ===============
    timing function
    ===============  */

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

/*  ===============
    tree animations
    ===============  */

//blink node's circle
async function blinkNode(value, duration, color) {
    //get element
    const circles = document.getElementsByTagName('circle');
    let circle;
    for (let i = 0; i < circles.length; i++) {
        if (circles[i].attributes.data.value === String(value)){
            circle = circles[i];
            break;
        }
    }

    //blink elements circle
    circle.style.stroke = color;
    await delay(duration);
    circle.style.stroke = null;
}