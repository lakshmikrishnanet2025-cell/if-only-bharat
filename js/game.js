document.addEventListener("DOMContentLoaded",()=>{

const main = document.getElementById("main");
const yearText = document.getElementById("yearText");
const menu = document.getElementById("sideMenu");

document.getElementById("menuBtn").onclick = () =>
  menu.classList.toggle("hidden");

window.game = JSON.parse(localStorage.getItem("bharatGame")) || {
  age: 25,
  year: 2016,
  cash: 50000,
  influence: 20,
  popularity: 40,
  morality: 60,
  army: 100,
  bank: false,
  relations: { family:60, public:40, media:30 }
};

function save(){
  localStorage.setItem("bharatGame",JSON.stringify(game));
  yearText.textContent = game.year;
}

window.go = function(screen){
  menu.classList.add("hidden");

  if(screen==="life"){
    main.innerHTML=`
      <div class="card">
        வயது: ${game.age}<br>
        ஆண்டு: ${game.year}<br>
        பணம்: ₹${game.cash}<br>
        மக்கள் ஆதரவு: ${game.popularity}<br>
        செல்வாக்கு: ${game.influence}<br>
        ஒழுக்கம்: ${game.morality}
      </div>
      <button onclick="ageUp()">▶ வயது அதிகரிக்க</button>
    `;
  }

  if(screen==="bank"){
    main.innerHTML = game.bank
      ? `<div class="card">🏦 வங்கி லாபம்: ₹50,00000000 / ஆண்டு</div>`
      : `<button onclick="buyBank()">🏦 வங்கி வாங்க (₹1,00,000)</button>`;
  }

  if(screen==="army"){
    main.innerHTML=`
      <div class="card">🪖 படை: ${game.army}</div>
      <button onclick="recruit()">100 பேர் சேர்க்க (₹20k)</button>
    `;
  }

  if(screen==="relations"){
    main.innerHTML=`
      <div class="card">
        குடும்பம்: ${game.relations.family}<br>
        மக்கள்: ${game.relations.public}<br>
        மீடியா: ${game.relations.media}
      </div>
    `;
  }

  if(screen==="events"){
    randomEvent();
  }

  if(screen==="god"){
    main.innerHTML=`
      <input id="p" placeholder="Password">
      <button onclick="god()">Login</button>
    `;
  }
};

window.ageUp=function(){
  game.age++; game.year++;
  if(game.bank) game.cash+=50000;

  if(checkElection()) return;
  if(randomEvent()) return;

  save(); go("life");
};

window.buyBank=function(){
  if(game.cash>=100000){
    game.cash-=100000;
    game.bank=true;
    save(); go("bank");
  } else alert("பணம் போதவில்லை");
};

window.recruit=function(){
  if(game.cash>=20000){
    game.cash-=20000;
    game.army+=100;
    save(); go("army");
  }
};

function checkElection(){
  if(game.year%5===0){
    main.innerHTML=`
      <div class="card">
        🗳️ சட்டமன்ற தேர்தல்<br>
        மக்கள் ஆதரவு: ${game.popularity}<br>
        <button onclick="contest()">போட்டி</button>
      </div>
    `;
    return true;
  }
  return false;
}

window.contest=function(){
  let score=game.popularity+(game.cash/50000);
  if(score>60){
    alert("🎉 நீங்கள் வெற்றி!");
    game.influence+=20;
  } else {
    alert("❌ தோல்வி");
    game.popularity-=10;
  }
  save(); go("life");
};

function randomEvent(){
  if(Math.random()>0.6) return false;

  const keys=Object.keys(EVENTS);
  const k=keys[Math.floor(Math.random()*keys.length)];
  const e=EVENTS[k];
  const place=PLACES[Math.floor(Math.random()*PLACES.length)];
  const text=e.text[Math.floor(Math.random()*e.text.length)].replace("{{place}}",place);

  let html=`<div class="card"><h3>${e.icon} நிகழ்வு</h3><p>${text}</p>`;
  e.choices.forEach((c,i)=>{
    html+=`<button onclick="choose('${k}',${i})">${c.label}</button>`;
  });
  html+=`</div>`;
  main.innerHTML=html;
  return true;
}

window.choose=function(k,i){
  EVENTS[k].choices[i].effect(game);
  save(); go("life");
};

window.god=function(){
  if(p.value==="god123"){
    main.innerHTML=`
      வயது <input id="ga" value="${game.age}">
      பணம் <input id="gc" value="${game.cash}">
      <button onclick="applyGod()">Apply</button>
    `;
  } else alert("Wrong password");
};

window.applyGod=function(){
  game.age=+ga.value;
  game.cash=+gc.value;
  save(); go("life");
};

save();
go("life");

});

