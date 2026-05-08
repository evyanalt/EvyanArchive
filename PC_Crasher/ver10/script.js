/** * FINAL OBJECTIVE: 100% / 100% / 100% 
 * Current Status: Chat Lagging (Success)
 */

const swarm = document.getElementById('gpu-swarm');
const memoryAnchor = [];

// 1. THE GPU TORTURE: VOLUMETRIC BLIZZARD
function spawnLightOrb() {
    const orb = document.createElement('div');
    orb.className = 'volumetric';
    
    // Set initial 3D position
    let z = Math.random() * -2000;
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    
    orb.style.left = x + 'px';
    orb.style.top = y + 'px';

    swarm.appendChild(orb);

    // High-frequency vibration + 3D movement
    let frame = 0;
    const animate = () => {
        frame++;
        z += 10;
        if (z > 1000) z = -2000;
        
        // This line is the "Stunning Visual" part
        orb.style.transform = `translateZ(${z}px) rotateX(${frame}deg) translate(${Math.sin(frame/10)*50}px)`;
        
        // Randomly change colors to force the GPU to update texture caches
        if(frame % 10 === 0) {
            orb.style.boxShadow = `0 0 100px 20px hsl(${Math.random()*360}, 100%, 50%)`;
        }
        
        requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
}

// Spawn 100 orbs (each has 3 massive box-shadows = 300 heavy GPU layers)
for(let i=0; i<100; i++) {
    spawnLightOrb();
}

// 2. THE RAM STABILIZER (Pushing back to 11.9GB)
setInterval(() => {
    // Creating "Heavy Objects" to fill the 1GB Firefox just reclaimed
    const blob = new Array(1000000).fill("💀").join("");
    memoryAnchor.push(blob);
    if(memoryAnchor.length > 50) memoryAnchor.shift();
}, 200);

// 3. THE CONSOLE "WORM"
let worm = "";
setInterval(() => {
    worm += Math.random() > 0.5 ? "▓" : "░";
    if(worm.length > 50) worm = "";
    console.log(`%c${worm} SYSTEM_CORE_REACHED: ${performance.now().toFixed(0)}ms`, "color: lime; font-weight: bold; background: black;");
    
    // Add a fake "Low Power" warning
    if(Math.random() > 0.99) {
        console.error("CRITICAL: POWER_SUPPLY_CRYING");
    }
}, 50);

// 4. THE TITLE OVERLOAD
setInterval(() => {
    const icons = ["🔋", "🪫", "🔥", "❄️", "⚠️"];
    document.title = icons[Math.floor(Math.random()*icons.length)].repeat(10);
}, 100);

// 5. THE MOUSE RECURSION (Drag chaos)
window.addEventListener('mousemove', (e) => {
    // Every time you move the mouse, we force the CPU to do more work
    const ghost = document.createElement('div');
    ghost.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; color:red; z-index:9999;`;
    ghost.innerText = "LAG";
    document.body.appendChild(ghost);
    setTimeout(() => ghost.remove(), 100);
});