
Main = {
    drops: [],
    skins: [],
    coin: '',
    shop: '',
    stats: '',
    init: function () {
        Main.stats = new Stats();
        Main.stats.setAutoScore()
        Main.shop = new Shop();
        //stats.getCryptoData()
        Main.generateSkins();
        Main.shop.createPowerUpsElem();
        Main.shop.createSkinElem();
        Main.coin = new Coin(Main.stats);
        console.log('init')
        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(Main.coin.image)
        Canvas.element = document.querySelector('canvas');
        Canvas.c = Canvas.element.getContext('2d');
        Canvas.element.height = wrapper.offsetHeight
        Canvas.element.width = wrapper.offsetWidth
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
        Time.getTime

        if (localStorage.getItem('userId') === null) {
            var id = Main.generateId()
            localStorage.setItem('userId', id)
            
        }
        console.log(localStorage.getItem('userId'))
        Main.animate()
    },

    generateId: function () {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    generateSkins: function () {
        var Bitcoin = new Skin('Bitcoin', 'img/bitcoin.png', 0, true, true);
        var Etherum = new Skin('Etherum', 'img/Etherum.png', 3, false, false)
        var Cardano = new Skin('Cardano', 'img/cardano.png', 5, false, false)
        var Cronos = new Skin('Cronos', 'img/cronos.png', 20, false, false)

        var Dragonchain = new Skin('Dragonchain', 'img/dragonchain.png', 50, false, false)
        var Dogecoin = new Skin('Dogecoin', 'img/dogecoin.png', 100, false, false)
        var Pancakeswap = new Skin('Pancakeswap', 'img/pancakeswap.png', 500, false, false)
        Main.skins.push(Bitcoin, Etherum, Cardano, Cronos, Dragonchain, Dogecoin, Pancakeswap);
    },


    animate: function () {
        var animation = window.requestAnimationFrame(Main.animate)

        Canvas.c.fillStyle = '#EFEFEE';
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height)
        Main.drops.forEach((drop, i) => {
            drop.update();

            if (drop.position.y > Canvas.element.height + 350) {
                Main.drops.splice(i, 1)
            }

        });
    }
}





window.addEventListener('load', Main.init);
