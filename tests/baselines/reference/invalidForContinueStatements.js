//// [invalidForContinueStatements.js]
continue;

ONE:
for (; ;)
    continue TWO;

TWO:
for (; ;) {
    var x = function () {
        continue TWO;
    };
}

THREE:
for (; ;) {
    var fn = function () {
        continue THREE;
    };
}

for (; ;) {
    continue FIVE;
    FIVE:
    for (; ;) {
    }
}

NINE:
var y = 12;

for (; ;) {
    continue NINE;
}
