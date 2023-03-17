/**
 * Klass för shop
 */
var Shop = function () {
    this.shopElem = document.querySelector('.modal')
    this.toggleElem = document.querySelector('.shop')
    this.coinToggleElem = document.querySelector('.clicker')
    this.closeElem = document.querySelector('.modal--exit')
    this.skinParentElem = document.querySelector('.modal--skinsWrapper')
    this.powerUpsElem = document.querySelector('.modal--powerUps')
    this.open = false
    this.cpcPrice = 500
    this.acPrice = 500
    this.acElement = document.querySelector('.powerUps--ac')
    this.cpcElement = document.querySelector('.powerUps--cpc')
    

}

/**
 * öppnar shopen
 */
Shop.prototype.openShop = function () {
  
    if (!this.open) {
        this.open = true
        this.shopElem.style.display = 'flex'
        this.shopElem.style.height = '80%'
        this.toggleElem.classList.add('active')
        this.coinToggleElem.classList.remove('active')
    }
}


/**
 * stänger shopen
 */
Shop.prototype.closeShop = function () {
    if (this.open) {
        this.open = false
        this.shopElem.style.height = '0'
        this.shopElem.style.dispaly = 'none'
        this.toggleElem.classList.remove('active')
        this.coinToggleElem.classList.add('active')
    }
}

/**
 * skapar element för uppgarderingarna
 */
Shop.prototype.createPowerUpsElem = function () {

    var priceElements = document.querySelectorAll('.powerUps--price')
    var levelElements = document.querySelectorAll('.powerUps--level')
    var bonusElements = document.querySelectorAll('.powerUps--bonus')

    this.acPrice = 500 * 2 ** (Main.stats.acLevel - 1)

    priceElements[0].innerHTML = new Intl.NumberFormat("de-DE").format(this.acPrice)
    levelElements[0].innerHTML = `Level: ${Main.stats.acLevel}`
    bonusElements[0].innerHTML = `${(1 * 1.55 ** (Main.stats.acLevel - 1)).toFixed(1)}/sec`


    this.cpcPrice = 500 * 6 ** (Main.stats.cpcLevel - 1)
    priceElements[1].innerHTML = new Intl.NumberFormat("de-DE").format(this.cpcPrice)
    levelElements[1].innerHTML = `Level: ${Main.stats.cpcLevel}`
    bonusElements[1].innerHTML = `${1 * 2 ** (Main.stats.cpcLevel - 1)}/click`



}


/**
 * ökar nivån på mynt/sec
 */
Shop.prototype.addAutoClick = function () {
    if (Main.stats.score >= this.acPrice) {
        Main.stats.score = Main.stats.score - this.acPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        Main.stats.acLevel += 1

        this.acPrice = 500 * 2 ** (Main.stats.acLevel - 1)
        this.createPowerUpsElem()
    }
    
    Main.stats.saveStats()

}

/**
 * ökar nivån på mynt/click
 */
Shop.prototype.addCoinsPerClick = function () {
    if (Main.stats.score >= this.cpcPrice) {
        Main.stats.score = Main.stats.score - this.cpcPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        Main.stats.cpcLevel += 1
        this.cpcPrice = 500 * 6 ** (Main.stats.cpcLevel - 1)


        this.createPowerUpsElem()
    }
    Main.stats.saveStats()

}

/**
 * skapar element för skins
 */
