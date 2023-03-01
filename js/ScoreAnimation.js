var ScoreAnimation = function ({position, velocity, size}) {
    this.element = document.createElement('h1')
    this.position = position;
    this.velocity = velocity;
    this.width = size;
    this.height = size;
    this.element.classList.add('scoreAnimation');
    this.element.style.top = position.y
    this.element.style.left = position.x
    this.element.innerHTML = '1'
    document.querySelector('.wrapper').appendChild(this.element)

    
    
}

ScoreAnimation.prototype.draw = function(){
   // Canvas.c.fillText = 'green';
   // Canvas.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //Canvas.c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
}

ScoreAnimation.prototype.update = function () {
    //this.draw()
    this.element.style.top.y += this.velocity.y
}