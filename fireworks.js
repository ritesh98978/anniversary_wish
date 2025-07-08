const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(100, canvas.width - 100);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.color = `hsl(${random(0, 360)}, 100%, 50%)`;
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.y -= 10;
      if (this.y <= this.targetY) {
        this.exploded = true;
        for (let i = 0; i < 30; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    this.particles.forEach(p => {
      p.update();
      p.draw();
    });
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.angle = random(0, 2 * Math.PI);
    this.speed = random(2, 5);
    this.color = color;
    this.life = 60;
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.life--;
  }

  draw() {
    if (this.life > 0) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((f, index) => {
    f.update();
    f.draw();
    if (f.exploded && f.particles.every(p => p.life <= 0)) {
      fireworks.splice(index, 1);
    }
  });
}

function startFireworks() {
  for (let i = 0; i < 5; i++) {
    fireworks.push(new Firework());
  }
}

animate();
