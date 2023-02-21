Time = {
    current : '',
    getTime : setInterval(function () {
        Time.current = Date.now();
        
    }, 1)
}