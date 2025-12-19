window.PLACES = [
  "Cuddalore",
  "Chidambaram",
  "Panruti",
  "Virudhachalam"
];

window.EVENTS = {
  FLOOD: {
    icon: "🌧",
    text: [
      "{{place}} பகுதியில் கனமழை.",
      "{{place}} மக்கள் உதவி கேட்கிறார்கள்."
    ],
    choices: [
      { label: "உதவி செய்", effect: g => g.popularity += 5 },
      { label: "புறக்கணி", effect: g => g.popularity -= 5 }
    ]
  }
};
