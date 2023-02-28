var Skin = function(name, price, active, owned){
    this.name = name
    this.price = price;
    const image = new Image();
    image.src = `img/${this.name}.png`;
    this.image = image;
    this.active = active;
    this.owned = owned
}