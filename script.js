// Particle Background
const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Stopwatch Logic
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    const milliseconds = Math.floor(elapsedTime % 1000 / 10);
    const seconds = Math.floor(elapsedTime / 1000 % 60);
    const minutes = Math.floor(elapsedTime / 1000 / 60);

    document.getElementById('minutes').textContent = formatTime(minutes);
    document.getElementById('seconds').textContent = formatTime(seconds);
    document.getElementById('milliseconds').textContent = formatTime(milliseconds);

    // Add digit animation
    document.querySelectorAll('.digit').forEach(digit => {
        digit.classList.add('animate');
        setTimeout(() => digit.classList.remove('animate'), 200);
    });
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        document.getElementById('startStop').textContent = 'Stop';
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('startStop').textContent = 'Start';
    }
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    isRunning = false;
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('lapList').innerHTML = '';
}

function addLap() {
    if (!isRunning) return;
    const lapTime = `${document.getElementById('minutes').textContent}:${
        document.getElementById('seconds').textContent}:${
        document.getElementById('milliseconds').textContent}`;
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.textContent = `Lap ${document.getElementById('lapList').children.length + 1}: ${lapTime}`;
    document.getElementById('lapList').prepend(lapItem);
}

// Event Listeners
document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', addLap);

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
initParticles();
animateParticles();