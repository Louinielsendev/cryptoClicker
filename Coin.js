var Coin = function (stats) {
    this.stats = stats
    
    const image = new Image()
    image.src = './coin.png'
    this.image = image
    this.image.classList.add('coin')

    this.image.addEventListener('touchstart', () => { this.clickDown() })
    this.image.addEventListener('touchend', () => { this.clickUp() })
    this.image.classList.add('coin-img')
}

Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'



}

Coin.prototype.clickUp = function () {
    
   this.stats.setScore()
    
    this.image.style.transform = 'scale(1)'
    const randomsize = Math.random() * 25 + 60
    const randomnumber = Math.random() * 400
    var drop = new Drop({
        position: {
            x: randomnumber,
            y: -40
        },
        velocity: {
            y: randomsize / 60
        },
        size: randomsize
    });
    
    Main.drops.push(drop)

}

