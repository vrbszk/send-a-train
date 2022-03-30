const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Platform {
    constructor(x, y, limit) {
        this.x = x
        this.y = y
        this.limit = limit
        this.passengers = 0
        this.rect = {left: this.x - 50, right: this.x + 50, top: this.y - 15, bottom: this.y + 15}
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x - 50, this.y - 15, 100, 30)
        ctx.fill()
    }

    update() {
        this.draw()
    }
}

class Train {
    constructor (x, y) {
        this.x = x
        this.y = y
        this.rect = {left: this.x - 10, right: this.x + 10, top: this.y - 5, bottom: this.y + 5}
        this.velocity = 0
        this.target = null
    }

    generateBounds() {
        this.rect = {left: this.x - 10, right: this.x + 10, top: this.y - 5, bottom: this.y + 5}
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x - 10, this.y - 5, 20, 10)
        ctx.fill()
    }

    update() {
        this.draw()
        
        this.generateBounds()

        if (this.target == null) {
            return
        }

        if (this.rect.top < this.target.rect.bottom && this.rect.left < this.target.rect.right &&
            this.rect.bottom > this.target.rect.top && this.rect.right > this.target.rect.left) {
            this.velocity = {x: 0, y: 0}
            this.target = null
        }

        this.x += this.velocity.x * 5
    }
}

const platforms = []

platforms.push(new Platform(100, canvas.height / 2, 50))
platforms.push(new Platform(canvas.width - 100, canvas.height / 2, 50))

const train = new Train(platforms[0].x, platforms[0].y)

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    platforms.forEach(platform => {
        platform.update()
    })
    train.update()

    
}

window.addEventListener("click", (event) => {
    let x = event.clientX
    let y = event.clientY
    platforms.forEach(platform => {
        if (x > platform.rect.left && x < platform.rect.right && y > platform.rect.top && y < platform.rect.bottom) {
            console.log("clicked")
            
            train.velocity = {x: platform.x > train.x ? 1 : -1, y: 0}
            train.target = platform
        }
    })
})

animate()
console.log(canvas.width, canvas.height)