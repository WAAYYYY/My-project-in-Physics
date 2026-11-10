function saveTasks(){
  const allTasks = {};

  document.querySelectorAll(".month-card").forEach(div => {
    const monthName = div.querySelector("h2").textContent;
    const monthNum = months.find(m => m.name === monthName).num;

    const lis = Array.from(div.querySelectorAll("ul li")); 

    const tasks = [];

    lis.forEach(li => {
      const text = li.textContent.trim();


      if(text === "Ajouter une tâche...") return;

      if(text === "") {
        li.remove(); 
      } else {
        tasks.push(text);
      }
    });

    allTasks[monthNum] = tasks;
  });

  localStorage.setItem("annualTasks", JSON.stringify(allTasks));
}




