console.log("INFO: js started");
console.log("INFO: started building page");
const root = document.getElementById('root');
const header = document.createElement('h1');
header.textContent = "Welcome to my JS-generated site!";
const paragraph = document.createElement('p');
paragraph.textContent = "Every element you see here was created by script.js.";
root.appendChild(header);
root.appendChild(paragraph);