
Main = {
    drops: [],
    skins: [],
    coin: '',
    init: function () {
        var stats = new Stats();
        var shop = new Shop();
        //stats.getCryptoData()
        Main.generateSkins();
        Main.coin = new Coin(stats);
        console.log('init')
        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(Main.coin.image)
        Canvas.element = document.querySelector('canvas');
        Canvas.c = Canvas.element.getContext('2d');
        Canvas.element.height = wrapper.offsetHeight
        Canvas.element.width = wrapper.offsetWidth
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
        
        Main.animate()
       
    },
    
    generateSkins: function () {
        var bitcoin = new Skin('img/bitcoin.png', 0, true, true);
        var cardano = new Skin('img/cardano.png', 5000, false, false)
        var cronos = new Skin('img/cronos.png', 20000, false, false)
        var etherum = new Skin('img/Etherum.png', 1000, false, false)
        var dragonchain = new Skin('img/dragonchain.png', 50000, false, false)
        var dogecoin = new Skin('img/dogecoin.png', 100000, false, false)
        var pancakeswap = new Skin('img/pancakeswap.png', 500000, false, false)
        Main.skins.push(bitcoin, cardano, cronos, etherum, dragonchain, dogecoin, pancakeswap);
    },

    animate: function () {
        var animation = window.requestAnimationFrame(Main.animate)
    
        Canvas.c.fillStyle = '#EFEFEE';
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height)
        Main.drops.forEach((drop, i) => {
            drop.update();
            
            if (drop.position.y > Canvas.element.height + 350){
                        Main.drops.splice(i, 1)  
            }
           
        });
    }
}





window.addEventListener('load', Main.init);
