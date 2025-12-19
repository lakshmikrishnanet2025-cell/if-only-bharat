document.addEventListener("DOMContentLoaded", () => {

const main = document.getElementById("main");
const yearEl = document.getElementById("year");
const menu = document.getElementById("sideMenu");

document.getElementById("menuBtn").onclick = () =>
  menu.classList.toggle("hidden");

window.game = JSON.parse(localStorage.getItem("bharat")) || {
  age: 25,
  year: 2018,
  cash: 50000,
  influence: 20,
  popularity: 40,
  morality: 60,
  army: 100,
  bank: false,
  relations: { family:60, public:40, media:30 }
};

function save(){
  localStorage.setItem("bharat", JSON.stringify(game));
  yearEl.textContent = game.year;
}

window.go = function(screen){
  menu.classList.add("hidden");

  if(screen==="life"){
    main.innerHTML = `
      <div class="card">
        Age ${game.age}<br>
        ₹${game.cash}<br>
        Influence ${game.influence}<br>
        Popularity ${game.popularity}
      </div>
      <button onclick="ageUp()">▶ Age Up</button>
    `;
  }

  if(screen==="bank"){
    main.innerHTML = game.bank
      ? `<div class="card">Bank Profit ₹50,000 / year</div>`
      : `<button onclick="buyBank()">Buy Bank (₹1,00,000)</button>`;
  }

  if(screen==="army"){
    main.innerHTML = `
      <div class="card">Army: ${game.army}</div>
      <button onclick="recruit()">Recruit 100 (₹20k)</button>
    `;
  }

  if(screen==="relations"){
    main.innerHTML = `
      <div class="card">
        Family ${game.relations.family}<br>
        Public ${game.relations.public}<br>
        Media ${game.relations.media}
      </div>
    `;
  }

  if(screen==="events"){
    main.innerHTML = `
      <div class="card">
        🌧 Floods in Cuddalore
        <button onclick="eventChoice(1)">Send Help</button>
        <button onclick="eventChoice(0)">Ignore</button>
      </div>
    `;
  }

  if(screen==="god"){
    main.innerHTML = `
      <input id="p" placeholder="password">
      <button onclick="god()">Login</button>
    `;
  }
};

window.ageUp = function(){
  game.age++;
  game.year++;
  if(game.bank) game.cash += 50000;
  save(); go("life");
};

window.buyBank = function(){
  if(game.cash>=100000){
    game.cash-=100000;
    game.bank=true;
    save(); go("bank");
  } else alert("Not enough money");
};

window.recruit = function(){
  if(game.cash>=20000){
    game.cash-=20000;
    game.army+=100;
    save(); go("army");
  }
};

window.eventChoice = function(ok){
  if(ok){ game.popularity+=10; game.cash-=20000; }
  else game.popularity-=10;
  save(); go("life");
};

window.god = function(){
  if(p.value==="god123"){
    main.innerHTML=`
      Age <input id="ga" value="${game.age}">
      Cash <input id="gc" value="${game.cash}">
      <button onclick="applyGod()">Apply</button>
    `;
  } else alert("Wrong password");
};

window.applyGod = function(){
  game.age=+ga.value;
  game.cash=+gc.value;
  save(); go("life");
};

save();
go("life");

});
