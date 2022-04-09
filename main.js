



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


// Hitbox - player
class Hitbox {
    constructor(x, y, radius, color) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
    }
    drawHitbox() {
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill()
    }
    UpdateAnimation() {
        this.drawHitbox()
        this.xPosition = this.xPosition + this.velocity.x * 8;
        this.yPosition = this.yPosition + this.velocity.y * 8;
    }
}
const HitboxPositionX = canvas.width / 2;
const HitboxPositionY = canvas.height / 2;


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
        canvasContext.beginPath();
        canvasContext.arc(this.xPosition, this.yPosition, this.circleRadius, 0, Math.PI * 2, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill()
    }
    UpdateAnimation() {
        this.drawPlayerProjectile()
        this.xPosition = this.xPosition + this.velocity.x * 8;
        this.yPosition = this.yPosition + this.velocity.y * 8;
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
    setInterval(() => {
        const radius = Math.random() * (14 - 10) + 14;
        const x = Math.random() * canvas.width;
        const y = -radius;
        const color = `hsl(${Math.random()*360}, 75% , 75%)`;

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);

        const randomNumGen = (Math.random() * 8) + 2;
        const velocity = {
            x: Math.cos(angle) * randomNumGen,
            y: Math.sin(angle) * randomNumGen
        };

        enemyArray.push(new Enemy(x, y, radius, color, velocity));
    }, 500);
}


// Particles
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.xPosition = x;
        this.yPosition = y;
        this.circleRadius = radius;
        this.color = color;
        this.velocity = velocity; 
        this.alpha = 0.5;
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
        this.alpha -= 0.01;
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
const scoreEndCounterElement = document.querySelector('.endScreen');


// Animations/Render
let animationFrame;
function animation() {
    // Render
    animationFrame = requestAnimationFrame(animation)
    canvasContext.fillStyle = 'rgba(20,20,20,0.25)'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)

    // Player
    let hitboxGlow = new Hitbox(HitboxPositionX, HitboxPositionY, 8, 'white')
    hitboxGlow.drawHitbox();
    let hitbox = new Hitbox(HitboxPositionX, HitboxPositionY, 6, 'salmon')
    hitbox.drawHitbox();
    
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

    // Enemies
    enemyArray.forEach((enemy, enemyIndex)=> {
        enemy.UpdateAnimation()
        
        // Collision for player - Death
        const collisionDistance = Math.hypot(hitbox.xPosition - enemy.xPosition, hitbox.yPosition - enemy.yPosition)
        if (collisionDistance - enemy.circleRadius - hitbox.circleRadius < 1) {
            setTimeout(() => {
                cancelAnimationFrame(animationFrame)

                scoreEndCounter.innerHTML = parseInt(scoreNumber);
                scoreCounterElement.style.display = 'none';
                scoreEndCounterElement.style.display = 'block';
                deaths++;
            }, 0);
        }; 
        
        // Collision for projectiles
        playerProjectileArray.forEach((projectile, projectileIndex)=> {
            const collisionDistance = Math.hypot(projectile.xPosition - enemy.xPosition, projectile.yPosition - enemy.yPosition)
            if (collisionDistance - enemy.circleRadius - projectile.circleRadius < 1) {
                //particles
                for (let i = 0; i < 24; i++) {
                    particleArray.push(new Particle(
                        projectile.xPosition, 
                        projectile.yPosition, 
                        Math.random() * 4, 
                        enemy.color, 
                        {x: (Math.random() -0.5) * (Math.random() * 30), y:(Math.random() -0.5) * (Math.random() * 30)}));
                }

                // Removal of projectile and enemy
                setTimeout(() => {
                    enemyArray.splice(enemyIndex, 1)
                    playerProjectileArray.splice(projectileIndex, 1)
                }, 0);

                scoreNumber += (10*enemy.circleRadius);
                scoreCounter.innerHTML = parseInt(scoreNumber);
            }; 
        })
    })
}


//Start and Restart function
function restartGame() {
    enemyArray = [];
    particleArray = [];
    playerProjectileArray = [];
    hitboxGlow = new Hitbox(HitboxPositionX, HitboxPositionY, 8, 'white');
    hitbox = new Hitbox(HitboxPositionX, HitboxPositionY, 6, 'salmon');
    scoreNumber = 0;
    scoreEndCounter.innerHTML = parseInt(scoreNumber);
    scoreCounter.innerHTML = parseInt(scoreNumber);

    animation()
    if (deaths <= 0) {
        enemySpawn()
    }
    
    // UI
    scoreCounterElement.style.display = 'block';
    scoreEndCounterElement.style.display = 'none';
}


// Shooting 
function playerShoot(event) {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    playerProjectileArray.push(new PlayerProjectile(canvas.width/2, canvas.height/2, 12, 'salmon', velocity))
}


// EventListeners

// Mouse
let mousePosition;
addEventListener('mousemove', (event)=> {
    mousePosition = event;
})

// Bullets
addEventListener('click', (event)=> {    
    playerShoot(event)
})

// Start/Restart game
const restartButton = document.querySelector('.btn');
restartButton.addEventListener('click', ()=> {
    restartGame()
});

// Keyboard/Movement
let keyArray = [];
onkeydown = onkeyup = function(event) {
    event = event;
    keyArray[event.code] = event.type == 'keydown';

    if (keyArray['KeyD']) {
    }

    if (keyArray['KeyW']) {
    }

    if (keyArray['KeyA']) {
    }

    if (keyArray['KeyS']) {
    }

    if (keyArray['Space']) {
        playerShoot(mousePosition)
    }
    console.log(event.code)
    console.log(keyArray)
}
