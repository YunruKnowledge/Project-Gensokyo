



"use strict";

// Canvas body
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
canvas.width = canvasWidthCalculation()
canvas.height = canvasHeightCalculation()

function canvasWidthCalculation() {
    return innerWidth
    if (innerWidth > 600) return 600
}
function canvasHeightCalculation() {
    return innerHeight
    if (innerHeight > 720) return 720
}


// Player
let animationFrame_player_idle = 1;
let animationFrame_player_left = 1;
let animationFrame_player_right = 1;
class Hitbox {
    constructor(x, y, velocity) {
        this.xPosition = x;
        this.yPosition = y;
        this.velocity = velocity;
        this.circleRadius = 1;

    }
    
    draw() {
        if (gameType == 4) {
            const playerImg = new Image();
            const playerSprite_Slow = new Image();
            playerSprite_Slow.src = `TH_UFO_Player_Slow.png`;
            
            /* Movement sprite change */
            if (this.velocity.x == 0) {
                playerImg.src = `TH_HSiFS_Reimu_Idle_Frame_${animationFrame_player_idle}.png`;
                // Up and Down
                if (this.velocity.y != 0 && this.velocity.y <= 2 && this.velocity.y >= -2) {
                    canvasContext.save()
                    canvasContext.globalAlpha = 0.5;
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                    canvasContext.restore()
                }
                else if (keylistener_shift == true) {
                    canvasContext.save()
                    canvasContext.globalAlpha = 0.5;
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                    canvasContext.restore()
                }
                // Standing still
                else {
                    canvasContext.drawImage(playerImg, 
                        this.xPosition - (playerImg.width * 2) / 2, 
                        this.yPosition - (playerImg.height * 2) / 2, 
                        playerImg.width *2, 
                        playerImg.height *2)
                    }
            }
                
            // Left
            if (this.velocity.x < 0) {
                playerImg.src = `TH_HSiFS_Reimu_Left_Frame_${animationFrame_player_left}.png`;
                if (this.velocity.x < 0 && this.velocity.x >= -2) {
                    canvasContext.save()
                    canvasContext.globalAlpha = 0.5;
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                    canvasContext.restore()
                }
                else {
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                }
            }
            
            // Right
            if (this.velocity.x > 0) {
                playerImg.src = `TH_HSiFS_Reimu_Right_Frame_${animationFrame_player_right}.png`;
                if (this.velocity.x > 0 && this.velocity.x <= 2) {
                    canvasContext.save()
                    canvasContext.globalAlpha = 0.5;
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                    canvasContext.restore()
                }
                else {
                    canvasContext.drawImage(playerImg, this.xPosition - (playerImg.width * 2) / 2, this.yPosition - (playerImg.height * 2) / 2, playerImg.width *2, playerImg.height *2 )
                }
            }
            
            // Shift
            if (keylistener_shift == true) {
                canvasContext.drawImage(playerSprite_Slow, 
                    this.xPosition - (playerImg.width * 4.5) / 2, 
                    this.yPosition - (playerImg.height * 3) / 2, 
                    playerImg.width * 4.5, 
                    playerImg.height * 3)
            }
        }
        
        // Render hitbox
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius * 8, 0, Math.PI * 2, false);
        canvasContext.fillStyle = 'white';
        canvasContext.fill()
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius * 6, 0, Math.PI * 2, false);
        canvasContext.fillStyle = 'salmon';
        canvasContext.fill()
    }

    // Update the position of hitbox.
    update() {
        this.draw()
        
        if (this.yPosition + this.circleRadius + this.velocity.y >= canvas.height) {
            this.velocity.y = 0; 
        }
        if (this.yPosition - this.circleRadius + this.velocity.y <= 0) {
            this.velocity.y = 0; 
        }
        if (this.xPosition + this.circleRadius + this.velocity.x >= canvas.width) {
            this.velocity.x = 0; 
        }
        if (this.xPosition - this.circleRadius + this.velocity.x <= 0) {
            this.velocity.x = 0; 
        }
        else {
            this.xPosition += this.velocity.x;
            this.yPosition += this.velocity.y;
        }
    }
}
const playerVelocity = {x:0, y:0} 
const playerHitbox = new Hitbox(canvas.width / 2,canvas.height / 2, playerVelocity)
const playerSpriteAnimation = setInterval(() => {
    animationFrame_player_idle++;
    if (animationFrame_player_idle > 8) {
        animationFrame_player_idle = 1;
    } 
    animationFrame_player_left++;
    if (animationFrame_player_left > 8) {
        animationFrame_player_left = 5;
    } 
    animationFrame_player_right++;
    if (animationFrame_player_right > 8) {
        animationFrame_player_right = 5;
    } 
}, 75);


