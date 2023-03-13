function Error (){
    this.message = 'The Crypto Bonus is not avalible at this moment'
    this.messageElem = document.querySelector('.errorModal--message')
    this.buttonElem = document.querySelector('.errorModal--button')
    this.errorElem = document.querySelector('.errorModal')
}

Error.prototype.display = function() {
    this.errorElem.style.display = 'flex'
    this.messageElem.innerHTML = this.message
     
    this.buttonElem.addEventListener('click', this.close.bind(this))

}

Error.prototype.close = function(){
    this.errorElem.style.display = 'none'
}