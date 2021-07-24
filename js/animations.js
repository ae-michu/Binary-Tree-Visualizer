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

/*  =================
    message animation
    =================   */

// show popup message in message container
async function popUpMessage(content, color) {
    // get containter
    const container = document.getElementsByClassName("message-container")[0];

    // create message element and add it to DOM
    let message = document.createElement("p");
    message.className = "message";
    message.style.color = color;
    message.innerHTML = content;
    container.appendChild(message);

    // wait for animation to end and delete element
    await delay(1800);
    message.remove();
}