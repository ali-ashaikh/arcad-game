//Initial speed of the game
let speed = 150;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505){
        this.x += speed * dt;    
    }

    // if the enemies go off the screen return them back
    else if (this.x > 500){
        this.x = - (Math.random()*1000);
        this.update(dt);
    }

    // when collision happens reset the player position
    if (this.x < player.x + 50 &&
        this.x > player.x - 50 &&
        this.y < player.y + 50 &&
        this.y > player.y - 50) {
        
        player.reset();
    }


    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};


//Update the game when the player wins
Player.prototype.update = function() {

    if (player.y <= -20){
        alert('YOU WON, PLEASE PLAY AGAIN WITH FASTER MOVEMENT');
        speed += 50;
        player.reset();

    }
};

//Draw the player in the Canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//reset the player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};


//Interact with user input by updating the position of the player
//taking in consideration that the player does NOT go off screen
Player.prototype.handleInput = function(key) {
    if(key == 'up' && this.y > -10) {
        this.y -= 50;
    }
    if(key == 'down' && this.y < 450) {
        this.y += 50;
    }
    if(key == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(key == 'right' && this.x < 400) {
        this.x += 50;
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy(-Math.random()*1000, 100);
let enemy2 = new Enemy(-Math.random()*1000, 130);
let enemy3 = new Enemy(-Math.random()*1000, 160);
let enemy4 = new Enemy(-Math.random()*1000, 190);
let enemy5 = new Enemy(-Math.random()*1000, 210);

let player = new Player();

let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



