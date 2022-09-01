const draw = new Draw();

class Game {
    constructor(startMoney) {
        this.statistics = new Statistics();
        this.wallet = new Wallet(startMoney);
        this.bidInput = document.querySelector('.controls__rate');
        this.lines = document.querySelectorAll('.drum__line');
        document.querySelector('.controls__button').addEventListener('click', this.playGame.bind(this));
        window.addEventListener('DOMContentLoaded', () => {
            document.querySelector('span.money').textContent = startMoney;
        })
    }

    render(results) {
        let i = 0;
        this.lines.forEach((line) => {
            line.style.backgroundColor = draw.gameOptions[results[i++]];
        })
    }

    playGame() {
        if (this.canPlay() === true) {
            this.bidInput.value = Number(this.bidInput.value).toFixed();
            let results = draw.draw();
            this.render(results);
            let gameResult = Result.checkWinner(results);
            this.statistics.updateStatistics(gameResult);
            console.log(gameResult);
            this.wallet.updateMoney(this.bidInput.value, gameResult);
            console.log(typeof this.bidInput.value, this.bidInput.value);
        } else return alert(this.canPlay())
    }
    canPlay() {
        if (this.bidInput.value < 1) return 'You must bid at least 1$!';
        // else if (typeof this.bidInput.value !== Number) return 'Invalid input!'
        else if (this.wallet.checkMoney() < Number(this.bidInput.value)) return 'Not enough money!'
        // else if (this.wallet.checkMoney() <= 0) return 'GAME OVER!'
        else return true;
    }
}