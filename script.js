const questionEl = document.getElementById("question");
const imageContainer = document.getElementById("image-container");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noIndex = 0;

// First screen
const startScreen = {
  question: "Will you be my Valentine? 💘",
  images: [
    "images/start1.jpg",
    "images/start2.jpg"
  ]
};

// Screens shown when she clicks NO
const noScreens = [
  {
    question: "Are you sure? 🥺",
    images: [
      "images/no1_1.jpg",
      "images/no1_2.jpg"
    ]
  },
  {
    question: "Pleaseee be my Valentine 💔",
    images: [
      "images/no2_1.jpg",
      "images/no2_2.jpg"
    ]
  },
  {
    question: "Last chance… will you be my Valentine? 😭",
    images: [
      "images/no3_1.jpg",
      "images/no3_2.jpg"
    ]
  }
];

// Screen shown when she clicks YES
const yesScreen = {
  question: "YAY!! Happy Valentine’s Day 💕",
  images: [
    "images/yes1.jpg",
    "images/yes2.jpg",
    "images/yes3.jpg"
  ]
};

function renderScreen(screen) {
  questionEl.textContent = screen.question;
  imageContainer.innerHTML = "";

  screen.images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "photo";
    imageContainer.appendChild(img);
  });
}

// Initial render
renderScreen(startScreen);

noBtn.addEventListener("click", () => {

  if (noIndex < noScreens.length) {
    renderScreen(noScreens[noIndex]);
    noIndex++;
  } else {
    // stay on the last "no" screen
    renderScreen(noScreens[noScreens.length - 1]);
  }

});

yesBtn.addEventListener("click", () => {

  renderScreen(yesScreen);

  // hide buttons after yes
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

});
