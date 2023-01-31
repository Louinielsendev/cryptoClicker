var Drop = function ({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.width = 20;
    this.height = 20;
}

Drop.prototype.draw = function(){
    c.fillStyle = 'green';
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
}

Drop.prototype.update = function () {
    this.draw()
    this.position.y += this.velocity.y
}