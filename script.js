// JavaScript
const imageContainer = document.querySelector(
  ".acknowledgedBy__imageContainer"
);
const images = Array.from(imageContainer.querySelectorAll("img"));
const imageWidth = images[0].getBoundingClientRect().width;
const totalWidth = imageWidth * images.length;

// Set the width of image container based on the number of images
imageContainer.style.width = `${totalWidth}px`;

// Create an invisible box to wrap the images
const invisibleBox = document.createElement("div");
invisibleBox.style.cssText = `
  width: ${totalWidth}px;
  height: 100%;
  overflow: hidden;
  position: relative;
`;
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
    invisibleBox.style.transform = "translateX(0)";
    const movedImage = invisibleBox.firstElementChild;
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

// Adds an arrow to the navbar
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

fetch("images.json")
  .then((response) => response.json())
  .then((data) => {
    const pictureSection = document.getElementById("pictureSection");
    const theAppPictureSection = document.getElementById(
      "theAppPictureSection"
    );
    const theAppPicture = document.getElementById("appImage");
    const prevPictureBtn = document.getElementById("prevPictureBtn");
    const nextPictureBtn = document.getElementById("nextPictureBtn");
    const galleryIndicators = document.querySelectorAll(
      ".theApp__gallery-indicator"
    );

    // Get only the first two images from the data
    const firstTwoImages = data.slice(0, 2);

    firstTwoImages.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.classList.add("yourPartner__picture");

      pictureSection.appendChild(imgElement);

      console.log(
        "Loaded Image goal 1 & 2 from JSON and added to pictureSection:",
        imgElement.src
      );
    });

    // Get the rest of the images starting from the third index
    const remainingImages = data.slice(2);

    let currentImageIndex = 0; // Start with the first image from the remaining images
    const totalImages = remainingImages.length;

    // Function to update the image source based on the current index
    const updateImageSource = () => {
      theAppPicture.src = remainingImages[currentImageIndex].src;
      theAppPicture.alt = remainingImages[currentImageIndex].alt;
    };

    // Function to update the active indicator
    const updateActiveIndicator = () => {
      galleryIndicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentImageIndex);
      });
    };

    // Function to show the previous image
    const showPreviousImage = () => {
      currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
      updateImageSource();
      updateActiveIndicator();

      console.log("Previous Image Index:", currentImageIndex);
      console.log("Previous Image Data:", remainingImages[currentImageIndex]);
    };

    // Function to show the next image
    const showNextImage = () => {
      currentImageIndex = (currentImageIndex + 1) % totalImages;
      updateImageSource();
      updateActiveIndicator();

      console.log("Next Image Index:", currentImageIndex);
      console.log("Next Image Data:", remainingImages[currentImageIndex]);
    };

    // Event listener for the previous picture button
    prevPictureBtn.addEventListener("click", showPreviousImage);

    // Event listener for the next picture button
    nextPictureBtn.addEventListener("click", showNextImage);

    // Set the initial image and active indicator
    updateImageSource();
    updateActiveIndicator();
  })
  .catch((error) => {
    console.log("An error occurred while fetching the JSON file:", error);
  });

// This is purely for the exam presentation

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
