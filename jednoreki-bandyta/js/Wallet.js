class Wallet {
    constructor(startMoney) {
        this._money = startMoney;
        this.spanMoney = document.querySelector('span.money');
        this.winMultiplier = 3;
    }
    updateMoney(value, result) {
        if (result === "win") {
            this._money += Number(value) * this.winMultiplier;
        }
        this._money -= Number(value);
        this.spanMoney.textContent = this.checkMoney();
    }
    checkMoney() {
        return this._money;
    }
}