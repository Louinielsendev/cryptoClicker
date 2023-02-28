var Shop = function () {
    this.shopElem = document.querySelector('.modal')
    this.toggleElem = document.querySelector('.menu-button')
    this.skinParentElem = document.querySelector('.modal--skinsWrapper')
    this.powerUpsElem = document.querySelector('.modal--powerUps')
    this.open = false
    this.cpcPrice = 500
    this.acPrice = 500
    this.toggleElem.addEventListener('click', this.toggleShop.bind(this))
}

Shop.prototype.toggleShop = function () {
    if (!this.open) {
        this.open = true
        this.shopElem.style.display = 'flex'
        this.shopElem.style.height = '80%'
    }
    else {
        this.open = false
        this.shopElem.style.height = '0'
        this.shopElem.style.dispaly = 'none'
    }
}


Shop.prototype.createPowerUpsElem = function () {

    var acElement = document.querySelector('.powerUps--ac')
    var cpcElement = document.querySelector('.powerUps--cpc')
    var priceElements = document.querySelectorAll('.powerUps--price')
    var levelElements = document.querySelectorAll('.powerUps--level')
    acElement.addEventListener('click', this.addAutoClick.bind(this))
    this.acPrice = 500 * 2 ** (Main.stats.acLevel - 1)
    priceElements[0].innerHTML = this.acPrice
    levelElements[0].innerHTML = `Level: ${Main.stats.acLevel}`
    console.log(Main.stats.acLevel)

    cpcElement.addEventListener('click', this.addCoinsPerClick.bind(this))
    this.cpcPrice = 500 * 6 ** (Main.stats.cpcLevel - 1)
    priceElements[1].innerHTML = this.cpcPrice
    levelElements[1].innerHTML = `Level: ${Main.stats.cpcLevel}`
    Main.stats.saveStats()

}

Shop.prototype.addAutoClick = function () {
    if (Main.stats.score >= this.acPrice) {
        Main.stats.score = Main.stats.score - this.acPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        Main.stats.acLevel += 1

        this.acPrice = 500 * 2 ** (Main.stats.acLevel - 1)
        this.createPowerUpsElem()
    }
    else {
        console.log('du har inte råd')
        console.log(Main.stats.acLevel)
    }
    Main.stats.saveStats()

}

Shop.prototype.addCoinsPerClick = function () {
    if (Main.stats.score >= this.cpcPrice) {
        Main.stats.score = Main.stats.score - this.cpcPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        Main.stats.cpcLevel += 1
        this.cpcPrice = 500 * 6 ** (Main.stats.cpcLevel - 1)
        this.createPowerUpsElem()
    }
    else {
        console.log('du har inte råd')
    }
}


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
        }
        else if (skin.owned) {
            var skinEquipBtn = document.createElement('button')
            skinEquipBtn.innerHTML = 'Equip';
            skinEquipBtn.addEventListener('click', this.changeSkin);
            skinEquipBtn.dataset.id = index
            skinEquipBtn.classList.add('skin--equipButton')
            skinButtons.appendChild(skinEquipBtn)

        }
        else {
            var skinBuyBtn = document.createElement('button')
            skinBuyBtn.innerHTML = 'Buy';
            skinBuyBtn.addEventListener('click', this.buySkin);
            skinBuyBtn.classList.add('skin--buyButton')
            skinBuyBtn.dataset.id = index
            skinButtons.appendChild(skinBuyBtn)

        }



        skinPrice.innerHTML = skin.price
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

Shop.prototype.changeSkin = function (e) {

    var button = e.target

    var buttonIndex = button.dataset.id
    Main.skins.forEach((skin, index) => {
        if (skin.owned) {
            var skinId = (index + 1)
            var userId = localStorage.getItem('userId')
            if (index == buttonIndex) {
                skin.active = true
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText)
                    }
                };
                xmlhttp.open("GET", `equipSkin.php?userId=${userId}&skinId=${skinId}&state=1`, true);
                xmlhttp.send();
            }
            else {
                skin.active = false
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(this.responseText)
                    }
                };
                xmlhttp.open("GET", `equipSkin.php?userId=${userId}&skinId=${skinId}&state=0`, true);
                xmlhttp.send();
            }
        }
    });
    Main.coin.image.src = Main.skins[buttonIndex].image.src
    Main.shop.skinParentElem.innerHTML = ''
    Main.shop.createSkinElem()

}

Shop.prototype.buySkin = function () {
    var index = parseInt(this.dataset.id)
    var skinId = index + 1;
    var userId = localStorage.getItem('userId')

    if (Main.stats.score >= Main.skins[index].price) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText)
            }
        };
        xmlhttp.open("GET", `buySkin.php?userId=${userId}&skinId=${skinId}`, true);
        xmlhttp.send();


        Main.skins[index].owned = true;
        Main.stats.score = (Main.stats.score - Main.skins[index].price)
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score)
        Main.shop.skinParentElem.innerHTML = ''
        Main.shop.createSkinElem()
    }
}