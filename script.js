// Get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas width and height
canvas.width = 500;
canvas.height = 500;

// Set the reference image source
const referenceImage = document.getElementById('reference-image');
referenceImage.src = 'reference-image.jpg';

// Define a variable to store the drawing status
let isDrawing = false;

// Add an event listener to the canvas for the mousedown event
canvas.addEventListener('mousedown', function(event) {
  isDrawing = true;
  
  // Get the current mouse position and start the path
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.beginPath();
  ctx.moveTo(x, y);
});

// Add an event listener to the canvas for the mousemove event
canvas.addEventListener('mousemove', function(event) {
  if (isDrawing) {
    // Get the current mouse position and draw a line
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(x, y);
    ctx.stroke();
  }
});

// Add an event listener to the canvas for the mouseup event
canvas.addEventListener('mouseup', function(event) {
  isDrawing = false;
});

// Add an event listener to the "Done" button
const doneButton = document.getElementById('done-button');
doneButton.addEventListener('click', function() {
  // Get the drawing data URL and display it in the reference container
  const drawingDataUrl = canvas.toDataURL();
  referenceImage.src = drawingDataUrl;
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
