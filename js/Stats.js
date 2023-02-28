var Stats = function () {
    this.score = 0;
    this.streakArray = [];
    this.cryptoBonus = 5;
    this.streakTime = 0
    this.streakMulti = 1;
    this.cpcLevel = 1
    this.acLevel = 0;
    this.scoreElement = document.querySelector('.score')
    this.streakElement = document.querySelector('.streak-multi')
}


Stats.prototype.getCryptoData = function(){
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed86ccbbd2msh29e85e8dad6a702p1d6dbajsnfdfa0e3774c7',
            'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com'
        }
    };
    fetch('https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD', options)
        .then(response => {
            return response.json()})
        .then(data => {
            this.cryptoBonus = data.changes.percent.day
            console.log(this.cryptoBonus)
            document.querySelector('.crypto-bonus').innerHTML = `${this.cryptoBonus}%`;

        })
        .catch(err => console.error(err));
}

Stats.prototype.setAutoScore = function() {
    var self = this
    setInterval(function(){
        var ac = 1 * 1.55**(self.acLevel - 1)
        self.score += ac
        self.setScore()
        self.saveStats()
    }, 1000)
}

Stats.prototype.setClickScore = function () {
    
    this.checkStreak()
    var clickScore = 0
    var cpc = 1 * 2**(this.cpcLevel - 1)
    clickScore = clickScore + cpc
    clickScore = clickScore * this.streakMulti
    clickScore = (clickScore * (this.cryptoBonus / 100 + 1));
    this.score += clickScore
    this.setScore()
}

Stats.prototype.setScore = function(){
    this.scoreElement.innerHTML = Math.trunc(this.score)
}

Stats.prototype.checkStreak = function () {

    const time = Time.current

    this.streakArray.push(time);
    if (this.streakArray.length >= 2) {
        const oldTime = this.streakArray[0]
        const newTime = this.streakArray[1]
        const difference = newTime - oldTime
        if (difference < 800) {
            this.streakTime += difference

        }
        else {
            this.streakTime = 0

        }
        this.streakArray.splice(0, 1)
        this.setStreak()
    }
}

Stats.prototype.setStreak = function () {
    if (this.streakTime < 5000) {
        this.streakMulti = 1
    }
    else if (this.streakTime < 10000) {
        this.streakMulti = 2
    }
    else if (this.streakTime < 20000) {
        this.streakMulti = 3
    }
    else if (this.streakTime < 35000) {
        this.streakMulti = 4
    }
    else {
        this.streakMulti = 5
    }
    this.streakElement.innerHTML = `X${this.streakMulti}`
}

Stats.prototype.saveStats = function(){
    var userId = localStorage.getItem('userId') 
    var xmlhttp = new XMLHttpRequest();   
    xmlhttp.open("GET", `saveStats.php?id=${userId}&score=${this.score}&cpcLevel=${this.cpcLevel}&acLevel=${this.acLevel}`, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


        }
    };
}