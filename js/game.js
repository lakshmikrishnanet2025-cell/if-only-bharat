document.addEventListener("DOMContentLoaded", () => {

const main = document.getElementById("main");
const yearText = document.getElementById("yearText");

window.game = JSON.parse(localStorage.getItem("bharatGame")) || {
  age: 25,
  year: 2015,
  cash: 50000,
  influence: 20,
  popularity: 40,
  morality: 60,
  army: 100,
  avatar: "citizen",
  relations: {
    family: 60,
    public: 40,
    media: 30,
    party: 20
  }
};

function save() {
  localStorage.setItem("bharatGame", JSON.stringify(game));
  yearText.textContent = game.year;
}

window.loadScreen = function(screen) {
  if (screen === "life") {
    main.innerHTML = `
      <div class="card">
        <h3>Status</h3>
        Age: ${game.age}<br>
        Money: ₹${game.cash}<br>
        Influence: ${game.influence}<br>
        Popularity: ${game.popularity}<br>
        Morality: ${game.morality}
      </div>
      <button class="btn" onclick="ageUp()">▶ Age Up</button>
    `;
  }

  if (screen === "army") {
    main.innerHTML = `
      <div class="card">
        Soldiers: ${game.army}
        <button class="btn" onclick="recruit()">Recruit 100 (₹50k)</button>
      </div>
    `;
  }

  if (screen === "relations") {
    main.innerHTML = `
      <div class="card">
        Family: ${game.relations.family}<br>
        Public: ${game.relations.public}<br>
        Media: ${game.relations.media}<br>
        Party: ${game.relations.party}
      </div>
    `;
  }

  if (screen === "politics") {
    main.innerHTML = `
      <div class="card">
        <h3>Politics</h3>
        Influence: ${game.influence}
        <button class="btn" onclick="game.influence+=10;save();loadScreen('politics')">
          Campaign
        </button>
      </div>
    `;
  }

  if (screen === "events") {
    triggerEvent();
  }
};

window.ageUp = function() {
  game.age++;
  game.year++;
  game.cash += 30000;
  triggerEvent();
  save();
  loadScreen("life");
};

window.recruit = function() {
  if (game.cash >= 50000) {
    game.cash -= 50000;
    game.army += 100;
    save();
    loadScreen("army");
  }
};

document.querySelectorAll("[data-screen]").forEach(btn => {
  btn.onclick = () => loadScreen(btn.dataset.screen);
});

save();
loadScreen("life");

});
