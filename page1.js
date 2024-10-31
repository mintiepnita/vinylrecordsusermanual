const textElement = document.querySelector('.text');
const specialCharElements = document.querySelectorAll('.special-char');
const colorInput = document.getElementById('color');
const specialCharColorInput = document.getElementById('special-char-color');
const bgColorInput = document.getElementById('bg-color');
const sizeInput = document.getElementById('size');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const charsetInput = document.getElementById('charset');
const controlBox = document.getElementById('control-box');
const toggleButton = document.getElementById('toggle-button');
const closeButton = document.getElementById('close-button');

// Store original text content for reset
const originalTextContent = textElement.innerHTML;

// Make the text editable
textElement.setAttribute('contenteditable', 'true');

// Open/Close control box
toggleButton.addEventListener('click', function () {
  controlBox.classList.toggle('hidden');
  toggleButton.classList.toggle('hidden');
});

closeButton.addEventListener('click', function () {
  controlBox.classList.toggle('hidden');
  toggleButton.classList.toggle('hidden');
});

// For Background Color Picker
const bgPickr = Pickr.create({
  el: '#bg-color-picker',
  theme: 'monolith',
  default: '#7E43D6',
  swatches: [
    '#ff27e9', // Fluorescent Pink
    '#ff8e91', // Coral
    '#ff7477', // Fluorescent Orange
    '#ff4c65', // Fluorescent Red
    '#f65058', // Scarlet
    '#ff665e', // Red
    '#ff6d2f', // Orange
    '#ffb411', // Sunflower
    '#ffea00', // Yellow
    '#e3ed55', // Light Lime
    '#67b346', // Kelly Green
    '#62c2b0', // SeaFoam
    '#62a8e5', // Cornflower
    '#0088ff', // Cyan
    '#0079bf', // Blue
    '#bc76cf', // Orchid
    '#9d7ad2', // Violet
    '#765ba7', // Purple
    '#845991', // Plum
    '#bb8a41', // Flat Gold
    '#ac936e', // Metallic Gold
  ],
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      input: true,
    },
  },
});

// Background Color handler
bgPickr.on('change', (color) => {
  const hexColor = color.toHEXA().toString();
  textElement.style.backgroundColor = hexColor;
  bgPickr.setColor(hexColor);
});

// Gradient Function
const bgAnimationInput = document.getElementById('bg-animation');

bgAnimationInput.addEventListener('change', function () {
  if (this.checked) {
    textElement.classList.add('gradient');
  } else {
    textElement.classList.remove('gradient');
  }
});

// Font size handler
sizeInput.addEventListener('input', function () {
  textElement.style.fontSize = this.value + 'vh';
});

// Brightness and contrast handlers
brightnessInput.addEventListener('input', function () {
  textElement.style.filter = `brightness(${this.value}) contrast(${contrastInput.value})`;
});

contrastInput.addEventListener('input', function () {
  textElement.style.filter = `brightness(${brightnessInput.value}) contrast(${this.value})`;
});

// Charset Input
charsetInput.addEventListener('change', function () {
  let textContent = textElement.textContent;

  if (this.value === 'change-to-cd') {
    textElement.textContent = textContent.replace(/💿/g, '💽💽').replace(/🎵/g, '🎶🎶');
  } else if (this.value === 'original') {
    textElement.textContent = textContent.replace(/💽💽/g, '💿').replace(/🎶🎶/g, '🎵');
  }
});

// Reset button functionality
document.getElementById('reset-button').addEventListener('click', function () {
  textElement.innerHTML = originalTextContent;
  textElement.style = '';
  updateGrain(0.5);  // Reset to 0.5
  grainControl.value = 0.5; // Also reset the slider to 0.5 if it's a range input

  const specialCharElements = document.querySelectorAll('.special-char');
  specialCharElements.forEach(function (element) {
    element.style.color = '#0088ff'; // Reset to original color
  });

  // Reset Pickr colors and inputs
  bgPickr.setColor('#7E43D6');

  // Reset dropdown to the first selection
  charsetInput.selectedIndex = 0; // Reset dropdown to first option

  // Reset Gradient Checkbox
  bgAnimationInput.checked = false;
  // Remove the gradient animation
  textElement.classList.remove('gradient');

  // Reset range inputs
  document.getElementById('size').value = '10';  // Reset font size
  document.getElementById('brightness').value = '1';  // Reset brightness
  document.getElementById('contrast').value = '1';  // Reset contrast
  document.getElementById('size').value = '10';
  document.getElementById('brightness').value = '1';
  document.getElementById('contrast').value = '1';
});

// Printing Function
const printButton = document.getElementById('print-button');

printButton.addEventListener('click', function () {
  window.print();
});

//Slide-in Animation
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  container.classList.add('slide-in')
});

// Next button functionality to animate and load next page
const nextButton = document.getElementById('next-button');
const container = document.querySelector('.container');
nextButton.addEventListener('click', function () {
  container.classList.add('slide-out');

  // Wait to complete before navigating to the next page
  setTimeout(function () {
    window.location.href = 'page2.html';
  });
});

// Grain control functionality
const grainControl = document.getElementById('grain');

function updateGrain(value) {
  const beforeElement = window.getComputedStyle(container, '::before');
  container.style.setProperty('--grain-opacity', value);
}
updateGrain(grainControl.value);

grainControl.addEventListener('input', (e) => {
  updateGrain(e.target.value);
  document.documentElement.style.setProperty('--grain-opacity', e.target.value);
});

const infoButton = document.getElementById('info-button');
const infoBox = document.getElementById('info-box');
const infoCloseButton = document.getElementById('info-close-button');

infoButton.addEventListener('click', function () {
  infoBox.classList.toggle('hidden');
});

infoCloseButton.addEventListener('click', function () {
  infoBox.classList.add('hidden');
});

