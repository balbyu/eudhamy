document.getElementById("one").onclick = runOne;
document.getElementById("two").onclick = runTwo;
document.getElementById("three").onclick = runThree;
document.getElementById("four").onclick = runFour;


function runOne() {
    var num = -9;
    while (num < 19) {
        console.log(num);
        num++;
    }
}

function runTwo() {
    var num = 11;
    while (num < 40) {
        if ((num % 2) == 0) {
            console.log(num);
        }
        num++;
    }
}

function runThree() {
    var num = 301;
    while (num < 333) {
        if ((num % 2) == 1) {
            console.log(num);
        }
        num++;
    }
}

function runFour() {
    var num = 6;
    while (num < 50) {
        if ((num % 5) === 0 && (num % 3) === 0) {
            console.log(num);
        }
        num++;
    }
}