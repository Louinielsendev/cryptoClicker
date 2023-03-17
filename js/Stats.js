/**
 * klass för statistik
 */
var Stats = function () {
    this.score = 0;
    this.streakArray = [];
    this.cryptoProcent = 0;
    this.cryptoBonus = 1
    this.streakTime = 0
    this.streakMulti = 1;
    this.cpcLevel = 1
    this.acLevel = 1;
    this.scoreElement = document.querySelector('.score')
    this.streakElement = document.querySelector('.streak-multi')
}

/**
 * Hämtar data om Bitcoin från api
 */
Stats.prototype.getCryptoData = function () {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ed86ccbbd2msh29e85e8dad6a702p1d6dbajsnfdfa0e3774c7',
            'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com'
        }
    };
    fetch('https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD', options)
        .then(response => {
            if (!response.ok) {
                throw Error()
            }
            return response.json()
        })
        .then(data => {
            this.cryptoProcent = data.changes.percent.day
            Main.stats.getCryptoBounus();


        })
        .catch(() => {
            var error = new Error()
            error.display()
            document.querySelector('.crypto-bonus').innerHTML = `-`;
        }

        );
}

/**
 * genererar nya mynt varje sekund
 */
Stats.prototype.setAutoScore = function () {
    var self = this
    setInterval(function () {
        var ac = 1 * 1.55 ** (self.acLevel - 1)
        self.score += ac
        self.setScore()
        self.saveStats()
    }, 1000)
}

/**
 * genererar mynt varje gång en användare klickar
 */
Stats.prototype.setClickScore = function () {

    var clickScore = 0
    var cpc = 1 * 2 ** (this.cpcLevel - 1)
    clickScore = clickScore + cpc
    clickScore = clickScore * this.streakMulti
    clickScore = (clickScore * this.cryptoBonus);
    this.score += clickScore
    this.setScore()
    this.checkStreak()
}

/**
 * skriver ut poängen
 */
Stats.prototype.setScore = function () {
    this.scoreElement.innerHTML = new Intl.NumberFormat("de-DE").format(Math.trunc(this.score))
}

/**
 * Kollar så att användare klickar tillräckligt snabbt för att behålla sin streak
 */
Stats.prototype.checkStreak = function () {

    const time = Date.now()

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

/**
 * ger bonus beroende på hur länge användare har klickat.
 */
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


/**
 * sparar användarens statistik i databasen.
 */
Stats.prototype.saveStats = function () {
   
    var userId = localStorage.getItem('userId')
    fetch(`saveStats.php?id=${userId}&score=${this.score}&cpcLevel=${this.cpcLevel}&acLevel=${this.acLevel}`, Main.options)
            .then(response => {
                if (!response.ok) {
                    throw Error()
                }
            })
            .catch(() => {
                console.log('error')
            })
   
}

Stats.prototype.getCryptoBounus = function () {

    if (this.cryptoProcent > 0 && this.cryptoProcent < 1) {
        this.cryptoBonus = 1.2
    }
    else if (this.cryptoProcent > 0 && this.cryptoProcent < 2) {
        this.cryptoBonus = 1.5
    }
    else if (this.cryptoProcent > 2) {
        this.cryptoBonus = 2

    }
    else {
        this.cryptoBonus = 1
    }
    document.querySelector('.crypto-bonus').innerHTML = `X${this.cryptoBonus}`;

}