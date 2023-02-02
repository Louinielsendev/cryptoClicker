var Stats = function (){
    this.score = 0;
    this.streak = false;
    this.streakMulti = 1;
    this.streakArray = [];
    this.cryptoBonus = 0;
}


/*Stats.prototype.getCryptoData = function(){
    
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
            document.querySelector('.crypto-bonus').innerHTML = `${this.cryptoBonus}%`
        })
        .catch(err => console.error(err));
} */

Stats.prototype.setScore = function(){
    this.checkStreak()
    this.score += (1 * (this.cryptoBonus /100 + 1)); 
    
    document.querySelector('.score').innerHTML = Math.trunc(this.score)
}

Stats.prototype.checkStreak = function(){
    const time = Date.now();
    this.streakArray.push(time);
    if (this.streakArray.length >= 2){
        console.log(this.streakArray)
        const oldTime = this.streakArray[0]
        const newTime = this.streakArray[1]
        const difference = newTime - oldTime
        console.log(difference)
        if (difference < 800){
            this.streak = true
            
        }
        else {
            this.streak = false
        }
        if (this.streak){
            
        }
        this.streakArray.splice(0, 1)
        console.log(this.streak)
    }
}