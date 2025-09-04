function saveTasks(){
  const allTasks = {};

  document.querySelectorAll(".month-card").forEach(div => {
    const monthName = div.querySelector("h2").textContent;
    const monthNum = months.find(m => m.name === monthName).num;

    const lis = Array.from(div.querySelectorAll("ul li")); // copie du tableau

    const tasks = [];

    lis.forEach(li => {
      const text = li.textContent.trim();

      // Ignorer le champ "Ajouter une tâche..."
      if(text === "Ajouter une tâche...") return;

      if(text === "") {
        li.remove(); // supprime l'élément vide de l'UI
      } else {
        tasks.push(text);
      }
    });

    allTasks[monthNum] = tasks;
  });

  localStorage.setItem("annualTasks", JSON.stringify(allTasks));
}




