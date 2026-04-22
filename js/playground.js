// ============ Playground Tools ============

// ========== Binary Converter ==========
function updateBinaryConverter() {
    const input = document.getElementById('decimalInput');
    const binaryResult = document.getElementById('binaryResult');
    const hexResult = document.getElementById('hexResult');
    const visualizer = document.getElementById('bitVisualizer');
    
    if (!input) return;
    
    let val = parseInt(input.value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 255) val = 255;
    
    const binary = val.toString(2).padStart(8, '0');
    const hex = val.toString(16).toUpperCase();
    
    binaryResult.textContent = binary;
    hexResult.textContent = '0x' + hex;
    
    // Visualizer
    visualizer.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const bit = document.createElement('div');
        bit.className = 'bit ' + (binary[i] === '1' ? 'on' : 'off');
        bit.textContent = binary[i];
        bit.title = `Position value: ${Math.pow(2, 7-i)}`;
        setTimeout(() => {
            visualizer.appendChild(bit);
        }, i * 30);
    }
}

// ========== Logic Gate Simulator ==========
let currentGate = 'AND';
const gateStates = { A: 0, B: 0 };

function computeGate() {
    const a = gateStates.A;
    const b = gateStates.B;
    let result = 0;
    
    switch(currentGate) {
        case 'AND': result = (a && b) ? 1 : 0; break;
        case 'OR': result = (a || b) ? 1 : 0; break;
        case 'XOR': result = (a !== b) ? 1 : 0; break;
        case 'NOT': result = a ? 0 : 1; break;
    }
    
    const output = document.getElementById('gateOutput');
    if (output) {
        output.querySelector('span').textContent = result;
        if (result === 1) {
            output.classList.add('on');
        } else {
            output.classList.remove('on');
        }
    }
}

function initLogicGate() {
    const gateBtns = document.querySelectorAll('.gate-btn');
    const switches = document.querySelectorAll('.input-switch .switch');
    const inputB = document.getElementById('inputB');
    
    gateBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gateBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGate = btn.dataset.gate;
            
            // Hide input B for NOT
            if (inputB) {
                inputB.style.opacity = currentGate === 'NOT' ? '0.3' : '1';
                inputB.style.pointerEvents = currentGate === 'NOT' ? 'none' : 'auto';
            }
            
            computeGate();
        });
    });
    
    switches.forEach(sw => {
        sw.addEventListener('click', () => {
            const parent = sw.closest('.input-switch');
            const key = parent.id === 'inputA' ? 'A' : 'B';
            const newVal = gateStates[key] === 1 ? 0 : 1;
            gateStates[key] = newVal;
            sw.dataset.value = newVal;
            sw.textContent = newVal;
            computeGate();
        });
    });
    
    computeGate();
}

// ========== Text to Binary ==========
function updateTextToBinary() {
    const input = document.getElementById('textInput');
    const output = document.getElementById('binaryOutput');
    if (!input || !output) return;
    
    const text = input.value;
    if (!text) {
        output.innerHTML = '<em style="color:#666;">Type something above...</em>';
        return;
    }
    
    const binary = text.split('').map(char => {
        const code = char.charCodeAt(0);
        const bin = code.toString(2).padStart(8, '0');
        return `<span title="${char} = ${code}">${bin}</span>`;
    }).join(' ');
    
    output.innerHTML = binary;
}

// ========== RGB Color Mixer ==========
function updateColor() {
    const r = document.getElementById('redSlider');
    const g = document.getElementById('greenSlider');
    const b = document.getElementById('blueSlider');
    const preview = document.getElementById('colorPreview');
    const hexDisplay = document.getElementById('hexColor');
    
    if (!r || !g || !b) return;
    
    const rVal = r.value;
    const gVal = g.value;
    const bVal = b.value;
    
    document.getElementById('redVal').textContent = rVal;
    document.getElementById('greenVal').textContent = gVal;
    document.getElementById('blueVal').textContent = bVal;
    
    const color = `rgb(${rVal}, ${gVal}, ${bVal})`;
    preview.style.background = color;
    
    const hex = '#' + [rVal, gVal, bVal].map(x => 
        parseInt(x).toString(16).padStart(2, '0').toUpperCase()
    ).join('');
    hexDisplay.textContent = hex;
}

// ========== Init all playground tools ==========
document.addEventListener('DOMContentLoaded', () => {
    // Binary converter
    const decimalInput = document.getElementById('decimalInput');
    if (decimalInput) {
        decimalInput.addEventListener('input', updateBinaryConverter);
        updateBinaryConverter();
    }
    
    // Logic gate
    initLogicGate();
    
    // Text to binary
    const textInput = document.getElementById('textInput');
    if (textInput) {
        textInput.addEventListener('input', updateTextToBinary);
        updateTextToBinary();
    }
    
    // RGB sliders
    ['redSlider', 'greenSlider', 'blueSlider'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateColor);
    });
    updateColor();
});
