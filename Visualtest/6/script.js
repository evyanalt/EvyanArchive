const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables that dictate the tree's shape
let angle = 15; 
const maxDepth = 10; 

// Make it interactive with the mouse!
window.addEventListener('mousemove', (e) => {
    // Map mouse X position to an angle between 0 and 90 degrees
    angle = (e.clientX / window.innerWidth) * 90;
    
    // Redraw the tree every time the mouse moves
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBranch(canvas.width / 2, canvas.height - 20, 150, 0, maxDepth, 15);
});

// The Recursive Function
function drawBranch(x, y, length, currentAngle, depth, branchWidth) {
    ctx.beginPath();
    ctx.save();
    
    // Dynamic coloring based on depth to simulate leaves/wood
    ctx.strokeStyle = `hsl(${depth * 25 + 100}, 80%, 60%)`;
    ctx.lineWidth = branchWidth;
    ctx.lineCap = 'round';
    
    // Move to the starting point and rotate
    ctx.translate(x, y);
    ctx.rotate(currentAngle * Math.PI / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();

    // The stopping condition: if depth is 0, stop branching
    if (depth === 0) {
        ctx.restore();
        return;
    }

    // Shrink the branches for the next iteration
    const newLength = length * 0.75;
    const newWidth = branchWidth * 0.7;

    // Recursively call drawBranch for the Right and Left branches
    drawBranch(0, -length, newLength, angle, depth - 1, newWidth); // Right
    drawBranch(0, -length, newLength, -angle, depth - 1, newWidth); // Left

    ctx.restore();
}

// Initial draw before any mouse movement
drawBranch(canvas.width / 2, canvas.height - 20, 150, 0, maxDepth, 15);

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBranch(canvas.width / 2, canvas.height - 20, 150, 0, maxDepth, 15);
});