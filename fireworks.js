function startFireworks() {
  let particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: Math.random() * 8 - 4,
      dy: Math.random() * 8 - 4,
      radius: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      alpha: 1
    });
  }

  const interval = setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.05;
      p.alpha -= 0.01;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = hslToRgba(p.color, p.alpha);
      ctx.fill();
    });

    particles = particles.filter(p => p.alpha > 0);

    if (particles.length === 0) clearInterval(interval);
  }, 30);
}

function hslToRgba(hsl, alpha) {
  return hsl.replace("hsl", "hsla").replace(")", `, ${alpha})`);
}