// Bullets
class PlayerProjectile {
    constructor(x, y, radius, color, velocity) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
        this.velocity = velocity; 
    }
    drawPlayerProjectile() {
        const playerProjectileGradient = canvasContext.createLinearGradient(0,0,0,720);
        playerProjectileGradient.addColorStop(0, 'red')
        playerProjectileGradient.addColorStop(1, this.color)
        
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = playerProjectileGradient;
        canvasContext.fill()
    }
    UpdateAnimation() {
        this.drawPlayerProjectile()
        this.xPosition = this.xPosition + this.velocity.x * 12;
        this.yPosition = this.yPosition + this.velocity.y * 12;
    }
}
let playerProjectileArray = [];


// Enemy
class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
        this.velocity = velocity; 
    }
    drawEnemy() {
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill()
    }
    UpdateAnimation() {
        this.drawEnemy()
        this.xPosition = this.xPosition + this.velocity.x;
        this.yPosition = this.yPosition + this.velocity.y;
    }
}
let enemyArray = []
function enemySpawn() {
    let radius;
    if (gameType == 4) {
        radius = Math.random() * (6 - 2) + 6;
    }
    else {
        radius = Math.random() * (14 - 10) + 14;
    }
    const x = Math.random() * canvas.width;
    const y = -radius;
    const color = `hsl(${Math.random()*360}, 75% , 75%)`;
    const angle = Math.atan2(playerHitbox.yPosition - y, playerHitbox.xPosition - x);
    const randomNumGen = (Math.random() * 8) + 2;
    const velocity = {
        x: Math.cos(angle) * randomNumGen,
        y: Math.sin(angle) * randomNumGen
    };
    enemyArray.push(new Enemy(x, y, radius, color, velocity));
}


// Enemy - gametype 4
class Fairy {
    constructor(x, y, radius, color, velocity) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
        this.velocity = velocity; 
    }
    drawEnemy() {
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill()
    }
    UpdateAnimation() {
        this.drawEnemy()
        this.xPosition = this.xPosition + this.velocity.x;
        this.yPosition = this.yPosition + this.velocity.y;
    }
}
let enemyFairyArray = []
function enemyFairySpawn() {
    let radius = Math.random() * (14 - 10) + 14;
    const x = Math.random() * canvas.width;
    const y = -radius;
    // const color = `hsl(${Math.random()*360}, 75% , 75%)`;
    const color = `blue`;
    const angle = Math.atan2(playerHitbox.yPosition - y, playerHitbox.xPosition - x);
    const randomNumGen = (Math.random() * 8) + 2;
    const velocity = {
        x: Math.cos(angle) * randomNumGen,
        y: Math.sin(angle) * randomNumGen
    };
    enemyFairyArray.push(new Fairy(x, y, radius, color, velocity));
}


// Particles
class Particle {
    constructor(x, y, radius, color, velocity, time) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
        this.velocity = velocity; 
        this.alpha = 0.5;
        this.alpha_reduce = time;
    }
    drawParticle() {
        canvasContext.save()
        canvasContext.globalAlpha = this.alpha; 
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill()
        canvasContext.restore()
    }
    UpdateAnimation() {
        this.drawParticle()
        this.xPosition = this.xPosition + this.velocity.x;
        this.yPosition = this.yPosition + this.velocity.y;
        this.alpha -= this.alpha_reduce;
        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
    }
}
let particleArray = []


