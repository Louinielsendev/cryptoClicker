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
    this.image.addEventListener('touchend', (e) => { this.clickUp(e) })
    this.image.classList.add('coin-img')
}

Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'
}



Coin.prototype.clickUp = function (e) {

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

    var touchX = e.changedTouches[0].clientX
    var touchY = e.changedTouches[0].clientY
    var score = new ScoreAnimation({
        position: {
            x: touchX,
            y: touchY
        },
        velocity: {
            y: -4
        },
        size: 10
    })

    Main.scoreAnimations.push(score);
    console.log(Main.scoreAnimations)
}

