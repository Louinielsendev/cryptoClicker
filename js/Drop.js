/**
 * klass för droppe
 * @param {object, object, number, object}  
 */
var Drop = function ({position, velocity, size, img}) {
    this.position = position;
    this.velocity = velocity;
    this.width = size;
    this.height = size;
    this.image = img
}


/**
 * droppen ritas i canvas-element.
 */
Drop.prototype.draw = function(){
    //Canvas.c.fillStyle = 'green';
    //Canvas.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    Canvas.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
}

/**
 * droppens position uppdateras.
 */
Drop.prototype.update = function () {
    this.draw()
    this.position.y += this.velocity.y
}