const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiCount = 300;
const confetti = [];

for (let i = 0; i < confettiCount; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * confettiCount,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((c, i) => {
    ctx.beginPath();
    ctx.lineWidth = c.r / 2;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 4, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 4);
    ctx.stroke();
  });

  update();
}

function update() {
  confetti.forEach((c, i) => {
    c.tiltAngle += c.tiltAngleIncremental;
    c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
    c.x += Math.sin(c.d);
    c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
