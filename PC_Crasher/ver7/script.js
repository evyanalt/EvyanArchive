/** * WARNING: CHAOS LEVEL: OVER 9000 
 * CPU USAGE TARGET: 95%+ 
 */

const core = document.getElementById('core');
const ctxs = [];

// --- 1. THE CONSOLE RECURSION ---
// This prints the script's own functions back to you with random corruption
function consoleAnarchy() {
    const codeSnippet = consoleAnarchy.toString().split('');
    const corrupted = codeSnippet.map(char => Math.random() > 0.9 ? '█' : char).join('');
    console.log(`%c${corrupted}`, "color: #ff00ff; font-family: monospace; font-size: 8px;");
    setTimeout(consoleAnarchy, 50);
}
consoleAnarchy();

// --- 2. THE MULTI-LAYERED CANVAS OVERLOAD ---
// Creating 5 overlapping canvases to force GPU composition stress
for(let i = 0; i < 5; i++) {
    const c = document.createElement('canvas');
    c.style.position = 'fixed';
    c.style.top = '0'; c.style.left = '0';
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    c.style.opacity = '0.3';
    c.style.mixBlendMode = i % 2 === 0 ? 'screen' : 'exclusion';
    document.body.appendChild(c);
    ctxs.push(c.getContext('2d'));
}

function renderNoise() {
    ctxs.forEach((ctx, index) => {
        const idata = ctx.createImageData(canvas.width, canvas.height);
        const data = idata.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.random() * 255;     // R
            data[i+1] = Math.random() * 255;   // G
            data[i+2] = Math.random() * 255;   // B
            data[i+3] = 50;                    // A
        }
        ctx.putImageData(idata, 0, 0);
    });
    requestAnimationFrame(renderNoise);
}
// Un-comment the next line only if you want to reach 99% CPU instantly
// renderNoise(); 

// --- 3. THE "DOM SWARM" ---
function spawnGlitchNode() {
    const node = document.createElement('div');
    node.className = 'glitch-text';
    node.style.fontSize = Math.random() * 100 + 'px';
    node.style.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    node.style.left = Math.random() * 100 + 'vw';
    node.style.top = Math.random() * 100 + 'vh';
    node.innerText = (Math.random() * 1e10).toString(36).toUpperCase();
    
    core.appendChild(node);

    // Chaos movement
    let angle = 0;
    const drift = setInterval(() => {
        angle += 0.2;
        node.style.transform = `translate(${Math.sin(angle)*50}px, ${Math.cos(angle)*50}px) rotate(${angle*10}deg)`;
        if (Math.random() > 0.98) node.style.fontSize = Math.random() * 200 + 'px';
    }, 16);

    setTimeout(() => {
        clearInterval(drift);
        node.remove();
    }, 2000);
}

// Spawning nodes at an aggressive rate
setInterval(spawnGlitchNode, 20);

// --- 4. THE FILTER STRESSOR ---
// Changes the entire page's CSS filters every frame
setInterval(() => {
    const blur = Math.random() * 2;
    const hue = Math.random() * 360;
    const rot = (Math.random() - 0.5) * 2;
    core.style.filter = `hue-rotate(${hue}deg) blur(${blur}px) rotate(${rot}deg)`;
    
    // Randomly "break" the title
    document.title = "SYSTEM_LOAD: " + (Math.random() * 100).toFixed(2) + "%";
}, 50);

// --- 5. THE CONSOLE "MATRIX" REBOOT ---
setInterval(() => {
    console.groupCollapsed("%c ☢️ MEMORY FRAGMENTATION ☢️ ", "background: yellow; color: black;");
    for(let i=0; i<20; i++) {
        console.log(`%c ADDR_0x${(Math.random()*0xFFFFFF<<0).toString(16)} : OVERFLOW`, "color: red");
    }
    console.groupEnd();
}, 1000);