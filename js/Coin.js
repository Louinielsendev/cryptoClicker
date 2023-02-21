var Coin = function (stats) {
    this.stats = stats
    
    console.log(Main.skins)
    const image = new Image()
    image.src = Main.skins[0].image.src
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
    console.log(this.stats.score)
   this.stats.setClickScore()
    this.image.style.transform = 'scale(1)'
    const randomsize = Math.random() * 25 + 60
    const randomnumber = Math.random() * 420 - 40
    var drop = new Drop({
        position: {
            x: randomnumber,
            y: -40
        },
        velocity: {
            y: randomsize / 60
        },
        size: randomsize,
        img: Main.coin.image
    });
    
    Main.drops.push(drop)

}

