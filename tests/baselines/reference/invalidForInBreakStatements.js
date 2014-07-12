//// [invalidForInBreakStatements.js]
break;

ONE:
for (var x in {})
    break TWO;

TWO:
for (var x in {}) {
    var fn = function () {
        break TWO;
    };
}

THREE:
for (var x in {}) {
    var fn = function () {
        break THREE;
    };
}

for (var x in {}) {
    break FIVE;
    FIVE:
    for (var x in {}) {
    }
}

NINE:
var y = 12;

for (var x in {}) {
    break NINE;
}
