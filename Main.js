
Main = {
    init: function () {
        var stats = new Stats();
        //stats.getCryptoData()
        var coin = new Coin(stats);
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
    
        Canvas.c.fillStyle = '#EFEFEE';
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height)
        Main.drops.forEach((drop, i) => {
            drop.update();
            
            if (drop.position.y > Canvas.element.height + 250){
                        Main.drops.splice(i, 1)  
            }
           
        });
    }
}





window.addEventListener('load', Main.init);