Shop.prototype.createSkinElem = function () {
    Main.skins.forEach((skin, index) => {

        var skinElem = document.createElement('div');
        skinElem.classList.add('skin-wrapper');

        var skinImgWrapper = document.createElement('div');
        var skinImg = document.createElement('img');
        skinImgWrapper.classList.add('skin--img')
        skinImg = skin.image;

        var skinInfo = document.createElement('div')
        var skinTitle = document.createElement('h2');
        var skinPrice = document.createElement('h2')
        skinInfo.classList.add('skin--title')

        var skinButtons = document.createElement('div')
        skinButtons.classList.add('skin--buttons')
        if (skin.owned && skin.active) {
            var skinEquipBtn = document.createElement('button')
            skinEquipBtn.innerHTML = 'Equiped';
            skinEquipBtn.dataset.id = index
            skinButtons.appendChild(skinEquipBtn)
            skinPrice.innerHTML = 'Owned'
        }
        else if (skin.owned) {
            var skinEquipBtn = document.createElement('button')
            skinEquipBtn.innerHTML = 'Equip';
            skinEquipBtn.addEventListener('click', this.changeSkin);
            skinEquipBtn.dataset.id = index
            skinEquipBtn.classList.add('skin--equipButton')
            skinButtons.appendChild(skinEquipBtn)
            skinPrice.innerHTML = 'Owned'
        }
        else {
            var skinBuyBtn = document.createElement('button')
            skinBuyBtn.innerHTML = 'Buy';
            skinBuyBtn.addEventListener('click', this.buySkin);
            skinBuyBtn.classList.add('skin--buyButton')
            skinBuyBtn.dataset.id = index
            skinButtons.appendChild(skinBuyBtn)
            skinPrice.innerHTML = new Intl.NumberFormat("de-DE").format(skin.price)
            var message = document.createElement('div');
            var messageText = document.createElement('h2')
            var textCover = document.createElement('div')
            messageText.innerHTML = 'Not enough coins!'
            textCover.appendChild(messageText)
            message.append(textCover)
            message.classList.add('skin--message')
            skinBuyBtn.appendChild(message)

        }

        skinTitle.innerHTML = skin.name;
        skinInfo.appendChild(skinTitle)
        skinInfo.appendChild(skinPrice)
        skinImgWrapper.appendChild(skinImg);
        skinElem.appendChild(skinImgWrapper);
        skinElem.appendChild(skinInfo)
        skinElem.appendChild(skinButtons)

        this.skinParentElem.appendChild(skinElem);
    })
}

/**
 * byter skin och sparar i databasen
 * @param {object}
 */
Shop.prototype.changeSkin = function (e) {
    var button = e.target
    var buttonIndex = button.dataset.id
    Main.skins.forEach((skin, index) => {
        if (skin.owned) {
            var skinId = (index + 1)
            var userId = localStorage.getItem('userId')
            if (index == buttonIndex) {
                skin.active = true
                fetch(`equipSkin.php?userId=${userId}&skinId=${skinId}&state=1`, Main.options)
                    .then(response => {
                        if (!response.ok) {
                            throw Error()
                        }
                    })
                    .catch(() => {
                        console.log('error')
                    })

              
            }
            else {
                skin.active = false
                fetch(`equipSkin.php?userId=${userId}&skinId=${skinId}&state=0`, Main.options)
                    .then(response => {
                        if (!response.ok) {
                            throw Error()
                        }
                    })
                    .catch(() => {
                        console.log('error')
                    })
              
            }
        }
    });
    Main.coin.image.src = Main.skins[buttonIndex].image.src
    Main.shop.skinParentElem.innerHTML = ''
    Main.shop.createSkinElem()

}

/**
 * köper skin och sparar i databasen
 */
Shop.prototype.buySkin = function () {
    var index = parseInt(this.dataset.id)
    var skinId = index + 1;
    var userId = localStorage.getItem('userId')

    if (Main.stats.score >= Main.skins[index].price) {
        fetch(`buySkin.php?userId=${userId}&skinId=${skinId}`, Main.options)
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
            })
            .catch(() => {
                console.log('error')
            })
      

        Main.skins[index].owned = true;
        Main.stats.score = (Main.stats.score - Main.skins[index].price)
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score)
        Main.shop.skinParentElem.innerHTML = ''
        Main.shop.createSkinElem()
    }
    else {
        const message = this.querySelector('.skin--message')
        if (message.style.opacity < 1) {
            message.style.opacity = '1'
            setTimeout(() => {
                message.style.opacity = '0';
            }, "2000");

        }


    }
    Main.stats.saveStats()
}