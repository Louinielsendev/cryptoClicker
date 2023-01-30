var coin 
Main = {
    init: function () {
        console.log('init')
        coin = document.querySelector('.coin')
        coin.addEventListener('touchstart', function(e){
            scaleCoin(e)
        })
        coin.addEventListener('touchend', function(e){
            scaleCoin(e)
        })
    
    },
    animate: function () {
        // var animation = window.requestAnimationFrame(Main.animate)
        console.log('ani')
    }
}


function scaleCoin(event) {
    
    event.type === 'touchstart' ?
    coin.style.transform = 'scale(.9)' :
    coin.style.transform = 'scale(1)'
}


window.addEventListener('load', Main.init);
window.addEventListener('load', Main.animate); 