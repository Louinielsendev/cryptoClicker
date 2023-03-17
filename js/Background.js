/**
 * Klass för bakgrund.
 */
var Background = function(){
    this.position = {
        x: 0,
        y: 0
    }
    this.width = Canvas.element.width;
    this.height = Canvas.element.height;
    const image = new Image();
    image.src = './img/background.jpg';
    this.image = image;
}

/**
 * Ritar ut bakgrunden på canvas-element.
 */
Background.prototype.draw = function(){
    Canvas.c.drawImage(this.image, this.position.x , this.position.y , this.width, this.height);
}