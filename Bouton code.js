function toggleCode(id) {
    var codeDiv = document.getElementById(id);

    if (codeDiv.classList.contains("open")) {
        // On ferme
        codeDiv.style.maxHeight = "0px";
        codeDiv.style.paddingTop = "0";
        codeDiv.style.paddingBottom = "0";
        codeDiv.classList.remove("open");

        // On cache après animation
        setTimeout(() => {
            codeDiv.style.display = "none";
        }, 700);
    } else {
        // On ouvre
        codeDiv.style.display = "block";             // <<< OBLIGATOIRE !
        codeDiv.style.maxHeight = codeDiv.scrollHeight + "px";
        codeDiv.style.paddingTop = "10px";
        codeDiv.style.paddingBottom = "10px";
        codeDiv.classList.add("open");
    }
}
