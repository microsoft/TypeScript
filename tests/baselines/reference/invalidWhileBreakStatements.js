//// [invalidWhileBreakStatements.js]
break;

ONE:
while (true)
    break TWO;

TWO:
while (true) {
    var x = function () {
        break TWO;
    };
}

THREE:
while (true) {
    var fn = function () {
        break THREE;
    };
}

while (true) {
    break FIVE;
    FIVE:
    while (true) {
    }
}

NINE:
var y = 12;

while (true) {
    break NINE;
}
