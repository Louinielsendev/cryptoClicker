
Main = {
    drops: [],
    skins: [],
    coin: '',
    shop: '',
    stats: '',
    init: function () {
        Main.stats = new Stats();
        Main.shop = new Shop();
        Main.stats.setAutoScore()
        Main.getUser()
        //Main.stats.getCryptoData()
        Main.generateSkins();

        

        Main.coin = new Coin(Main.stats)
        console.log(localStorage.getItem('userId'))
        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(Main.coin.image)
        Canvas.element = document.querySelector('canvas');
        Canvas.c = Canvas.element.getContext('2d');
        Canvas.element.height = wrapper.offsetHeight
        Canvas.element.width = wrapper.offsetWidth
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
        Time.getTime
        Main.animate()
    },

    getUser: function () {
        if (localStorage.getItem('userId') === null) {
            var id = Main.generateId()

            localStorage.setItem('userId', id)
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log('succé')
                }
            };
            xmlhttp.open("GET", "newuser.php?q=" + id, true);
            xmlhttp.send();
        }

        else {
            var userId = localStorage.getItem('userId')
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("GET", "getUser.php?q=" + userId, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText)
                    Main.stats.score = Number(data[0].score)
                    Main.stats.cpcLevel = Number(data[0].clickPerCoin)
                    Main.stats.acLevel = Number(data[0].clickPerSecond)
                    Main.shop.createPowerUpsElem();
                }
            };
        }
    },

    generateId: function () {
        console.log('hi')
        const characters = '123456789';
        var result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    generateSkins: function () {
        var Bitcoin = new Skin('Bitcoin', 0, false, false);
        var Etherum = new Skin('Etherum', 3, false, false)
        var Cardano = new Skin('Cardano', 5, false, false)
        var Cronos = new Skin('Cronos', 20, false, false)

        var Dragonchain = new Skin('Dragonchain', 50, false, false)
        var Dogecoin = new Skin('Dogecoin', 100, false, false)
        var Pancakeswap = new Skin('Pancakeswap', 500, false, false)
        Main.skins.push(Bitcoin, Etherum, Cardano, Cronos, Dragonchain, Dogecoin, Pancakeswap)


        var userId = localStorage.getItem('userId')
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", "getUserSkins.php?q=" + userId, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText)
                console.log(data)
                data.forEach(skin => {
                    var index = skin.skinId - 1
                    Main.skins[index].owned = true
                    if (skin.equiped == 1) {
                        Main.skins[index].active = true
                    }

                });
                Main.shop.createSkinElem()
                Main.coin.getImageUrl()
            }

        };
    },

    animate: function () {
        var animation = window.requestAnimationFrame(Main.animate)


        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height)
        var background = new Background();
        background.draw();
        Main.drops.forEach((drop, i) => {
            drop.update();

            if (drop.position.y > Canvas.element.height + 350) {
                Main.drops.splice(i, 1)
            }

        });
    }
}





window.addEventListener('load', Main.init);
