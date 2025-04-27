// Data
const eggMethods = [
    { id: "boiled", name: "Boiled Egg", time: 10, steps: ["Boil water", "Add eggs", "Cook for 10 minutes", "Cool and peel", "\n Enjoy your delicious Boiled Egg!"] },
    { id: "scrambled", name: "Scrambled Egg", time: 5, steps: ["Crack eggs", "Whisk with salt", "Cook on low heat", "Stir until fluffy", "\n Enjoy your delicious Scrambled Egg!"] },
    { id: "fried", name: "Fried Egg", time: 3, steps: ["Heat pan", "Add oil", "Crack egg in pan", "Fry until edges are crispy", "\n Enjoy your delicious Fried Egg!"] },
    { id: "omelet", name: "Omelet", time: 7, steps: ["Crack eggs", "Whisk with ingredients", "Cook in pan", "Flip and serve", "\n Enjoy your delicious Omelet!"] }
  ];
  
  // DOM Elements
  const eggOptionsContainer = document.getElementById("egg-options");
  
  // Populate Home Screen
  eggMethods.forEach((method) => {
    const card = document.createElement("div");
    card.className = "egg-card";
    card.textContent = method.name;
    card.addEventListener("click", () => openCookingWindow(method));
    eggOptionsContainer.appendChild(card);
  });
  
  // Function to Open a New Window
  function openCookingWindow(method) {
    const { ipcRenderer } = require("electron");
    ipcRenderer.send("open-cooking-window", method);
  }