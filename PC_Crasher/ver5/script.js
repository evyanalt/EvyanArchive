const canvas = document.getElementById('canvas');
const shards = [];

const logStyles = [
    "background: #ff0055; color: white; font-weight: bold; padding: 5px;",
    "background: #00ff00; color: black; font-weight: bold; border-radius: 50%;",
    "background: #000; color: #00ffff; border: 1px solid #00ffff;",
    "font-size: 20px; text-shadow: 2px 2px #ff0000;"
];

console.log("%c ⚠️ REALITY COLLAPSE DETECTED ⚠️ ", logStyles[3]);

function spawnShard() {
    const shard = document.createElement('div');
    shard.className = 'shard';
    
    // Random chaotic content
    const fragments = ["NULL", "VOID", "010110", "UNDEFINED", "MATH=FALSE", "!!!", "404"];
    shard.innerText = fragments[Math.floor(Math.random() * fragments.length)];
    
    // Style
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    shard.style.color = color;
    shard.style.borderColor = color;
    shard.style.boxShadow = `0 0 15px ${color}`;
    
    // Position
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    shard.style.left = x + 'px';
    shard.style.top = y + 'px';

    canvas.appendChild(shard);
    
    // Store data for the physics engine
    shards.push({
        el: shard,
        x: x,
        y: y,
        speed: Math.random() * 5 + 2
    });

    console.log(`%c [SHARD_SPAWN] Entity ID: ${Math.random().toString(16).slice(2, 8)}`, logStyles[0]);
}

function updatePhysics() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = shards.length - 1; i >= 0; i--) {
        const s = shards[i];
        
        // Move toward the void
        s.x += (centerX - s.x) * 0.02;
        s.y += (centerY - s.y) * 0.02;
        
        s.el.style.left = s.x + 'px';
        s.el.style.top = s.y + 'px';
        s.el.style.transform = `rotate(${s.x}deg) scale(${s.x / centerX})`;

        // If it touches the void, delete it
        if (Math.abs(centerX - s.x) < 20 && Math.abs(centerY - s.y) < 20) {
            s.el.remove();
            shards.splice(i, 1);
            console.warn(`%c 🌑 CONSUMED BY VOID 🌑 `, logStyles[2]);
        }
    }
}

// 1. Start Spawning (Fast!)
setInterval(spawnShard, 150);

// 2. Start Physics Engine (60fps)
setInterval(updatePhysics, 16);

// 3. Chaos Conversations in Console
setInterval(() => {
    const questions = [
        "Is 1+1 really 2?",
        "Why is the background shaking?",
        "Who told you to run this script?",
        "I can see your mouse moving..."
    ];
    const answers = [
        "Irrelevant.",
        "The pixels are hungry.",
        "Error: Logic.exe not found.",
        "42."
    ];
    console.group("%c 🤖 SYSTEM ARGUMENT", "color: yellow");
    console.log(`%c Q: ${questions[Math.floor(Math.random() * questions.length)]}`, "color: white");
    console.log(`%c A: ${answers[Math.floor(Math.random() * answers.length)]}`, "color: gray");
    console.groupEnd();
}, 3000);

// 4. THE ULTIMATE TRICK: Change the title of the tab
setInterval(() => {
    const titles = ["HELP", "LOOK AT ME", "CHAOS", "01101", "💀"];
    document.title = titles[Math.floor(Math.random() * titles.length)];
}, 500);