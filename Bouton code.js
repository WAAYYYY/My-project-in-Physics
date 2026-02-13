function toggleCode(id) {
    var codeDiv = document.getElementById(id);

    if (codeDiv.classList.contains("open")) {
       
        codeDiv.style.maxHeight = "0px";
        codeDiv.style.paddingTop = "0";
        codeDiv.style.paddingBottom = "0";
        codeDiv.classList.remove("open");

     
        setTimeout(() => {
            codeDiv.style.display = "none";
        }, 700);
    } else {
   
        codeDiv.style.display = "block";           
        codeDiv.style.maxHeight = codeDiv.scrollHeight + "px";
        codeDiv.style.paddingTop = "10px";
        codeDiv.style.paddingBottom = "10px";
        codeDiv.classList.add("open");
    }
}
