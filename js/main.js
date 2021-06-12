//check and allow only for numerical input inside buttons
document.querySelectorAll('input').forEach((element) => {
    element.addEventListener("input", () => {
        if (isNaN(element.value) === true || element.value.substring(element.value.length - 1, element.value.length) === " "){
            element.value = element.value.substring(0, element.value.length - 1);
        }
    });
});