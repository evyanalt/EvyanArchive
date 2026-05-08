// A helper function to "wait" so the logs don't happen all at once
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function buildSite() {
    console.log("🚀 System: Initialization started...");
    const root = document.getElementById('root');
    
    await wait(800);
    console.log("🔍 System: Root container located. Preparing to inject DOM...");

    // Create a Header
    const header = document.createElement('h1');
    header.textContent = "JavaScript is in Control";
    root.appendChild(header);
    console.log("✅ Success: <h1> injected into the DOM.");

    await wait(1000);

    // Create a Status Box
    const statusBox = document.createElement('div');
    statusBox.style.marginTop = "20px";
    statusBox.innerHTML = "<p>Current Status: <span style='color: gold;'>Building...</span></p>";
    root.appendChild(statusBox);
    console.log("✅ Success: Status tracker added.");

    await wait(1200);

    // Create a Button
    const btn = document.createElement('button');
    btn.textContent = "Click for Console Chaos";
    btn.style.padding = "10px 20px";
    btn.style.cursor = "pointer";
    
    // Add logic to the button
    btn.onclick = () => {
        console.warn("⚠️ Warning: You clicked the button! Generating spam...");
        for(let i = 1; i <= 5; i++) {
            console.log(`  > Chaos log #${i}: Everything is working perfectly.`);
        }
    };
    
    root.appendChild(btn);
    console.log("✅ Success: Interactive button rendered.");

    await wait(500);
    
    // Final touch
    statusBox.innerHTML = "<p>Current Status: <span style='color: #00ff00;'>Live & Operational</span></p>";
    console.log("🎉 System: Site build complete! Have fun clicking things.");
}

// Start the build
buildSite();