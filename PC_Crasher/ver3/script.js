const wait = (ms) => new Promise(res => setTimeout(res, ms));

async function runTests() {
    const root = document.getElementById('root');
    const status = document.getElementById('status');

    console.log("%c 🛠️ SYSTEM BOOTING...", "color: cyan; font-weight: bold; font-size: 14px;");
    status.innerText = "Construction in progress...";

    // 1. Building the Grid
    console.group("Phase 1: Grid Construction");
    for (let i = 1; i <= 8; i++) {
        await wait(200); // Visual delay
        
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = `<strong>Node ${i}</strong><br><small>Active</small>`;
        
        // Randomize the "glow" of each node
        const color = i % 2 === 0 ? '#38bdf8' : '#fbbf24';
        cell.style.boxShadow = `0 0 10px ${color}33`;
        
        root.appendChild(cell);
        console.info(`[BUILDER] Node ${i} generated with color ${color}`);
    }
    console.groupEnd();

    await wait(500);

    // 2. Testing Logic
    console.group("Phase 2: Logic Stress Test");
    console.warn("⚠️ System Check: Scanning nodes for errors...");
    
    await wait(1000);
    
    const randomError = Math.floor(Math.random() * 8) + 1;
    console.error(`❌ Critical: Node ${randomError} reported a fake error. (Just testing your eyes!)`);
    
    const nodes = document.querySelectorAll('.cell');
    nodes[randomError - 1].style.borderColor = "#ef4444";
    nodes[randomError - 1].style.color = "#ef4444";
    
    console.groupEnd();

    // 3. Final Result
    await wait(500);
    status.innerText = "System Fully Operational";
    console.log("%c 🎉 ALL TESTS PASSED. Boredom levels reduced by 15%.", "color: #4ade80; font-weight: bold;");
}

// Kick it off
runTests();