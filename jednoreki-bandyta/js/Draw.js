class Draw {
    constructor() {
        this.lines = document.querySelectorAll('div.drum__line');
        this.gameOptions = ['red', 'green', 'blue'];
    }
    draw() {
        let rolledOptions = [];
        this.lines.forEach(line => {
            const rolledIndex = Math.floor(Math.random() * this.gameOptions.length);
            rolledOptions.push(rolledIndex);
        })
        return rolledOptions;
    }
}