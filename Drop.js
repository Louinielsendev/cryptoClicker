var Drop = function ({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 40;
    this.height = 40;
    const image = new Image()
    image.src = './coin.png'
    this.image = image
}

Drop.prototype.draw = function(){
    //Canvas.c.fillStyle = 'green';
    //Canvas.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    Canvas.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
}

Drop.prototype.update = function () {
    this.draw()
    this.position.y += this.velocity.y
}