
Main = {
    drops: [],
    skins: [],
    coin: '',
    shop: '',
    stats: '',
    init: function () {

        console.log(navigator.userAgent)
        Main.stats = new Stats();
        Main.coin = new Coin()
        Main.shop = new Shop();
        Main.getUser()
        Main.generateSkins();
        Main.stats.setAutoScore()
        //Main.stats.getCryptoData()
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            Main.coin.image.addEventListener('touchstart', () => { Main.coin.clickDown() })
            Main.coin.image.addEventListener('touchend', () => { Main.coin.clickUp() })
        } else {
            Main.coin.image.addEventListener('mousedown', () => { Main.coin.clickDown() })
            Main.coin.image.addEventListener('mouseup', () => { Main.coin.clickUp() })

        }
        Main.shop.toggleElem.addEventListener('click', Main.shop.openShop.bind(Main.shop))
        Main.shop.coinToggleElem.addEventListener('click', Main.shop.closeShop.bind(Main.shop))
        Main.shop.closeElem.addEventListener('click', Main.shop.closeShop.bind(Main.shop))
        Main.shop.acElement.addEventListener('click', Main.shop.addAutoClick.bind(Main.shop))
        Main.shop.cpcElement.addEventListener('click', Main.shop.addCoinsPerClick.bind(Main.shop))
        Main.coin.image.classList.add('coin')

        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(Main.coin.image)
        Canvas.element = document.querySelector('canvas');
        Canvas.c = Canvas.element.getContext('2d');
        Canvas.element.height = wrapper.offsetHeight
        Canvas.element.width = wrapper.offsetWidth
        Canvas.c.fillRect(0, 0, Canvas.element.width, Canvas.element.height);
        Main.animate()
    },

    getUser: function () {
        if (localStorage.getItem('userId') === null) {
            var id = Main.generateId()

            localStorage.setItem('userId', id)
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "newuser.php?q=" + id, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    
                }
            };
            
            Main.shop.createPowerUpsElem();

        }

        else if (localStorage.getItem('userId')) {
            var userId = localStorage.getItem('userId')
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.open("GET", "getUser.php?q=" + userId, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText)
                    var data = JSON.parse(this.responseText)
                    console.log(data)
                    if (data.length < 1) {
                        localStorage.removeItem('userId')
                        Main.getUser()
                    }
                    else {
                        Main.stats.score = Number(data[0].score);
                        Main.stats.cpcLevel = Number(data[0].clickPerCoin);
                        Main.stats.acLevel = Number(data[0].clickPerSecond);
                        Main.stats.setScore();
                        Main.shop.createPowerUpsElem();
                    }

                }
            };
        }
    },

    generateId: function () {
        const characters = '123456789';
        var result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    generateSkins: function () {
        /*var Bitcoin = new Skin('Bitcoin', 0, false, false);
        var Etherum = new Skin('Etherum', 3, false, false)
        var Cardano = new Skin('Cardano', 5, false, false)
        var Cronos = new Skin('Cronos', 20, false, false)
        var Dogecoin = new Skin('Dogecoin', 100, false, false)
        var Pancakeswap = new Skin('Pancakeswap', 500, false, false)
        var Dragonchain = new Skin('Dragonchain', 1000, false, false)
        var Tether = new Skin('Tether', 1500, false, false)
        var YooShi = new Skin('YooShi', 2000, false, false)
        Main.skins.push(Bitcoin, Etherum, Cardano, Cronos, Dogecoin, Pancakeswap, Dragonchain, Tether, YooShi)*/

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", "getSkins.php", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var skinData = JSON.parse(this.responseText)
                skinData.forEach(skinData => {
                    var skin = new Skin(skinData.name, skinData.price, false, false);
                    Main.skins.push(skin)
                });
                Main.getUserSkins()
            }

        }

    },

    getUserSkins: function () {

        var userId = localStorage.getItem('userId')
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", "getUserSkins.php?q=" + userId, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText)
                console.log(data)
                console.log(Main.skins)
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
