const root = document.getElementById('chaos-root');

// Custom console styles
const styles = {
    critical: "background: red; color: white; font-size: 16px; font-weight: bold; border: 2px solid black;",
    spawn: "background: #800080; color: #fff; padding: 2px 5px;",
    math: "background: #ffff00; color: #000; font-style: italic;"
};

console.log("%c ☢️ CHAOS ENGINE INITIALIZED ☢️ ", "font-size: 25px; color: red; text-shadow: 2px 2px black;");

function createChaos() {
    // 1. Create a random element
    const box = document.createElement('div');
    const size = Math.floor(Math.random() * 150) + 50;
    
    // Random position
    box.className = 'glitch-box';
    box.style.width = `${size}px`;
    box.style.height = `${size}px`;
    box.style.top = Math.random() * 100 + 'vh';
    box.style.left = Math.random() * 100 + 'vw';
    
    // Random colors
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.borderColor = randomColor;
    box.style.color = randomColor;
    box.innerText = "ERROR " + (Math.random() * 9999).toFixed(0);

    root.appendChild(box);

    // 2. Logging the chaos
    console.log(`%c 📥 SPANWED: Node_${Math.random().toString(36).substring(7)}`, styles.spawn);

    // 3. Fake Math logic because "math ain't mathing"
    if (Math.random() > 0.8) {
        const val1 = 5;
        const val2 = 10;
        console.log(`%c 🧮 MATH CHECK: ${val1} + ${val2} = "Watermelon"`, styles.math);
    }

    // 4. Cleanup to prevent browser explosion (Self-Destruct)
    setTimeout(() => {
        box.style.transform = "scale(0) rotate(360deg)";
        console.warn(`%c 🗑️ PURGED: Cleaning up digital debris...`, "color: orange");
        setTimeout(() => box.remove(), 500);
    }, 3000);
}

// 5. Trigger the swarm
const interval = setInterval(createChaos, 400);

// 6. Emergency Stop Switch in Console
console.log("%c Type 'stopChaos()' to save your RAM!", "color: white; background: blue; padding: 5px;");
window.stopChaos = () => {
    clearInterval(interval);
    console.log("%c 🛑 Chaos Paused. The universe rests.", styles.critical);
};

// 7. Random "Critical Warnings"
setInterval(() => {
    if(Math.random() > 0.7) {
        console.error("%c 🚨 CRITICAL: Logic levels reaching 0%! 🚨", styles.critical);
    }
}, 2000);