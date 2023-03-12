var Coin = function (stats) {
    this.stats = stats


    const image = new Image()
    this.image = image
    this.image.classList.add('coin')
    this.getImageUrl = function () {
        Main.skins.forEach(skin => {
            if (skin.active === true) {
                image.src = skin.image.src
            }

        });
    }
    this.image.addEventListener('touchstart', () => { this.clickDown() })
    this.image.addEventListener('touchend', () => { this.clickUp() })
    this.image.classList.add('coin-img')
}

Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'
}



Coin.prototype.clickUp = function () {

    this.stats.saveStats()
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

