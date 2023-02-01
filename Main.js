var canvas
var c

Main = {
    init: function () {
        var coin = new Coin();
        console.log('init')
        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(coin.image)
        Canvas.element = document.querySelector('canvas');
        Canvas.c = Canvas.element.getContext('2d');
        Canvas.element.height = wrapper.offsetHeight
        Canvas.element.width = wrapper.offsetWidth
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
        Main.animate()

    },
    drops: [],

    animate: function () {
        var animation = window.requestAnimationFrame(Main.animate)
        Canvas.c.fillStyle = '#EFEFEE ';
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height)
        Main.drops.forEach((drop, i) => {
            drop.update();
            
            if (drop.position.y > Canvas.element.height - drop.height){
                setTimeout(() => {
                    const dropFound = Main.drops.find((drop2) => drop2 === drop)
                    if (dropFound){
                        Main.drops.splice(i, 1)
                        console.log(Main.drops)
                    }
                    
                }, 0)    
               
            }
           
        });
    }
}





window.addEventListener('load', Main.init);
