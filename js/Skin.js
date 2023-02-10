var Skin = function(name, url, price, active, owned){
    this.name = name
    this.price = price;
    const image = new Image();
    image.src = url;
    this.image = image;
    this.active = active;
    this.owned = owned
}