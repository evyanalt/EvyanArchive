const canvas = document.getElementById('zeroGCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Zero Gravity Config ---
const g = 0; // Gravity is gone!
const r1 = 150; 
const r2 = 150;
const m1 = 10;
const m2 = 10;

// Initial state: Give it a "kick" since gravity won't start it
let a1 = Math.PI / 2;
let a2 = Math.PI / 8;
let a1_v = 0.05; // Starting spin for arm 1
let a2_v = 0.12; // Starting spin for arm 2

let prevX2, prevY2;

// Trail canvas for persistent patterns
const trailCanvas = document.createElement('canvas');
trailCanvas.width = canvas.width;
trailCanvas.height = canvas.height;
const tCtx = trailCanvas.getContext('2d');

function draw() {
    // Physics Equations (Simplified for g = 0)
    let num1 = -m2 * r2 * a2_v * a2_v * Math.sin(a1 - a2);
    let den1 = (m1 + m2) * r1;
    let a1_a = num1 / den1;

    let num2 = r1 * a1_v * a1_v * Math.sin(a1 - a2);
    let den2 = r2;
    let a2_a = num2 / den2;

    // Center point
    let cx = canvas.width / 2;
    let cy = canvas.height / 2;

    // Calculate Coordinates
    let x1 = cx + r1 * Math.sin(a1);
    let y1 = cy + r1 * Math.cos(a1);
    let x2 = x1 + r2 * Math.sin(a2);
    let y2 = y1 + r2 * Math.cos(a2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(trailCanvas, 0, 0);

    // Draw Arms (Faintly so the focus is on the pattern)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw the Pattern
    if (prevX2) {
        // Color shifts based on the velocity of the arms
        const speed = Math.abs(a1_v + a2_v) * 1000;
        tCtx.strokeStyle = `hsla(${speed % 360}, 80%, 60%, 0.5)`;
        tCtx.lineWidth = 1.5;
        tCtx.beginPath();
        tCtx.moveTo(prevX2, prevY2);
        tCtx.lineTo(x2, y2);
        tCtx.stroke();
    }

    prevX2 = x2;
    prevY2 = y2;

    // Update Velocities and Angles
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    requestAnimationFrame(draw);
}

draw();