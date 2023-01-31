var canvas
var c

Main = {
    init: function () {
        var coin = new Coin();
        console.log('init')
        const wrapper = document.querySelector('.wrapper')
        wrapper.appendChild(coin.image)
        canvas = document.querySelector('canvas');
        c = canvas.getContext('2d');
        canvas.height = wrapper.offsetHeight
        canvas.width = wrapper.offsetWidth
        c.fillRect(0, 0, canvas.width, canvas.height);
        Main.animate()

    },
    drops: [],

    animate: function () {
        var animation = window.requestAnimationFrame(Main.animate)
        console.log(Main.drops)
        c.fillStyle = 'black';
        c.fillRect(0, 0, canvas.width, canvas.height)
        Main.drops.forEach((drop, i) => {
            drop.update();
        });
    }
}





window.addEventListener('load', Main.init);
