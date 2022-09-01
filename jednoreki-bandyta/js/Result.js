class Result {
    static checkWinner(result) {
        if (result[0] === result[1] && result[0] === result[2] || result[0] !== result[1] && result[0] !== result[2] && result[1] !== result[2]) return "win";
        else return "loss"
    }

}