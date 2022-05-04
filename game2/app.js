

$(document).ready(function () {
    $("#t").click(function () {

         $("#red").css({ "display": "none" });
     });
    function win(){
        $("#blue").css({ "display": "block" });
        $("#name").text($("#fname").val())
    }
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = 1024
    canvas.height = 576
    let scroll = 0
    var a = document.querySelector('#audio')
    const gravity = 0.5
    let jump = false
    let grounded = false
    let scolloffset = 0
    let img = document.createElement("img")
    img.src = "img/platform.png"
    let hill = document.createElement("img")
    hill.src = "img/hills.png"
    let background = document.createElement("img")
    background.src = "img/background.png"
    let smalltall = document.createElement("img")
    smalltall.src = "img/platformSmallTall.png"
    let spriteRunLeft = document.createElement("img")
    spriteRunLeft.src = "img/spriteRunLeft.png"
    let spriteRunRight = document.createElement("img")
    spriteRunRight.src = "img/spriteRunRight.png"
    let spriteStandLeft = document.createElement("img")
    spriteStandLeft.src = "img/spriteStandLeft.png"
    let spriteStandRight = document.createElement("img")
    spriteStandRight.src = "img/spriteStandRight.png"
    let castle = document.createElement("img")
    castle.src = "img/castle.png"

    class Player {
        constructor() {
            this.speed = 5
            this.position = {
                x: 100,
                y: 100
            }
            this.velocity = {
                x: 0,
                y: 1
            }
            this.width = 66
            this.height = 150
        }
        draw() {
            c.fillStyle = "red"
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        update() {
            this.frames++
            if (this.frames > 28) this.frames = 0
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y

            if (this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity
        }
    }

    class Platform {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y,
            }
            this.image = image
            this.width = image.width
            this.height = image.height

        }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }

    class Prop {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y,
            }
            this.image = image
            this.width = image.width
            this.height = image.height

        }
        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }

    let player = new Player()
    let platforms = []
    let props = []

    const keys = {
        d: {
            pressed: false
        },
        a: {
            pressed: false
        }
    }
    scolloffset = 0

    function init() {
        player = new Player()
        platforms = [
            new Platform({ x: 4 * img.width + 100 - smalltall.width+scroll, y: 200, image: smalltall }),
            new Platform({ x: -1, y: 500, image: img }),
            new Platform({ x: img.width - 2+scroll, y: 500, image: img }),
            new Platform({ x: 2 * img.width + 100+scroll, y: 500, image: img }),
            new Platform({ x: 3 * img.width + 100+scroll, y: 400, image: img }),
            new Platform({ x: 4 * img.width + 440+scroll, y: 400, image: img }),
            new Platform({ x: 5 * img.width + 440+scroll, y: 400, image: img })
        ]
        props =
            [
                new Prop({ x: 0, y: 0, image: background }),
                new Prop({ x: 0, y: 0, image: hill }),
                new Prop({ x: 4 * img.width - 100, y: 0, image: castle })
            ]
        scolloffset = 0

    }

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = "white"
        c.fillRect(0, 0, canvas.width, canvas.height)
        props.forEach(Prop => {
            Prop.draw()
        })
        platforms.forEach(platform => {
            platform.draw()
        })

        //test
        platforms.forEach(platform => {
            platform.position.x -= 0
        })
        

        player.update()
        //scroll
        if (keys.d.pressed && player.position.x < 400) {
            player.velocity.x = player.speed
        } else if ((keys.a.pressed && player.position.x > 100) || keys.a.pressed && scolloffset === 0 && player.position.x > 0) {
            player.velocity.x = -player.speed
        } else {
            player.velocity.x = 0

            if (keys.d.pressed) {
                scolloffset += player.speed
                platforms.forEach(platform => {
                    platform.position.x -= player.speed
                })
                props.forEach(Prop => {
                    Prop.position.x -= player.speed * .66
                })

            } else if (keys.a.pressed && scolloffset > 0) {
                scolloffset -= player.speed
                platforms.forEach(platform => {
                    platform.position.x += player.speed
                })
                props.forEach(Prop => {
                    Prop.position.x += player.speed * .66
                })

            }
        }
        // platform collision
        platforms.forEach(platform => {
            if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
                player.velocity.y = 0
                grounded = true
            }
            // else{
            //     player.velocity.y = 0
            // }
        })
        
        //win
        if (scolloffset > 4 * img.width + 550) { win() }
        //lose
        if (player.position.y > canvas.height) {
            init()
        }
    }
    init()
    animate()

    addEventListener("keydown", (event) => {
        switch (event.key) {
            case "a":
                keys.a.pressed = true
                break
            case "d":
                keys.d.pressed = true
                break
            case " ":
                if (grounded) {
                    grounded = false
                    player.velocity.y -= 15
                    a.volume = 0.2;
                    a.play()
                }
                break
        }
    })
    addEventListener("keyup", (event) => {
        switch (event.key) {
            case "a":
                keys.a.pressed = false
                break
            case "d":
                keys.d.pressed = false
                break
        }
    })
});