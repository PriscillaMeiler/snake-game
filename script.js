let game;
let mode;

let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [{
    x: 8 * box,
    y: 8 * box
}];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
let points = 0;


function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function snakeCreate() {
    for(i=0; i< snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); 
}
function eatFood() {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;

    points += 10;
}

document.addEventListener('keydown', moveSnake);

function moveSnake(event) {
    // Movement using arrow keys or WASD
    if((event.keyCode == 37 && direction != "right") || (event.keyCode == 65 && direction != "right")) { direction = "left"; }
    if((event.keyCode == 38 && direction != "down") || (event.keyCode == 87 && direction != "down")) { direction = "up"; }
    if((event.keyCode == 39 && direction != "left") || (event.keyCode == 68 && direction != "left")) { direction = "right"; }
    if((event.keyCode == 40 && direction != "up") || (event.keyCode == 83 && direction != "up")) { direction = "down"; }
}

function gameInit() {
    if(mode == "hard") {
        if((snake[0].x > 15 * box && direction == "right") || (snake[0].x < 0 * box && direction == "left") || (snake[0].y > 15 * box && direction == "down") || (snake[0].y < 0 && direction == "up")) {
            document.getElementById('gameover').classList.remove('hide');
            clearInterval(game);
        }
    }
    else {
        if(snake[0].x > 15 * box && direction == "right") {
            snake[0].x = 0;
        }
        if(snake[0].x < 0 * box && direction == "left") {
            snake[0].x = 16 * box;
        }
        if(snake[0].y > 15 * box && direction == "down") {
            snake[0].y = 0;
        }
        if(snake[0].y < 0 && direction == "up") {
            snake[0].y = 16 * box;;
        }
    }

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            document.getElementById('gameover').classList.remove('hide');
            clearInterval(game);
        }
    }

    createBG();
    snakeCreate();
    drawFood()

    //Snake Movement
    let snakePosX = snake[0].x;
    let snakePosY = snake[0].y;
    
    if(direction == "right") snakePosX += box;
    if(direction == "down") snakePosY += box;
    if(direction == "left") snakePosX -= box;
    if(direction == "up") snakePosY -= box;

    // Food Functioning
    if(snakePosX != food.x || snakePosY != food.y) {
        snake.pop();
    } else {
        eatFood();
    }
    
    //Snake Growth
    let newHead = {
        x: snakePosX,
        y: snakePosY
    }
    snake.unshift(newHead);

    document.getElementById("points").innerHTML = "Pontuação: " + points;
}

function startGame() {   
    mode = document.getElementById("mode").value;
    console.log(mode);
    if(mode == "hard") {
        game = setInterval(gameInit, 100);
    }
    else {
        game = setInterval(gameInit, 200);
    }

    document.getElementById('intro').classList.add('hide');
}