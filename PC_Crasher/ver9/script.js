const root = document.getElementById('master-root');
const heavyData = [];

// --- 1. THE VISUAL STUNNER: NEON FRACTALS ---
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawFractalChaos() {
    // Force a full redraw of random geometric interference
    for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.8)`;
        ctx.lineWidth = Math.random() * 5;
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(canvas.width / 2, canvas.height / 2);
        ctx.stroke();
    }
    // High-speed pixel rotation
    ctx.drawImage(canvas, 2, 2, canvas.width - 4, canvas.height - 4);
    requestAnimationFrame(drawFractalChaos);
}
drawFractalChaos();

// --- 2. THE STUNNING POWER USAGE: GLASS SHARDS ---
function spawnGlass() {
    const shard = document.createElement('div');
    shard.className = 'glass-shard';
    const size = Math.random() * 300 + 100;
    shard.style.width = size + 'px';
    shard.style.height = size + 'px';
    shard.style.left = Math.random() * 100 + 'vw';
    shard.style.top = Math.random() * 100 + 'vh';
    
    root.appendChild(shard);

    // Give it a 3D orbit that forces GPU re-calculation
    let angle = 0;
    const orbit = setInterval(() => {
        angle += 0.05;
        shard.style.transform = `rotateX(${angle * 50}deg) rotateZ(${angle * 20}deg) scale(${Math.sin(angle)})`;
    }, 16);

    setTimeout(() => {
        clearInterval(orbit);
        shard.remove();
    }, 4000);
}
setInterval(spawnGlass, 150);

// --- 3. THE "MEMORY CRUSHER" ---
// We are pushing massive strings into an array to force the 12GB cap
setInterval(() => {
    try {
        const chunk = "CHAOS".repeat(100000) + Math.random();
        heavyData.push(chunk);
        
        // Keep the last 1000 massive chunks (This will easily eat 2-3GB)
        if (heavyData.length > 1000) heavyData.shift(); 
    } catch (e) {
        console.error("FATAL: RAM SATURATION REACHED. GOODBYE WORLD.");
    }
}, 100);

// --- 4. THE CONSOLE "ART" ---
setInterval(() => {
    console.group(`%c 🔥 POWER LEVEL: ${Math.floor(Math.random()*1000)}% `, "background: #000; color: #f0f; font-size: 20px;");
    console.log("%c ▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀", "color: #0ff;");
    console.warn("ADVISORY: FAN SPEED INSUFFICIENT");
    console.info("ADVISORY: BOREDOM LEVELS DEPLETED");
    console.groupEnd();
}, 200);

// --- 5. THE ULTIMATE TITLE FLICKER ---
setInterval(() => {
    const status = ["(SAFE)", "(STUNNING)", "(CRITICAL)", "(ERROR)"];
    document.title = "SYSTEM " + status[Math.floor(Math.random()*status.length)] + " " + (Math.random()*100).toFixed(0);
}, 50);

console.log("%c 👑 THE SINGULARITY HAS BEGUN. ", "font-size: 40px; color: gold; text-shadow: 5px 5px #ff0000;");