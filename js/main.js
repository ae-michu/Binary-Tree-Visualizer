//check and allow only for numerical input inside buttons
document.querySelectorAll('input').forEach((element) => {
    element.addEventListener("input", () => {
        if (isNaN(element.value) === true || element.value.substring(element.value.length - 1, element.value.length) === " "){
            element.value = element.value.substring(0, element.value.length - 1);
        }
    });
});

//add "click" function to all buttons
document.querySelectorAll(".button > div").forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.id) {
            case "add-button":
                console.log("add button pressed");
                break;
            case "del-button":
                console.log("del button pressed");
                break;
            case "find-button":
                console.log("find button pressed");
                break;
            case "balance-button":
                console.log("balance button pressed");
                break;
            case "state-button":
                console.log("state button pressed");
                break;
        }
    });
});