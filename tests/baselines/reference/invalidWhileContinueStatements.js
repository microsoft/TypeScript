//// [invalidWhileContinueStatements.js]
continue;

ONE:
while (true)
    continue TWO;

TWO:
while (true) {
    var x = function () {
        continue TWO;
    };
}

THREE:
while (true) {
    var fn = function () {
        continue THREE;
    };
}

while (true) {
    continue FIVE;
    FIVE:
    while (true) {
    }
}

NINE:
var y = 12;

while (true) {
    continue NINE;
}
