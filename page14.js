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

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    // Check if we're coming from page 13 
    if (document.referrer.includes('page15.html')) {
        container.classList.add('slide-in-left');
    } else {
        container.classList.add('slide-in');
    }
});

const container = document.querySelector('.container');

// Back button functionality to animate and load back page
const backButton = document.getElementById('back-button');
backButton.addEventListener('click', function () {
    container.classList.add('slide-out');  // Apply slide-out animation
    // Wait animation to complete before navigating to the next page
    setTimeout(function () {
        window.location.href = 'page13.html';
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

// Ascii art animation
window.onload = function () {
    const video = document.getElementById('video');
    const asciiContainer = document.getElementById('ascii');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // ASCII character map based on brightness
    const asciiChars = '♫⋆｡♪ ₊˚♬ .';
    const charsLength = asciiChars.length;

    // Configure video settings
    video.width = 100; // Width of video frame (adjust for effect)
    video.height = 50; // Height of video frame (adjust for effect)
    video.playbackRate = 0.4;

    // Draw video to ASCII
    video.addEventListener('play', () => {
        canvas.width = video.width;
        canvas.height = video.height;

        function drawFrame() {
            if (video.paused || video.ended) return;

            // Draw the video frame onto the canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get pixel data from canvas
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let asciiStr = '';

            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];

                // Calculate brightness
                const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
                const charIndex = Math.floor((brightness / 255) * (charsLength - 1));

                // Add ASCII character based on brightness
                asciiStr += asciiChars[charIndex];

                // Add line breaks at the end of each row
                if ((i / 4 + 1) % canvas.width === 0) asciiStr += '\n';
            }

            // Display ASCII
            asciiContainer.textContent = asciiStr;

            // Loop the drawFrame function
            requestAnimationFrame(drawFrame);
        }

        drawFrame();
    });

    // Play video without sound
    video.play();
};