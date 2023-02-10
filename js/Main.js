
Main = {
    drops: [],
    skins: [],
    coin: '',
    init: function () {
        var stats = new Stats();
        var shop = new Shop();
        //stats.getCryptoData()
        Main.generateSkins();
        shop.createSkinElem();
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
        var Bitcoin = new Skin('Bitcoin','img/bitcoin.png', 0, true, true);
        var Etherum = new Skin('Etherum','img/Etherum.png', 1000, false, false)
        var Cardano = new Skin('Cardano','img/cardano.png', 5000, false, false)
        var Cronos = new Skin('Cronos','img/cronos.png', 20000, false, false)
        
        var Dragonchain = new Skin('Dragonchain','img/dragonchain.png', 50000, false, false)
        var Dogecoin = new Skin('Dogecoin','img/dogecoin.png', 100000, false, false)
        var Pancakeswap = new Skin('Pancakeswap','img/pancakeswap.png', 500000, false, false)
        Main.skins.push(Bitcoin, Etherum, Cardano, Cronos, Dragonchain, Dogecoin, Pancakeswap);
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
