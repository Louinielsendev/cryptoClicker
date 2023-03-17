/**
 * Klass för myntet som användare klickar på.
 */
var Coin = function () {
    const image = new Image()
    this.image = image
   
    this.getImageUrl = function () {
        Main.skins.forEach(skin => {
            if (skin.active === true) {
                image.src = skin.image.src
            }

        });
    }
    
}

/**
 * Skalar ner myntet när användaren trycker på det
 */
Coin.prototype.clickDown = function () {
    this.image.style.transform = 'scale(.95)'
}


/**
 * skapar en ny instans av klassen Drop. kör även setClickScore för att lägga till mynt.
 */
Coin.prototype.clickUp = function () {

    Main.stats.saveStats()
    Main.stats.setClickScore()
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

