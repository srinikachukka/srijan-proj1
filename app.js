const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color-picker');

let drawing = false;
let tool = 'pen';
let color = '#000000';

// Set initial color
colorPicker.value = color;

// Tool buttons
const penTool = document.getElementById('pen-tool');
const rectTool = document.getElementById('rect-tool');
const circleTool = document.getElementById('circle-tool');
const clearBtn = document.getElementById('clear-btn');

// Event listeners for tool buttons
penTool.addEventListener('click', () => setTool('pen'));
rectTool.addEventListener('click', () => setTool('rectangle'));
circleTool.addEventListener('click', () => setTool('circle'));
clearBtn.addEventListener('click', clearCanvas);

// Event listener for color picker
colorPicker.addEventListener('input', (e) => {
  color = e.target.value;
});

// Set the current tool
function setTool(selectedTool) {
  tool = selectedTool;
  resetCanvas();
}

// Start drawing
canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  draw(e);
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath(); // Stop drawing when mouse is released
});

// Draw while mouse is moving
canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    draw(e);
  }
});

// Function to handle drawing
function draw(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  if (tool === 'pen') {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (tool === 'rectangle') {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous shape
    ctx.fillStyle = color;
    ctx.fillRect(x - 50, y - 50, 100, 100); // Draw rectangle at mouse position
  } else if (tool === 'circle') {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous shape
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2); // Draw circle at mouse position
    ctx.fillStyle = color;
    ctx.fill();
  }
}

// Function to reset canvas
function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
