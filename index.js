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
        this.increasePassengers()
    }

    increasePassengers() {
        if (this.passengers < this.limit) {
            this.passengers++
        } else {
            this.passengers = this.limit
        }

        let timeout = Math.random() * 2000 + 10
        setTimeout(this.increasePassengers.bind(this), timeout)
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x - 50, this.y - 15, 100, 30)
        ctx.fill()
        if (this.passengers < this.limit) {
            ctx.fillStyle = 'lightgrey'
        } else {
            ctx.fillStyle = 'green'
        }
        ctx.font = "48px sans-serif";
        ctx.fillText(this.passengers, this.x - 20, this.y - 30);
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
        this.from = null
        this.target = null
        this.capacity = 10
        this.passengers = 0
    }

    generateBounds() {
        this.rect = {left: this.x - 10, right: this.x + 10, top: this.y - 5, bottom: this.y + 5}
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x - 10, this.y - 5, 20, 10)
        ctx.fill()
        if (this.passengers < this.capacity) {
            ctx.fillStyle = 'lightgrey'
        } else {
            ctx.fillStyle = 'green'
        }
        ctx.font = "10px sans-serif";
        ctx.fillText(this.passengers + '/' + this.capacity, this.x - 10, this.y - 10);
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

<<<<<<< Updated upstream
            this.target.passengers -= train.capacity
            if (this.target.passengers < 0) {
                this.target.passengers = 0
            }
=======
            this.from = this.target
>>>>>>> Stashed changes
            this.target = null
            this.passengers = 0

            let free_space = this.capacity - this.passengers
            let boarding = this.from.passengers > free_space ? free_space : this.from.passengers
            this.passengers += boarding
            this.from.passengers -= boarding
        }

        this.x += this.velocity.x * 10
    }
}

const platforms = []

platforms.push(new Platform(100, canvas.height / 2, 50))
platforms.push(new Platform(canvas.width - 100, canvas.height / 2, 50))

const train = new Train(platforms[0].x, platforms[0].y)
train.from = platforms[0]

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
            if (train.from != platform) {
                train.velocity = {x: platform.x > train.x ? 1 : -1, y: 0}
                train.target = platform
            } else {
                let free_space = train.capacity - train.passengers
                let boarding = platform.passengers > free_space ? free_space : platform.passengers
                train.passengers += boarding
                platform.passengers -= boarding
            }
        }
    })
})

animate()

console.log(canvas.width, canvas.height)
