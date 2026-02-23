const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Player
let player = {
    x: 50,
    y: 220,
    width: 30,
    height: 50,
    dy: 0,
    gravity: 0.8,
    jumpPower: -12,
    grounded: true
};

// Obstacle
let obstacle = {
    x: 800,
    y: 240,
    width: 30,
    height: 30,
    speed: 6
};

let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && player.grounded) {
        player.dy = player.jumpPower;
        player.grounded = false;
    }
});

function update() {
    if (gameOver) return;

    // Player physics
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y >= 220) {
        player.y = 220;
        player.dy = 0;
        player.grounded = true;
    }

    // Obstacle movement
    obstacle.x -= obstacle.speed;
    if (obstacle.x < -obstacle.width) {
        obstacle.x = 800;
        score++;
    }

    // Collision
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        gameOver = true;
        alert("Game Over! Score: " + score);
        location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = "#444";
    ctx.fillRect(0, 270, 800, 30);

    // Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Obstacle
    ctx.fillStyle = "red";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Score
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
