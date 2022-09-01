class Statistics {
    constructor() {
        this.results = {
            games: 0,
            wins: 0,
            losses: 0
        }
        this.spanWallet = document.querySelector('span.money');
        this.spanGames = document.querySelector('span.count');
        this.spanWins = document.querySelector('span.wins');
        this.spanLosses = document.querySelector('span.losses');
    }
    updateStatistics(results) {
        if (results === "win") {
            this.spanWins.textContent = ++this.results.wins;
        } else {
            this.spanLosses.textContent = ++this.results.losses;
        }
        this.spanGames.textContent = ++this.results.games;
    }

}