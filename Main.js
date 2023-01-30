Main = {
    init : function (){
        console.log('init')
    },
    animate : function () {
       // var animation = window.requestAnimationFrame(Main.animate)
        console.log('ani')
    }
}

window.addEventListener('load', Main.init); 
window.addEventListener('load', Main.animate); 