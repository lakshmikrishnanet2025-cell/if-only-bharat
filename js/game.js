document.addEventListener("DOMContentLoaded", () => {

  const main = document.getElementById("main");
  const yearText = document.getElementById("yearText");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");

  let game = JSON.parse(localStorage.getItem("bharatGame")) || {
    age: 25,
    year: 2022,
    cash: 5000,
    influence: 20,
    morality: 70,
    popularity: 30,
    bankOwned: false,
    bankProfit: 50000,
    army: 100,
    politician: false,
    countries: {
      China: 20,
      USA: 10,
      "Sri Lanka": 30
    }
  };

  function save() {
    localStorage.setItem("bharatGame", JSON.stringify(game));
    yearText.textContent = game.year;
  }

  function openMenu() {
    sideMenu.classList.add("open");
    overlay.style.display = "block";
  }

  function closeMenu() {
    sideMenu.classList.remove("open");
    overlay.style.display = "none";
  }

  menuBtn.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);

  document.querySelectorAll("[data-screen]").forEach(el => {
    el.addEventListener("click", () => {
      loadScreen(el.dataset.screen);
      closeMenu();
      setActive(el);
    });
  });

  function setActive(el) {
    document.querySelectorAll(".navItem").forEach(n => n.classList.remove("active"));
    if (el.classList.contains("navItem")) el.classList.add("active");
  }

  function loadScreen(screen) {
    if (screen === "life") {
      main.innerHTML = `
        <div class="card">
          <h3>Status</h3>
          Age: ${game.age}<br>
          Cash: ₹${game.cash}<br>
          Influence: ${game.influence}<br>
          Morality: ${game.morality}<br>
          Popularity: ${game.popularity}
        </div>
        <button class="btn" id="ageBtn">▶ Age Up</button>
      `;

      document.getElementById("ageBtn").onclick = ageUp;
    }

    if (screen === "bank") {
      main.innerHTML = game.bankOwned
        ? `
        <div class="card">
          <h3>Your Bank</h3>
          Profit / year: ₹${game.bankProfit}
          <button class="btn" id="loanBtn">Increase Loans</button>
        </div>`
        : `
        <div class="card">
          <button class="btn" id="buyBankBtn">Buy Bank (₹10L)</button>
        </div>`;

      if (!game.bankOwned) {
        document.getElementById("buyBankBtn").onclick = buyBank;
      } else {
        document.getElementById("loanBtn").onclick = () => {
          game.bankProfit += 10000;
          game.morality = Math.max(0, game.morality - 2);
          save();
          loadScreen("bank");
        };
      }
    }
  }

  function ageUp() {
    game.age++;
    game.year++;
    if (game.bankOwned) game.cash += game.bankProfit;
    game.popularity = Math.max(0, game.popularity - 1);
    save();
    loadScreen("life");
  }

  function buyBank() {
    if (game.cash >= 1000000) {
      game.cash -= 1000000;
      game.bankOwned = true;
      save();
      loadScreen("bank");
    } else {
      alert("Not enough cash!");
    }
  }

  save();
  loadScreen("life");
});
