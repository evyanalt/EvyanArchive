/** * PROTOCOL: SHADER_THROTTLE_BYPASS
 * Target: Direct GPU Shader Execution
 */

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    alert("WebGL not supported - Your browser already gave up.");
}

// This code runs directly on the GPU cores. 
// It calculates complex sine-wave interference for every pixel.
const fragmentSource = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float color = 0.0;
        // High-intensity mathematical interference loop
        for(float i = 0.0; i < 100.0; i++) {
            color += sin(uv.x * i + u_time) + cos(uv.y * i - u_time);
        }
        gl_FragColor = vec4(vec3(sin(color), cos(color), tan(color)), 1.0);
    }
`;

// Standard WebGL Boilerplate to get the program running
const vertexSource = `attribute vec4 position; void main() { gl_Position = position; }`;
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

const program = gl.createProgram();
gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexSource));
gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentSource));
gl.linkProgram(program);
gl.useProgram(program);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

const posLoc = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(posLoc);
gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

const timeLoc = gl.getUniformLocation(program, "u_time");
const resLoc = gl.getUniformLocation(program, "u_resolution");

// --- RAM SATURATOR (The "Invisible" Method) ---
// Instead of one big array, we use many small ones to stay under the "Kill" radar
const stealthRam = [];
setInterval(() => {
    if(stealthRam.length < 2000) {
        stealthRam.push(new Float64Array(100000).map(() => Math.random()));
    }
}, 10);

function render(time) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    gl.uniform1f(timeLoc, time * 0.005);
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

console.log("%c 🚀 GPU SHADER TUNNEL ACTIVE", "color: cyan; font-weight: bold; font-size: 20px;");