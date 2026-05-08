const ui = document.getElementById('ui-layer');
const canvas = document.getElementById('glitch-overlay');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const LOG_PALETTE = [
    "background: #ff0000; color: #fff; font-size: 20px;",
    "background: #0000ff; color: #00ffff;",
    "color: #0f0; text-shadow: 1px 1px #fff;",
    "background: #fff; color: #000; font-weight: 900;"
];

// --- 1. THE CONSOLE SPAMMER (Binary & Hex Dumps) ---
setInterval(() => {
    const isError = Math.random() > 0.8;
    const msg = isError ? "CRITICAL_MEMORY_LEAK" : (Math.random() * 0xFFFFFF << 0).toString(16).toUpperCase();
    
    console.log(`%c[SYS_DUMP] 0x${msg} >> ${Math.random().toString(2).slice(2, 14)}`, 
        isError ? LOG_PALETTE[0] : LOG_PALETTE[2]);
    
    if(isError) console.warn("%c REWRITING CORE LOGIC...", LOG_PALETTE[3]);
}, 100);

// --- 2. THE VISUAL GLITCH ENGINE (Canvas) ---
function drawGlitch() {
    ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < 5; i++) {
        ctx.fillStyle = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*200, 2);
    }
    requestAnimationFrame(drawGlitch);
}
drawGlitch();

// --- 3. ELEMENT FACTORY (Creating the mess) ---
function createChaosElement() {
    const el = document.createElement('div');
    el.className = 'data-stream';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 2 + 0.5) + 's';
    el.style.color = `hsl(${Math.random()*360}, 100%, 50%)`;
    el.innerText = "01100111 01101100 01101001 01110100 01100011 01101000"; // "glitch"
    
    ui.appendChild(el);
    
    // Randomly teleport the element
    setInterval(() => {
        el.style.transform = `skew(${Math.random()*40}deg) scale(${Math.random()*2})`;
    }, 500);

    // Self-destruct to save SOME ram
    setTimeout(() => el.remove(), 3000);
}
setInterval(createChaosElement, 50);

// --- 4. THE TAB & URL HIJACKER ---
let toggle = false;
setInterval(() => {
    const glitchTitles = ["SYSTEM FAILURE", "60% CPU USED", "MORE CHAOS", "--- --- ---"];
    document.title = glitchTitles[Math.floor(Math.random() * glitchTitles.length)];
    
    // Visual Shake
    document.body.style.transform = `translate(${Math.random()*5}px, ${Math.random()*5}px)`;
    
    // Fake "Inverting" effect
    if(Math.random() > 0.95) {
        document.body.style.filter = toggle ? "invert(1)" : "none";
        toggle = !toggle;
        console.error("%c COLOR_SPACE_COLLAPSE", LOG_PALETTE[1]);
    }
}, 100);

// --- 5. THE "MOUSE STALKER" ---
window.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.innerText = "⚠";
    trail.style.fontSize = "24px";
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 200);
});