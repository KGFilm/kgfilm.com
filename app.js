const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});


/*---------------------------------------- */

const totalCircles = 10; // Total number of circles for each skill
const xpPercentages = {
  xpBarF1: 80, // Example XP for each Graphic Design skill
  xpBarF2: 70,
  xpBarF3: 90,
  xpBarF4: 50,
  xpBarF5: 60,
  xpBarS1: 85, // Example XP for Video Creation skills
  xpBarS2: 75,
  xpBarS3: 95,
  xpBarS4: 65,
  xpBarS5: 80,
  xpBarT1: 60, // Example XP for Illustration skills
  xpBarT2: 70,
  xpBarT3: 80,
  xpBarT4: 60,
  xpBarT5: 85
};

// Function to calculate and fill circles
function fillXPBars() {
  Object.keys(xpPercentages).forEach((xpBarId) => {
    const xpPercentage = xpPercentages[xpBarId];
    const filledCircles = Math.round((xpPercentage / 100) * totalCircles);

    const xpBar = document.getElementById(xpBarId);

    // Create circles dynamically
    for (let i = 0; i < totalCircles; i++) {
      const circle = document.createElement('div');
      circle.classList.add('circle');

      if (i < filledCircles) {
        circle.classList.add('filled');
      }

      xpBar.appendChild(circle);
    }
  });
}

// Call the function to fill the XP bars
fillXPBars();


// Image Slider//

// Define image sets for each button
const imageSets = {

  visualDesign: ['image1.jpg','image2.jpg','image3.jpg','image1.jpg','image2.jpg','image3.jpg','image1.jpg','image2.jpg','image3.jpg'],
  posterDesign: ['poster1.jpg', 'poster2.jpg', 'poster3.jpg'],
  commercialDesign: ['commercial1.jpg', 'commercial2.jpg', 'commercial3.jpg'],
  infographDesign: ['infograph1.jpg', 'infograph2.jpg', 'infograph3.jpg']
};

// Elements
const sliderContainer = document.getElementById('slider');
const imageSlider = document.getElementById('image-slider');
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-image");
const closeSliderBtn = document.getElementById("close-slider");
const prevModalBtn = document.getElementById('prev-modal-btn');
const nextModalBtn = document.getElementById('next-modal-btn');

// Function to load images into slider dynamically
function loadImages(imageArray) {
  sliderContainer.innerHTML = '';  // Clear the slider first
  imageArray.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Image ${index}`;
      img.classList.add('slider-image');
      img.setAttribute('data-index', index);
      img.addEventListener('click', openModal);  // Add event listener to open modal
      sliderContainer.appendChild(img);
  });
  imageSlider.style.display = 'flex';  // Show the slider
}

// Button click event listeners to load different image sets
document.getElementById("my-visual-btn").addEventListener("click", () => {
  loadImages(imageSets.visualDesign);
});

document.getElementById("my-poster-design").addEventListener("click", () => {
  loadImages(imageSets.posterDesign);
});

document.getElementById("my-commercial-design").addEventListener("click", () => {
  loadImages(imageSets.commercialDesign);
});

document.getElementById("my-infograph-design").addEventListener("click", () => {
  loadImages(imageSets.infographDesign);
});

// Close slider functionality
closeSliderBtn.addEventListener("click", () => {
  imageSlider.style.display = "none";  // Hide the slider
});

// Modal functionality for viewing images
let currentImageIndex = 0;
function openModal(e) {
  currentImageIndex = parseInt(e.target.getAttribute('data-index'));
  modalImg.src = e.target.src;
  modal.style.display = "flex";  // Show modal
}

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
      modal.style.display = "none";  // Hide modal
  }
});

// Modal navigation (Previous/Next)
prevModalBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + sliderContainer.children.length) % sliderContainer.children.length;
  modalImg.src = sliderContainer.children[currentImageIndex].src;
});

nextModalBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % sliderContainer.children.length;
  modalImg.src = sliderContainer.children[currentImageIndex].src;
});

// Dragging functionality for the slider
let isDown = false;
let startX;
let scrollLeft;

sliderContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - sliderContainer.offsetLeft;
  scrollLeft = sliderContainer.scrollLeft;
});

sliderContainer.addEventListener('mouseleave', () => {
  isDown = false;
});

sliderContainer.addEventListener('mouseup', () => {
  isDown = false;
});

sliderContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - sliderContainer.offsetLeft;
  const walk = (x - startX) * 1.5;  // Adjust scrolling speed
  sliderContainer.scrollLeft = scrollLeft - walk;
});

// End Image Slider//

