//// [invalidForBreakStatements.js]
break;

ONE:
for (; ;)
    break TWO;

TWO:
for (; ;) {
    var x = function () {
        break TWO;
    };
}

THREE:
for (; ;) {
    var fn = function () {
        break THREE;
    };
}

for (; ;) {
    break FIVE;
    FIVE:
    for (; ;) {
    }
}

NINE:
var y = 12;

for (; ;) {
    break NINE;
}
