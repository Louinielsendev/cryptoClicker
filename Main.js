var coin
Main = {
    init: function () {
        console.log('init')
        coin = document.querySelector('.coin')
        coin.addEventListener('touchstart', (e) => { scaleCoin(e) })
        coin.addEventListener('touchend', (e) => { scaleCoin(e) })
        coin.addEventListener('mousedown', (e) => { scaleCoin(e) })
        coin.addEventListener('mouseup', (e) => { scaleCoin(e) })

    },
    animate: function () {
        // var animation = window.requestAnimationFrame(Main.animate)
        console.log('ani')
    }
}


function scaleCoin(event) {
    if (event.type === 'mousedown' || event.type === 'touchstart'){
        coin.style.transform = 'scale(.95)'
    }
    else {
        coin.style.transform = 'scale(1)'
    }
}


window.addEventListener('load', Main.init);
window.addEventListener('load', Main.animate); 