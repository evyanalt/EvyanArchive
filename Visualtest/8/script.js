const canvas = document.getElementById('chaosCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- Math Constants ---
const g = 1; // Gravity
const r1 = 150 * (Math.PI / 3); // Arm 1 length (scaled by PI)
const r2 = 150 * (Math.PI / 3); // Arm 2 length
const m1 = 10; // Mass 1
const m2 = 10; // Mass 2

let a1 = Math.PI / 2; // Initial Angle 1
let a2 = Math.PI / 4; // Initial Angle 2
let a1_v = 0; // Angular Velocity 1
let a2_v = 0; // Angular Velocity 2

let prevX2, prevY2; // To draw the continuous trail

// Create a second canvas in memory to store the "infinite" trail
const trailCanvas = document.createElement('canvas');
trailCanvas.width = canvas.width;
trailCanvas.height = canvas.height;
const tCtx = trailCanvas.getContext('2d');

function draw() {
    // 1. The Physics Math (Accelerations)
    let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
    let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
    let num3 = -2 * Math.sin(a1 - a2) * m2;
    let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
    let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a1_a = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * Math.sin(a1 - a2);
    num2 = (a1_v * a1_v * r1 * (m1 + m2));
    num3 = g * (m1 + m2) * Math.cos(a1);
    num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
    den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
    let a2_a = (num1 * (num2 + num3 + num4)) / den;

    // 2. Update Positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the stored trails first
    ctx.drawImage(trailCanvas, 0, 0);

    let cx = canvas.width / 2;
    let cy = canvas.height / 3;

    let x1 = cx + r1 * Math.sin(a1);
    let y1 = cy + r1 * Math.cos(a1);

    let x2 = x1 + r2 * Math.sin(a2);
    let y2 = y1 + r2 * Math.cos(a2);

    // 3. Draw Arms
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 4. Draw Persistent Trail
    if (prevX2) {
        tCtx.strokeStyle = `hsl(${(a1 + a2) * 50}, 100%, 50%)`;
        tCtx.lineWidth = 1;
        tCtx.beginPath();
        tCtx.moveTo(prevX2, prevY2);
        tCtx.lineTo(x2, y2);
        tCtx.stroke();
    }

    prevX2 = x2;
    prevY2 = y2;

    // Apply acceleration and velocity
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;

    // Add a tiny bit of friction to keep it from exploding
    a1_v *= 0.999;
    a2_v *= 0.999;

    requestAnimationFrame(draw);
}

draw();