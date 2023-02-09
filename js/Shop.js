var Shop = function(){
    this.shopElem = document.querySelector('.modal')
    this.toggleElem = document.querySelector('.menu-button')
    this.open = false
    this.toggleElem.addEventListener('click', this.openShop.bind(this))
}

Shop.prototype.openShop = function (){
    if (!this.open){
        this.open = true
        this.shopElem.style.height = '80%'
    }
    else{
        this.open = false
        this.shopElem.style.height = '0'
    }
}