// Score variable
const scoreCounter = document.querySelector('#scoreNum')
const scoreEndCounter = document.querySelector('#scoreEndNum')
let scoreNumber = 0;
let deaths = 0;
// Parent elements
const scoreCounterElement = document.querySelector('.scoreCounter');


// Animations/Render
let animationFrame;
function animation() {

    // Render
    animationFrame = requestAnimationFrame(animation)
    if (gameType == 4) {
        canvasContext.fillStyle = 'rgba(20,20,20,1)'
    }
    else {
        canvasContext.fillStyle = 'rgba(20,20,20,0.25)'
    }
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    // Player
    playerHitbox.update()

    // Particle
    particleArray.forEach((particle, particleIndex) => {
        if (particle.alpha <= 0) { 
            particleArray.splice(particleIndex, 1)
        } 
        else {
            particle.UpdateAnimation()
        }
    });
    
    // Player projectiles
    playerProjectileArray.forEach((projectile, projectileIndex)=> {
        projectile.UpdateAnimation();

        // Removal of bullets off screen
        if (projectile.xPosition + projectile.circleRadius < 0  ||
            projectile.xPosition - projectile.circleRadius > canvas.width ||
            projectile.yPosition + projectile.circleRadius < 0 ||
            projectile.yPosition - projectile.circleRadius > canvas.height ) {
            setTimeout(() => {
                playerProjectileArray.splice(projectileIndex, 1)
            }, 0);
        }
    })

    // Enemies - If gametype 4, enemy is just projectiles.
    enemyArray.forEach((enemy, enemyIndex)=> {
        enemy.UpdateAnimation()
        
        // Graze - (Gives points when player is close to enemy)
        const collisionDistance = Math.hypot(playerHitbox.xPosition - enemy.xPosition, playerHitbox.yPosition - enemy.yPosition)
        if (collisionDistance - enemy.circleRadius - playerHitbox.circleRadius <= 30) { 
            scoreNumber += (Math.abs(enemy.velocity.x) + Math.abs(enemy.velocity.y * 2));
            scoreCounter.innerHTML = parseInt(scoreNumber);
            
            // Audio
            playAudioGraze()
        }
        
        // Collision for player - Death
        if (collisionDistance - enemy.circleRadius - playerHitbox.circleRadius < 1) {
            setTimeout(() => {
                // Audio
                playAudioPlayerDeath()
                deaths++;

                if (gameType == 4) {
                    // Particles
                    if (gameRule_Particles == true) {
                        for (let i = 0; i < 24; i++) {
                            particleArray.push(new Particle(
                                playerHitbox.xPosition, 
                                playerHitbox.yPosition, 
                                Math.random() * 4, 
                                'salmon', 
                                {x: (Math.random() -0.5) * (Math.random() * 30), y:(Math.random() -0.5) * (Math.random() * 30)},
                                0.0005));
                        }
                    }
                    playerDeath()

                    if (deaths >= 3) {
                        deaths = 0
                        gameEnd()                        
                    }
                }
                else {
                    deaths = 0
                    gameEnd()
                }
                    

            }, 0);
        }; 
        
        // Collision for projectiles
        playerProjectileArray.forEach((projectile, projectileIndex)=> {
            if (gameType == 2 || gameType == 4) {
                // No hit register since player can't shoot.
                // No hit register since you cant shoot other projectiles.
            }
            // gametype 1 & 3
            else {
                const collisionDistance = Math.hypot(projectile.xPosition - enemy.xPosition, projectile.yPosition - enemy.yPosition)
                if (collisionDistance - enemy.circleRadius - projectile.circleRadius < 1) {
                    
                    // Audio
                    playAudioExplosion()
                    
                    // Particles
                    if (gameRule_Particles == true) {
                        for (let i = 0; i < 24; i++) {
                            particleArray.push(new Particle(
                                projectile.xPosition, 
                                projectile.yPosition, 
                                Math.random() * 4, 
                                enemy.color, 
                                {x: (Math.random() -0.5) * (Math.random() * 30), y:(Math.random() -0.5) * (Math.random() * 30)},
                                0.01));
                        }
                    }
                    
                    // Removal of projectile and enemy
                    setTimeout(() => {
                        enemyArray.splice(enemyIndex, 1)
                        playerProjectileArray.splice(projectileIndex, 1)
                    }, 0);
                    
                    scoreNumber += (10*enemy.circleRadius);
                    scoreCounter.innerHTML = parseInt(scoreNumber);
                }
            }; 
        })
    })
    
    // Enemy - gametype 4
    if (gameType == 4) {
        enemyFairyArray.forEach((enemyFairy, enemyFairyIndex) => {
            enemyFairy.UpdateAnimation()

            // Collision for projectiles
            playerProjectileArray.forEach((projectile, projectileIndex)=> {
                const collisionDistance = Math.hypot(projectile.xPosition - enemyFairy.xPosition, projectile.yPosition - enemyFairy.yPosition)
                if (collisionDistance - enemyFairy.circleRadius - projectile.circleRadius < 1) {

                    // Audio
                    playAudioExplosion()

                    // Particles
                    if (gameRule_Particles == true) {
                        for (let i = 0; i < 24; i++) {
                            particleArray.push(new Particle(
                                projectile.xPosition, 
                                projectile.yPosition, 
                                Math.random() * 4, 
                                enemyFairy.color, 
                                {x: (Math.random() -0.5) * (Math.random() * 30), y:(Math.random() -0.5) * (Math.random() * 30)},
                                0.01));
                        }
                    }

                    // Removal of projectile and enemy
                    setTimeout(() => {
                        enemyFairyArray.splice(enemyFairyIndex, 1)
                        playerProjectileArray.splice(projectileIndex, 1)
                    }, 0);

                    scoreNumber += (10*enemyFairy.circleRadius);
                    scoreCounter.innerHTML = parseInt(scoreNumber);
                }
            });
        
            // Collision for player - Death
            const collisionDistance = Math.hypot(playerHitbox.xPosition - enemyFairy.xPosition, playerHitbox.yPosition - enemyFairy.yPosition)
            if (collisionDistance - enemyFairy.circleRadius - playerHitbox.circleRadius < 1) {
                setTimeout(() => {
                    // Audio
                    playAudioPlayerDeath()
                    
                    // Particles
                    if (gameRule_Particles == true) {
                        for (let i = 0; i < 24; i++) {
                            particleArray.push(new Particle(
                                playerHitbox.xPosition, 
                                playerHitbox.yPosition, 
                                Math.random() * 4, 
                                'salmon', 
                                {x: (Math.random() -0.5) * (Math.random() * 30), y:(Math.random() -0.5) * (Math.random() * 30)},
                                0.0005));
                            }
                    }
                    deaths++;
                    playerDeath()

                    if (deaths >= 3) {
                        deaths = 0
                        gameEnd()                        
                    }; 
                }, 0);
            }; 
            
        });

    }
}


