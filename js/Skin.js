var Skin = function(url, price, active, owned){
    this.Price = price;
    const image = new Image();
    image.src = url;
    this.image = image;
    this.active = active;
    this.owned = active
}