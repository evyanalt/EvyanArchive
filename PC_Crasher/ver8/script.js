/** * WARNING: PHONECRASH.EXE 
 * Target: Memory Saturation & GPU Saturation
 */

const stats = document.getElementById('stats');
const memoryHog = [];

// --- 1. THE RAM EATER (Leaking 9GB -> 12GB) ---
setInterval(() => {
    // Creating massive arrays of random data to fill the heap
    const leak = new BigInt64Array(100000); 
    for(let i=0; i<leak.length; i++) leak[i] = BigInt(Math.floor(Math.random() * 1000000));
    memoryHog.push(leak);
    
    if(memoryHog.length > 500) memoryHog.shift(); // Keep it juuuust below a total crash
    stats.innerText = `RAM_PRESSURE: ${Math.random().toFixed(4)}% | OBJECTS: ${memoryHog.length}`;
}, 50);

// --- 2. THE GPU TORCH (3D CSS Transformations) ---
function create3DChaos() {
    const box = document.createElement('div');
    box.style.cssText = `
        position: absolute; width: 100px; height: 100px;
        background: linear-gradient(to right, red, magenta);
        top: 50%; left: 50%; opacity: 0.5;
        border: 2px solid white; mix-blend-mode: overlay;
    `;
    document.body.appendChild(box);

    let r = 0;
    setInterval(() => {
        r += 5;
        // Forcing Firefox to use 3D hardware acceleration
        box.style.transform = `translate(-50%, -50%) rotateX(${r}deg) rotateY(${r*1.5}deg) translateZ(${Math.sin(r/10)*200}px)`;
    }, 16);

    setTimeout(() => box.remove(), 5000);
}
setInterval(create3DChaos, 100);

// --- 3. THE CONSOLE "BLACK HOLE" ---
// Printing massive ASCII art at high speed
const frame = ["(╯°□°）╯︵ ┻━┻", "┬─┬ノ( º _ ºノ)", "ERROR", "WTF_IS_MATH"];
setInterval(() => {
    console.clear(); // This actually causes huge lag in some browsers
    console.log(`%c${frame[Math.floor(Math.random()*frame.length)]}`, "font-size: 50px; color: red;");
    console.table(new Array(20).fill({ chaos: "TOTAL", boredom: -Infinity, ram: "GONE" }));
}, 100);

// --- 4. THE BACKGROUND AUDIO GLITCH (Simulated) ---
// Since your music stopped, we'll "beep" in the console
setInterval(() => {
    console.count("SYSTEM_SCREAM_COUNT");
    if(Math.random() > 0.9) {
        document.body.style.backgroundColor = (Math.random() > 0.5) ? "#fff" : "#000";
    }
}, 10);

// --- 5. THE "SINGULARITY" (Recursive Window Spawning - FAKE) ---
// We won't actually open windows (too annoying), but we will spam the console with pop-up warnings
setInterval(() => {
    if(Math.random() > 0.95) {
        console.warn("%c [!] SYSTEM ALERT: THERMAL THROTTLING DETECTED", "background: orange; color: black; font-weight: bold;");
    }
}, 500);