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
  question: "Will you be my Valentine?",
  images: [
    "images/start1.jpg",
    "images/start2.jpg"
  ]
};

const noScreens = [
  {
    question: "I think you made a mistake let's try again. Will you be my Valentine?",
    images: [
      "images/no1_1.jpg"
    ]
  },
  {
    question: "All you have to do is click the yes button... Will you be my Valentine? :<",
    images: [
      "images/no2_1.jpg"
    ]
  },
  {
    question: "I'll make this easier for you since you keep pressing the wrong one. There is only one button left. Will you be my Valentine? Please :<<",
    images: [
      "images/no3_1.jpg"
    ]
  }
];

const yesScreen = {
  question: "YAY!! Happy Valentine’s Day Arien!!! (click on the images for a surprise)",
  images: [
    {
      src: "images/yes1.jpg",
      caption: ""
    },
    {
      src: "images/yes2.jpeg",
      caption: ""
    },
    {
      src: "images/yes3.jpg",
      caption: ""
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
  const scale = Math.min(1 + noIndex * 1);
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
