var Shop = function () {
    this.shopElem = document.querySelector('.modal')
    this.toggleElem = document.querySelector('.menu-button')
    this.skinParentElem = document.querySelector('.modal--skins')
    this.powerUpsElem = document.querySelector('.modal--powerUps')
    this.open = false
    this.cpcPrice = 500;
    this.cpcLevel = 1
    this.acPrice = 500;
    this.acLevel = 1
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


Shop.prototype.createPowerUpsElem = function(){

    var powerUpsWrapper = document.createElement('div')
    powerUpsWrapper.classList.add('modal--powerUpsWrapper')

    var acElement = document.createElement('div')
    acElement.classList.add('powerUps--ac')
    acElement.addEventListener('click', this.addAutoClick.bind(this))
    var acPriceElement = document.createElement('h1')
    acPriceElement.innerHTML = this.acPrice
    acElement.appendChild(acPriceElement)
    var acLevelElement = document.createElement('h2')
    acLevelElement.innerHTML = `Level: ${this.acLevel}`
    acElement.appendChild(acLevelElement)

    var cpcElement = document.createElement('div')
    cpcElement.classList.add('powerUps--cpc')
    cpcElement.addEventListener('click', this.addCoinsPerClick.bind(this))
    var cpcPriceElement = document.createElement('h1')
    cpcPriceElement.innerHTML = this.cpcPrice;
    cpcElement.appendChild(cpcPriceElement)
    var cpcLevelElement = document.createElement('h2')
    cpcLevelElement.innerHTML = `Level: ${this.cpcLevel}`
    cpcElement.appendChild(cpcLevelElement)

    
    powerUpsWrapper.appendChild(acElement)
    powerUpsWrapper.appendChild(cpcElement)
    this.powerUpsElem.appendChild(powerUpsWrapper)
    
}

Shop.prototype.addAutoClick = function(){
    if (Main.stats.score >= this.acPrice){
        Main.stats.score = Main.stats.score - this.acPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        this.acLevel ++
        var ac = 1 * 1.55**(this.acLevel - 1)
        this.acPrice = 500 * 2**(this.acLevel - 1)
        Main.stats.autoClick = ac
        this.createPowerUpsElem()

    }
    else {
        console.log('du har inte råd')
    }
        
    
}

Shop.prototype.addCoinsPerClick = function(){
    if (Main.stats.score >= this.cpcPrice){
        Main.stats.score = Main.stats.score - this.cpcPrice;
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score);
        this.cpcLevel ++
        var cpc = 1 * 2**(this.cpcLevel - 1)
        this.cpcPrice = 500 * 6**(this.cpcLevel - 1)
        Main.stats.coinPerClick = cpc;
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
            if (index == buttonIndex) {
                skin.active = true

            }
            else {
                skin.active = false
            }
        }
    });
    Main.coin.image.src = Main.skins[buttonIndex].image.src
    Main.shop.skinParentElem.innerHTML = ''
    Main.shop.createSkinElem()

}

Shop.prototype.buySkin = function () {
    var index = this.dataset.id
    if (Main.stats.score >= Main.skins[index].price) {
        Main.skins[index].owned = true;
        Main.stats.score = (Main.stats.score - Main.skins[index].price)
        Main.stats.scoreElement.innerHTML = Math.trunc(Main.stats.score)
        this.classList.remove('skin--buyButton')
        this.classList.add('skin--equipButton')
        this.innerHTML = 'Equip'
        this.removeEventListener('click', Main.shop.buySkin)
        this.addEventListener('click', Main.shop.changeSkin)
    }
}