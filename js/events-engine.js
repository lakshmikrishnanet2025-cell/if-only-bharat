window.PLACES = [
  "Cuddalore",
  "Chidambaram",
  "Panruti",
  "Virudhachalam",
  "Neyveli",
  "Kurinjipadi",
  "Bhuvanagiri"
];

window.triggerEvent = function () {

  // 40% chance per year
  if (Math.random() > 0.4) return;

  const categories = Object.keys(EVENT_DATA);
  const category = EVENT_DATA[categories[Math.floor(Math.random() * categories.length)]];
  const place = PLACES[Math.floor(Math.random() * PLACES.length)];
  const desc = category.descriptions[Math.floor(Math.random() * category.descriptions.length)];

  const title = category.title.replace("{{place}}", place);
  const description = desc.replace("{{place}}", place);

  let html = `
    <div class="card">
      <h3>${title}</h3>
      <p>${description}</p>
  `;

  category.choices.forEach((choice, i) => {
    html += `<button class="btn" onclick="chooseEvent(${categories.indexOf(categories.find(k => EVENT_DATA[k] === category))}, ${i})">${choice.text}</button>`;
  });

  html += `</div>`;

  main.innerHTML = html;

  window.chooseEvent = function (catIndex, choiceIndex) {
    const catKey = categories[catIndex];
    EVENT_DATA[catKey].choices[choiceIndex].effect(game);
    save();
    loadScreen("life");
  };
};
