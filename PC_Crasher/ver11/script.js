/** * FINAL PROTOCOL: "TOTAL SATURATION"
 * Target: 100% CPU, 100% RAM, 100% GPU
 */

const container = document.getElementById('swarm-container');
const memoryVoid = [];

// --- 1. CPU BURNER: Prime Number Thrashing ---
// This runs a heavy calculation every few milliseconds to keep CPU spikes at 100%
function burnCPU() {
    let primes = [];
    for (let i = 2; i < 50000; i++) {
        let isPrime = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
            if (i % j === 0) { isPrime = false; break; }
        }
        if (isPrime) primes.push(i);
    }
    console.log(`%c[CPU_BURN] Calculated ${primes.length} primes to stay warm.`, "color: orange;");
    setTimeout(burnCPU, 1); // Nearly infinite recursion
}
burnCPU();

// --- 2. GPU CRUSHER: Multi-Light 3D Chaos ---
function spawnGPUStresser() {
    const el = document.createElement('div');
    el.style.cssText = `
        position: absolute; width: 200px; height: 200px;
        background: radial-gradient(circle, rgba(255,0,255,1) 0%, rgba(0,255,255,0) 70%);
        box-shadow: 0 0 150px 50px white; mix-blend-mode: color-dodge;
        top: 50%; left: 50%; border-radius: 50%;
    `;
    container.appendChild(el);

    let r = 0;
    function orbit() {
        r += 0.05;
        el.style.transform = `
            translate(-50%, -50%) 
            rotateX(${r * 100}deg) 
            rotateY(${r * 50}deg) 
            translateZ(${Math.sin(r) * 500}px)
            scale(${1 + Math.cos(r)})
        `;
        requestAnimationFrame(orbit);
    }
    orbit();
}
// Spawn 50 of these. Each one forces the GPU to calculate transparency 
// through that 20px blur filter in the HTML.
for(let i=0; i<50; i++) spawnGPUStresser();

// --- 3. RAM ANNIHILATOR: The Blob ---
setInterval(() => {
    // Creating massive, useless data structures
    const data = {
        id: Math.random(),
        payload: new Array(500000).fill("CHAOS_MAXIMIZED").join("-"),
        timestamp: Date.now()
    };
    memoryVoid.push(data);
    
    // We stop shifting at 11.8GB to see if we can trigger the OS swap file
    if (memoryVoid.length > 200) {
        console.warn("⚠️ RAM_CRITICAL: Reached swap-threshold.");
    }
}, 100);

// --- 4. CONSOLE RECURSION ---
setInterval(() => {
    console.group("%c 💀 SYSTEM DESTRUCTION LOG 💀 ", "font-size: 20px; background: red; color: white;");
    console.dir({
        status: "FAILING_UPWARD",
        gpu_temp: "PROBABLY_HOT",
        boredom: "0.0000000001%",
        advice: "DO_NOT_TOUCH_THE_MOUSE"
    });
    console.groupEnd();
}, 500);

// --- 5. THE ULTIMATE "STUNNING" VISUAL: Screen Inverter ---
setInterval(() => {
    document.body.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${Math.random() * 200}%)`;
    document.title = "!!! " + (Math.random() * 999).toFixed(0) + " % !!!";
}, 50);

console.log("%c ☢️ GOOD LUCK TO YOUR POWER SUPPLY ☢️ ", "font-size: 50px; font-weight: bold;");