function gameEnd() {
    cancelAnimationFrame(animationFrame)
    
    gameStarted = false;
    clearInterval(enemyInterval, 100)
    clearInterval(enemyFairyInterval, 100)
    
    
    // UI
    scoreEndCounter.innerHTML = parseInt(scoreNumber);
    scoreCounterElement.style.display = 'none';
    
    uiDeathUI()

    clearInterval(gamemode_shmup_auto_shooting, 1)
}


function playerDeath() {
    enemyArray = [];
    enemyFairyArray = [];
    playerProjectileArray = [];
    playerHitbox.xPosition = canvas.width/2;
    playerHitbox.yPosition = canvas.height/1.25;
}


// Restart game
var gameDifficulty = 2;
var gameType = 1;
var gamePraticeMode = false;
let gameStarted = false;
let enemyInterval;
let enemyFairyInterval;
function restartGame() {
    animation()

    setTimeout(() => {
        
        if (gameType == 4) {
            enemyInterval;

            enemyFairyInterval = setInterval(() => {
                enemyFairySpawn()
            }, 1000 / (gameDifficulty * gameDifficulty * 2) );
        }
        else {
            enemyInterval = setInterval(() => {
                enemySpawn()
            }, 500 / (gameDifficulty * gameDifficulty * 2) );
        }
    }, 2000);
    
    // UI
    scoreCounterElement.style.display = 'block';

    setTimeout(() => {
        gameStarted = true;
    }, 0);
}

