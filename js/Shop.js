var Shop = function () {
    this.shopElem = document.querySelector('.modal')
    this.toggleElem = document.querySelector('.menu-button')
    this.skinParentElem = document.querySelector('.modal--skins')
    this.open = false
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