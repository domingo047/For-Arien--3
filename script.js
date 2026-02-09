const questionEl = document.getElementById("question");
const imageContainer = document.getElementById("image-container");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const finalBtn = document.getElementById("finalBtn");
const letterEl = document.getElementById("letter");

let noIndex = 0;
let clickedYesImages = new Set();

/* -----------------------------
   SCREENS
----------------------------- */

const startScreen = {
  question: "Will you be my Valentine? 💘",
  images: [
    "images/start1.jpg",
    "images/start2.jpg"
  ]
};

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

const yesScreen = {
  question: "YAY!! Happy Valentine’s Day 💕",
  images: [
    {
      src: "images/yes1.jpg",
      caption: "This was one of my favorite days with you 🥺"
    },
    {
      src: "images/yes2.jpg",
      caption: "You look so beautiful here it actually hurts 😭"
    },
    {
      src: "images/yes3.jpg",
      caption: "I still smile every time I think about this moment 💘"
    }
  ]
};

/* -----------------------------
   RENDER
----------------------------- */

function renderScreen(screen, isYes = false) {

  questionEl.textContent = screen.question;
  imageContainer.innerHTML = "";

  // reset yes-only UI
  finalBtn.style.display = "none";
  letterEl.style.display = "none";
  clickedYesImages.clear();

  screen.images.forEach((item, index) => {
    const img = document.createElement("img");
    img.className = "photo";

    if (isYes) {
      img.src = item.src;
      img.addEventListener("click", () => {
        showCaption(img, item.caption, index, screen.images.length);
      });
    } else {
      img.src = item;
    }

    imageContainer.appendChild(img);
  });
}

/* -----------------------------
   CAPTION LOGIC
----------------------------- */

function showCaption(imgEl, text, index, total) {

  if (clickedYesImages.has(index)) return;

  clickedYesImages.add(index);

  const caption = document.createElement("div");
  caption.className = "caption";
  caption.textContent = text;

  imgEl.after(caption);

  imgEl.style.outline = "3px solid #ff5fa2";

  if (clickedYesImages.size === total) {
    finalBtn.style.display = "inline-block";
  }
}

/* -----------------------------
   EVENTS
----------------------------- */

noBtn.addEventListener("click", () => {

  if (noIndex < noScreens.length) {
    renderScreen(noScreens[noIndex]);
    noIndex++;
  } else {
    renderScreen(noScreens[noScreens.length - 1]);
  }

  // grow YES button each time NO is clicked
  const scale = Math.min(1 + noIndex * 0.75);
  yesBtn.style.transform = `scale(${scale})`;

});

yesBtn.addEventListener("click", () => {

  renderScreen(yesScreen, true);

  yesBtn.style.display = "none";
  noBtn.style.display = "none";

});

finalBtn.addEventListener("click", () => {
  letterEl.style.display = "block";
  finalBtn.style.display = "none";
});

/* -----------------------------
   START
----------------------------- */

renderScreen(startScreen);