// Resets game stats and positions
function resetGame() {
    enemyArray = [];
    enemyFairyArray = [];
    particleArray = [];
    playerProjectileArray = [];
    scoreNumber = 0;
    scoreEndCounter.innerHTML = parseInt(scoreNumber);
    scoreCounter.innerHTML = parseInt(scoreNumber);
    playerHitbox.xPosition = canvas.width/2;
    playerHitbox.yPosition = canvas.height/1.25;

}


// Shooting 
function playerShoot(event) {
    if (gameType == 4) {

        const angle = (Math.PI/2)*-1;
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        setTimeout(() => {
            playerProjectileArray.push(new PlayerProjectile(playerHitbox.xPosition - 14, playerHitbox.yPosition - 36, 12, 'salmon', velocity))
            playerProjectileArray.push(new PlayerProjectile(playerHitbox.xPosition + 14, playerHitbox.yPosition - 36, 12, 'salmon', velocity))
            if (scoreNumber > 50) {
                playerProjectileArray.push(new PlayerProjectile(playerHitbox.xPosition - 42, playerHitbox.yPosition - 8, 12, 'salmon', velocity))
                playerProjectileArray.push(new PlayerProjectile(playerHitbox.xPosition + 42, playerHitbox.yPosition - 8, 12, 'salmon', velocity))
            }
        }, 0);
    }

    else {
        const angle = Math.atan2(event.clientY - playerHitbox.yPosition, event.clientX - playerHitbox.xPosition);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        playerProjectileArray.push(new PlayerProjectile(playerHitbox.xPosition, playerHitbox.yPosition, 12, 'salmon', velocity))        
    }
    
    // Audio
    playAudioAttack()
}


// EventListeners

// Mouse
let mousePosition;
addEventListener('mousemove', (event)=> {
    mousePosition = event;
})

// Bullets
let gamemode_shmup_auto_shooting;
onmousedown = function(event) {    
    if (gameStarted === true) {           
        gamemode_shmup_auto_shooting = setInterval(() => {playerShoot(mousePosition)}, 120);
 
    }
}
onmouseup = function(event) {    
    if (gameStarted === true) {          
        clearInterval(gamemode_shmup_auto_shooting, 1)
    }
}

// Keyboard/Movement
let keylistener_shift = false;
let keyArray = [];
onkeydown = onkeyup = function(event) {
    event = event;
    keyArray[event.code] = event.type == 'keydown';

    // Bugged - needs a _if not_ for the rest to function correctly.
    if (!keyArray['Quote']) {
        playerHitbox.velocity.y = 0;
        playerHitbox.velocity.x = 0;
        keylistener_shift = false;
    }

    if (keyArray['ShiftLeft']) {
        keylistener_shift = true;
    }

    if (keyArray['Space']) { 
        if (gameStarted === true && gameType == 1) {
            playerShoot(mousePosition)
        }
    }
    else if (!keyArray['Space']) {
        // Nothing
    }

    if (keyArray['KeyD'] && keyArray['ShiftLeft']) {
        playerHitbox.velocity.x = 2;
    }
    else if (keyArray['KeyD']) {
        playerHitbox.velocity.x = 4;
    }

    if (keyArray['KeyW'] && keyArray['ShiftLeft']) {
        playerHitbox.velocity.y = -2;
    }
    else if (keyArray['KeyW']) {
        playerHitbox.velocity.y = -4;
    }

    if (keyArray['KeyA'] && keyArray['ShiftLeft']) {
        playerHitbox.velocity.x = -2;
    }
    else if (keyArray['KeyA']) {
        playerHitbox.velocity.x = -4;
    }
    
    if (keyArray['KeyS'] && keyArray['ShiftLeft']) {
        playerHitbox.velocity.y = 2;
    }
    else if (keyArray['KeyS']) {
        playerHitbox.velocity.y = 4;
    }
    
    // console.log(event.code)
    // console.log(keyArray)
}
