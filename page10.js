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
    backButton.classList.toggle('hidden');
});

closeButton.addEventListener('click', function () {
    controlBox.classList.toggle('hidden');
    toggleButton.classList.toggle('hidden');
    backButton.classList.toggle('hidden');
});

const pickr1 = Pickr.create({
    el: '#color-picker-1',
    theme: 'monolith',
    default: '#0088ff',
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
        '#000000', // Black
    ],
    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        comparison: false,
        // Input / output options
        interaction: {
            hex: true,
            input: true,
        },
    },
});

// Text Color 1 handler
pickr1.on('change', (color) => {
    const hexColor = color.toHEXA().toString();
    textElement.style.color = hexColor;
    pickr1.setColor(hexColor);
});

// For Special Char Color Picker
const pickr2 = Pickr.create({
    el: '#color-picker-2',
    theme: 'monolith',
    default: '#ff27e9',
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

// Special Char Color handler
pickr2.on('change', (color) => {
    const hexColor = color.toHEXA().toString();
    const specialCharElements = document.querySelectorAll('.special-char');
    specialCharElements.forEach(element => {
        element.style.color = hexColor;
    });
    pickr2.setColor(hexColor);
});


// For Background Color Picker
const bgPickr = Pickr.create({
    el: '#bg-color-picker',
    theme: 'monolith',
    default: '#fffdf2',
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

// Change font family
const fontFamilyInput = document.getElementById('font-family');
fontFamilyInput.addEventListener('change', function () {
    textElement.style.fontFamily = this.value;
});

// Audio Functionality
const playFlickerButton = document.getElementById('play-flicker-audio');
const vinylCrackAudio = document.getElementById('vinyl-crack-audio');
let isPlaying = false;  // Track play/pause state

playFlickerButton.addEventListener('click', function () {
    if (!isPlaying) {
        vinylCrackAudio.play();
        playFlickerButton.textContent = '🔇'; // Change icon to indicate pause option
    } else {
        vinylCrackAudio.pause();
        playFlickerButton.textContent = '🔈'; // Change icon back to play
    }
    isPlaying = !isPlaying;  // Toggle the play state
});

// Ensure the audio resets when paused or ends
vinylCrackAudio.addEventListener('pause', () => isPlaying = false);
vinylCrackAudio.addEventListener('ended', () => isPlaying = false);


// Reset button functionality
document.getElementById('reset-button').addEventListener('click', function () {
    textElement.innerHTML = originalTextContent;
    textElement.style = '';
    updateGrain(0.5);  // Reset to 0.5
    grainControl.value = 0.5; // Also reset the slider to 0.5 if it's a range input

    const specialCharElements = document.querySelectorAll('.special-char');
    specialCharElements.forEach(function (element) {
        element.style.color = '#ff27e9'; // Reset to original color
    });

    // Reset Pickr colors and inputs
    pickr1.setColor('#0088ff');
    pickr2.setColor('#ff27e9');
    bgPickr.setColor('#fffdf2');

    // Reset dropdown to the first selection
    fontFamilyInput.selectedIndex = 0; // Reset dropdown to first option

    // Reset range inputs
    document.getElementById('size').value = '10';  // Reset font size
    document.getElementById('brightness').value = '1';  // Reset brightness
    document.getElementById('contrast').value = '1';  // Reset contrast

    document.getElementById('color').value = '#0088ff';
    document.getElementById('special-char-color').value = '#ff27e9';
    document.getElementById('bg-color').value = '#fffdf2';
    document.getElementById('size').value = '10';
    document.getElementById('brightness').value = '1';
    document.getElementById('contrast').value = '1';
});

// Printing Function
const printButton = document.getElementById('print-button');

printButton.addEventListener('click', function () {
    window.print();
});

// Next button functionality to animate and load next page
const nextButton = document.getElementById('next-button');
const container = document.querySelector('.container');

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    // Check if we're coming from page 11 
    if (document.referrer.includes('page11.html')) {
        container.classList.add('slide-in-left');
    } else {
        container.classList.add('slide-in');
    }
});

nextButton.addEventListener('click', function () {
    container.classList.add('slide-out-left');
    // Wait animation to complete before navigating to the next page
    setTimeout(function () {
        window.location.href = 'page11.html';
    });
});

// Back button functionality to animate and load back page
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function () {
    container.classList.add('slide-out');  // Apply slide-out animation
    // Wait animation to complete before navigating to the next page
    setTimeout(function () {
        window.location.href = 'page9.html';
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