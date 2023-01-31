var Coin = function () {
    const image = new Image()
    image.src = './coin.png'
    this.image = image
    this.image.classList.add('coin')

    this.image.addEventListener('touchstart', () => { this.clickDown() })
    this.image.addEventListener('touchend', () => { this.clickUp() })
    this.image.addEventListener('mousedown', () => { this.clickDown() })
    this.image.addEventListener('mouseup', () => { this.clickUp() })
}

Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'
    const randomnumber = Math.random() * 400
    var drop = new Drop({position: {
        x: randomnumber,
        y: 0
    },
    velocity: {
        y: 2
    }
});
    Main.drops.push(drop)

    console.log(Main.drops)
}

Coin.prototype.clickUp = function () {
    this.image.style.transform = 'scale(1)'


}

