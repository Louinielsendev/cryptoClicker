var Coin = function () {
    const image = new Image()
    image.src = './coin.png'
    this.image = image
    this.image.classList.add('coin')

    this.image.addEventListener('touchstart', () => { this.clickDown() })
    this.image.addEventListener('touchend', () => { this.clickUp() })
}

Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'



}

Coin.prototype.clickUp = function () {
    this.image.style.transform = 'scale(1)'

    const randomnumber = Math.random() * 400
    var drop = new Drop({
        position: {
            x: randomnumber,
            y: 0
        },
        velocity: {
            y: 1.7
        }
    });
    Main.drops.push(drop)
}

