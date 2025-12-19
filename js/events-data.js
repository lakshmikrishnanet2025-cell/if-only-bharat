window.EVENT_DATA = {

  floods: {
    title: "🌧 Floods in {{place}}",
    descriptions: [
      "Heavy rains flood {{place}} villages. People demand help.",
      "Rivers overflow in {{place}}, homes submerged.",
      "Cyclone-triggered floods damage crops in {{place}}."
    ],
    choices: [
      {
        text: "Send Army for rescue",
        effect: g => {
          g.popularity += 10;
          g.army -= 10;
          g.cash -= 20000;
        }
      },
      {
        text: "Give cash relief",
        effect: g => {
          g.popularity += 6;
          g.cash -= 50000;
        }
      },
      {
        text: "Ignore",
        effect: g => {
          g.popularity -= 15;
          g.morality -= 5;
        }
      }
    ]
  },

  protests: {
    title: "🔥 Protest in {{place}}",
    descriptions: [
      "Farmers protest demanding compensation in {{place}}.",
      "Public blocks roads over unemployment issues.",
      "Students protest education policies in {{place}}."
    ],
    choices: [
      {
        text: "Negotiate",
        effect: g => {
          g.popularity += 5;
          g.cash -= 10000;
        }
      },
      {
        text: "Police action",
        effect: g => {
          g.popularity -= 8;
          g.influence += 5;
        }
      }
    ]
  },

  elections: {
    title: "🗳 Election Year in {{place}}",
    descriptions: [
      "Assembly elections announced in {{place}}.",
      "Political heat rises as elections near.",
      "Media focuses on election promises."
    ],
    choices: [
      {
        text: "Spend on campaign",
        effect: g => {
          g.cash -= 80000;
          g.influence += 15;
        }
      },
      {
        text: "Grassroots work",
        effect: g => {
          g.popularity += 10;
        }
      }
    ]
  },

  industry: {
    title: "🏭 Industry Issue in {{place}}",
    descriptions: [
      "Factory pollution complaints rise in {{place}}.",
      "SIPCOT workers strike in {{place}}.",
      "Industrial accident injures workers."
    ],
    choices: [
      {
        text: "Support industry",
        effect: g => {
          g.influence += 8;
          g.morality -= 5;
        }
      },
      {
        text: "Support people",
        effect: g => {
          g.popularity += 8;
        }
      }
    ]
  }
};
