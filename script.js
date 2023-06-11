// JavaScript
const imageContainer = document.querySelector(
  ".acknowledgedBy__imageContainer"
);
const images = Array.from(imageContainer.querySelectorAll("img"));
const imageWidth = images[0].getBoundingClientRect().width;

// Set the width of image container based on the number of images
imageContainer.style.width = `${imageWidth * images.length}px`;

// Calculate the total width of all images
const totalWidth = imageWidth * images.length;

// Create an invisible box to wrap the images
const invisibleBox = document.createElement("div");
invisibleBox.style.width = `${totalWidth}px`;
invisibleBox.style.height = "100%";
invisibleBox.style.overflow = "hidden";
invisibleBox.style.position = "relative";
imageContainer.appendChild(invisibleBox);

// Move the images inside the invisible box
images.forEach((image) => {
  image.style.marginRight = "1.25rem"; // Convert 20px to rem
  invisibleBox.appendChild(image);
});

// Start the animation
let translateX = 0;
let animationRequestId;

function scrollAnimation() {
  translateX -= 1;
  invisibleBox.style.transform = `translateX(${translateX}px)`;

  // Check if the first image has completely disappeared on the left
  if (Math.abs(translateX) >= imageWidth) {
    invisibleBox.style.transform = `translateX(0)`;
    const movedImage = invisibleBox.removeChild(invisibleBox.firstChild);
    invisibleBox.appendChild(movedImage);
    translateX = 0;
  }

  animationRequestId = requestAnimationFrame(scrollAnimation);
}

// Call the animation function
scrollAnimation();

// Stop the animation when the window/tab is not active
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    cancelAnimationFrame(animationRequestId);
  } else {
    scrollAnimation();
  }
});

//Adds a arrow to the navbar
// Get the navbar link
const navbarLink = document.querySelector(".header__navbar-link");

// Create the arrow element
const arrow = document.createElement("span");
arrow.classList.add("header__navbar-arrow");
navbarLink.appendChild(arrow);

// Rotate the arrow on mouseover
navbarLink.addEventListener("mouseover", () => {
  arrow.classList.add("rotate");
});

// Reset the arrow on mouseout
navbarLink.addEventListener("mouseout", () => {
  arrow.classList.remove("rotate");
});

//this is purely for the exam presentation

document.addEventListener("DOMContentLoaded", function () {
  var box = document.querySelector(".box");

  function showBox() {
    box.style.display = "block";
  }

  function hideBox() {
    box.style.display = "none";
  }

  var buttons = document.querySelectorAll(
    ".header__contact-button, .theApp__button, .ourMission__button"
  );
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", showBox);
  }

  box.addEventListener("click", function (e) {
    if (e.target === box) {
      hideBox();
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !box.contains(e.target) &&
      !buttons[0].contains(e.target) &&
      !buttons[1].contains(e.target) &&
      !buttons[2].contains(e.target)
    ) {
      hideBox();
    }
  });
});

// Fetch the JSON file
fetch("images.json")
  .then((response) => response.json())
  .then((data) => {
    const pictureSection = document.getElementById("pictureSection");

    data.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.classList.add("yourPartner__picture");

      pictureSection.appendChild(imgElement);

      console.log("Image added:", imgElement.src);
    });
  })
  .catch((error) => {
    console.log("An error occurred while fetching the JSON file:", error);
  });
