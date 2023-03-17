/**
 * Objekt för att initiera spelet
 */
Main = {
    options :{
        method: 'GET'
    },
    drops: [],
    skins: [],
    coin: '',
    shop: '',
    stats: '',
    init: function () {

        
        Main.stats = new Stats();
        Main.coin = new Coin()
        Main.shop = new Shop();
        Main.getUser()
        Main.stats.setAutoScore()
        Main.stats.getCryptoData()
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

            fetch("newuser.php?q=" + id, Main.options)
            .then(response => {
                if (!response.ok){
                    throw Error()
                }
            })
            .catch(() => {
                console.log('error')
            })

           
            Main.newUserSkin(id);
            Main.shop.createPowerUpsElem();

        }

        else if (localStorage.getItem('userId')) {
            var userId = localStorage.getItem('userId')
            fetch("getUser.php?q=" + userId, Main.options)
            .then(response => {
               
                if (!response.ok){
                    throw Error(response)
                }
                return response.json()
            })
            .then(data => {
               
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
            })
            .catch(() => {
                console.log('error')
            })
            
        }
    },

    newUserSkin: function(id){
        fetch(`newUserFirstSkin.php?id=${id}`, Main.options)
        .then(response => {
            if (!response.ok){
                throw Error()
            }
            console.log(response)
        })

        .catch(() => {
            console.log('error')
        })

        Main.generateSkins();
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
        
        fetch("getSkins.php", Main.options)
        .then(response => {
            
            if (!response.ok){
                throw Error(response)
            }
            return response.json()
        })
        .then(data => {
            data.forEach(skinData => {
                var skin = new Skin(skinData.name, skinData.price, false, false);
                Main.skins.push(skin)
            });
            Main.getUserSkins()
        })
        .catch(() => {
            console.log('error')
        })
      

    },

    getUserSkins: function () {

        var userId = localStorage.getItem('userId')

        fetch("getUserSkins.php?q=" + userId, Main.options)
        .then(response => {
            if (!response.ok){
                throw Error()
            }
            return response.json()
        })
        .then(data => {
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
        })
        .catch(() => {
            console.log('error')
        })

        
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
