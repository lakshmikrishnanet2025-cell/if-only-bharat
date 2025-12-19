window.triggerEvent = function () {

  let event = "";

  if (game.year === 2015) {
    event = "🌧 Cuddalore Floods – जनता need help.";
    game.popularity += 10;
  }

  if (game.year === 2020) {
    event = "🏥 Health crisis affects Tamil Nadu.";
    game.morality += 5;
  }

  if (game.year === 2021) {
    event = "🗳 Tamil Nadu Assembly Elections.";
    game.influence += 20;
  }

  if (event) {
    main.innerHTML = `
      <div class="card">
        <h3>Year Event</h3>
        <p>${event}</p>
        <button class="btn" onclick="loadScreen('life')">Continue</button>
      </div>
    `;
  }
};
