// ============ Quiz System ============

const quizQuestions = [
    {
        q: "What is the smallest unit of data in a computer?",
        options: ["Byte", "Bit", "Kilobyte", "Pixel"],
        correct: 1,
        explain: "A bit is the smallest unit — either 0 or 1."
    },
    {
        q: "How many bits are in 1 byte?",
        options: ["4", "8", "16", "32"],
        correct: 1,
        explain: "1 byte = 8 bits. This is the standard size."
    },
    {
        q: "What is the decimal value of binary 1101?",
        options: ["11", "13", "15", "17"],
        correct: 1,
        explain: "1×8 + 1×4 + 0×2 + 1×1 = 13"
    },
    {
        q: "In AND gate, the output is 1 only when...",
        options: ["At least one input is 1", "Both inputs are 1", "Both inputs are 0", "Inputs are different"],
        correct: 1,
        explain: "AND gate needs BOTH inputs to be 1 to give output 1."
    },
    {
        q: "Which gate gives output 1 when inputs are different?",
        options: ["AND", "OR", "XOR", "NOT"],
        correct: 2,
        explain: "XOR (Exclusive OR) outputs 1 only when inputs differ."
    },
    {
        q: "What are the three steps of the CPU Machine Cycle?",
        options: ["Start-Run-Stop", "Fetch-Decode-Execute", "Input-Process-Output", "Read-Write-Save"],
        correct: 1,
        explain: "CPU: Fetch instruction → Decode it → Execute it. Repeat!"
    },
    {
        q: "Which is NOT a type of memory?",
        options: ["RAM", "ROM", "SSD", "CPU"],
        correct: 3,
        explain: "CPU is the processor, not memory. RAM/ROM/SSD all store data."
    },
    {
        q: "ASCII uses how many bits per character?",
        options: ["4 bits", "7 bits", "16 bits", "32 bits"],
        correct: 1,
        explain: "Standard ASCII uses 7 bits (128 characters). Extended uses 8."
    },
    {
        q: "What does OS stand for?",
        options: ["Object System", "Operating System", "Online Service", "Open Source"],
        correct: 1,
        explain: "OS = Operating System (like Windows, Linux, macOS)."
    },
    {
        q: "An algorithm is...",
        options: ["A computer brand", "Step-by-step instructions", "Only for math", "A programming language"],
        correct: 1,
        explain: "Algorithm = ordered, unambiguous steps to solve a problem."
    },
    {
        q: "Which is NOT a programming paradigm?",
        options: ["Object-Oriented", "Functional", "Declarative", "Electrical"],
        correct: 3,
        explain: "Imperative, Declarative, Functional, Object-Oriented are paradigms."
    },
    {
        q: "In RGB, how many bytes represent one pixel?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explain: "3 bytes: 1 for Red, 1 for Green, 1 for Blue."
    }
];

let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];
let answered = false;

function startQuiz() {
    // Shuffle and pick 10 questions
    selectedQuestions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    currentQuestion = 0;
    score = 0;
    answered = false;
    
    document.getElementById('totalQ').textContent = selectedQuestions.length;
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('quizCard').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= selectedQuestions.length) {
        showResult();
        return;
    }
    
    answered = false;
    const q = selectedQuestions[currentQuestion];
    document.getElementById('currentQ').textContent = currentQuestion + 1;
    document.getElementById('quizScore').textContent = score;
    
    const progressPercent = ((currentQuestion) / selectedQuestions.length) * 100;
    document.getElementById('quizProgressBar').style.width = progressPercent + '%';
    
    document.getElementById('quizQuestion').textContent = q.q;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(idx, btn));
        optionsContainer.appendChild(btn);
    });
}

function selectAnswer(idx, btn) {
    if (answered) return;
    answered = true;
    
    const q = selectedQuestions[currentQuestion];
    const allBtns = document.querySelectorAll('.quiz-option');
    
    if (idx === q.correct) {
        btn.classList.add('correct');
        score++;
        document.getElementById('quizScore').textContent = score;
    } else {
        btn.classList.add('wrong');
        allBtns[q.correct].classList.add('correct');
    }
    
    // Disable all
    allBtns.forEach(b => b.style.pointerEvents = 'none');
    
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function showResult() {
    document.getElementById('quizCard').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizProgressBar').style.width = '100%';
    
    const total = selectedQuestions.length;
    const percent = (score / total) * 100;
    
    let emoji = '🎉', title = 'Excellent!', msg = '';
    if (percent === 100) {
        emoji = '🏆'; title = 'Perfect Score!'; msg = 'You are a CS superstar!';
    } else if (percent >= 80) {
        emoji = '🌟'; title = 'Great Job!'; msg = 'You know your stuff!';
    } else if (percent >= 60) {
        emoji = '👍'; title = 'Good Effort!'; msg = 'A bit more practice and you\'ll ace it!';
    } else if (percent >= 40) {
        emoji = '📚'; title = 'Keep Learning!'; msg = 'Review the chapters and try again!';
    } else {
        emoji = '💪'; title = 'Don\'t Give Up!'; msg = 'Start with the chapters, then try again.';
    }
    
    document.getElementById('resultEmoji').textContent = emoji;
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultText').innerHTML = 
        `You scored <strong>${score} / ${total}</strong> (${Math.round(percent)}%)<br>${msg}`;
}

function restartQuiz() {
    startQuiz();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quizContainer')) {
        startQuiz();
    }
});
