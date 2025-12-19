window.openGodMode = function() {
  main.innerHTML = `
    <div class="card">
      <input id="pass" placeholder="Password">
      <button class="btn" onclick="checkGod()">Login</button>
    </div>
  `;
};

window.checkGod = function() {
  if (pass.value === "god123") {
    main.innerHTML = `
      <div class="card">
        Age <input id="gAge" value="${game.age}">
        Money <input id="gCash" value="${game.cash}">
        <button class="btn" onclick="applyGod()">Apply</button>
      </div>
    `;
  }
};

window.applyGod = function() {
  game.age = +gAge.value;
  game.cash = +gCash.value;
  save();
  loadScreen("life");
};
