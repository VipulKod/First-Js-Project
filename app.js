let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

numberOfParticles = 100;
particlesArray = [];

function GetRandomColor() {
  var r = 0,
    g = 0,
    b = 0;
  while (r < 100 && g < 100 && b < 100) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  }

  return "rgb(" + r + "," + g + "," + b + ")";
}

let particle = function() {
  this.x = canvas.width * Math.random();
  this.y = canvas.height * Math.random();
  this.r = 6 * Math.random();
  this.dx = 4 * Math.random() ;
  this.dy = 4 * Math.random() ;
  this.color = GetRandomColor();
};

particle.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.shadowBlur = 10;
  ctx.shadowColor = this.color;
  ctx.fill();
};

particle.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;

  if (this.x < 0 || this.x > canvas.width) {
    this.dx = -this.dx;
  }
  if (this.y < 0 || this.y > canvas.height) {
    this.dy = -this.dy;
  }
};

for (var i = 0; i < numberOfParticles; i++) {
  particlesArray.push(new particle());
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < numberOfParticles; i++) {
    particlesArray[i].update();
    particlesArray[i].draw(ctx);
  }
  requestAnimationFrame(loop);
}

loop();
