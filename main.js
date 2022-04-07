
// https://www.youtube.com/watch?v=eI9idPTT0c4&ab_channel=ChrisCourses
// now at collision detection. player
// 
// planned things: 
// Movement for player.
// auto shooting for player.
// enemy revamp into fairies? may not be possible for now
// HUD / UI
// potrait aspect ratio
// Score system?

// Canvas body
const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');
canvas.width = canvasWidthCalculation()
canvas.height = canvasHeightCalculation()
canvas.style.border = '1px solid black'

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
}
// might change it
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
        this.xPosition = this.xPosition + this.velocity.x * 6;
        this.yPosition = this.yPosition + this.velocity.y * 6;
    }
}
const playerProjectileArray = [];


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
const enemyArray = []
function enemySpawn() {
    setInterval(() => {
        const radius = Math.random() * (14 - 10) + 14;
        const x = Math.random() * canvas.width;
        const y = -radius;
        const color = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };

        enemyArray.push(new Enemy(x, y, radius, color, velocity));
    }, 500);
}
enemySpawn()


// Animations - render
let animationFrame;
function animation() {
    //render
    animationFrame = requestAnimationFrame(animation)
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)

    //player
    const hitboxGlow = new Hitbox(HitboxPositionX, HitboxPositionY, 8, 'white')
    hitboxGlow.drawHitbox();
    const hitbox = new Hitbox(HitboxPositionX, HitboxPositionY, 6, 'salmon')
    hitbox.drawHitbox();

    //player projectiles
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

    //enemies
    enemyArray.forEach((enemy, enemyIndex)=> {
        enemy.UpdateAnimation()
        
        //collision for player
        const collisionDistance = Math.hypot(hitbox.xPosition - enemy.xPosition, hitbox.yPosition - enemy.yPosition)
        if (collisionDistance - enemy.circleRadius - hitbox.circleRadius < 1) {
            setTimeout(() => {
                cancelAnimationFrame(animationFrame)
            }, 0); 
        }; 
        
        //collision for projectiles
        playerProjectileArray.forEach((projectile, projectileIndex)=> {
            const collisionDistance = Math.hypot(projectile.xPosition - enemy.xPosition, projectile.yPosition - enemy.yPosition)
            if (collisionDistance - enemy.circleRadius - projectile.circleRadius < 1) {
                setTimeout(() => {
                    enemyArray.splice(enemyIndex, 1)
                    playerProjectileArray.splice(projectileIndex, 1)
                }, 0);
            }; 
        })
    })
}
animation()


// EventListeners
addEventListener('click', (event)=> {
    console.log(playerProjectileArray);
    
    //bullets
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    playerProjectileArray.push(new PlayerProjectile(canvas.width/2, canvas.height/2, 12, 'blue', velocity))
})

