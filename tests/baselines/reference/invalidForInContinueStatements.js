//// [invalidForInContinueStatements.js]
continue;

ONE:
for (var x in {})
    continue TWO;

TWO:
for (var x in {}) {
    var fn = function () {
        continue TWO;
    };
}

THREE:
for (var x in {}) {
    var fn = function () {
        continue THREE;
    };
}

for (var x in {}) {
    continue FIVE;
    FIVE:
    for (var x in {}) {
    }
}

NINE:
var y = 12;

for (var x in {}) {
    continue NINE;
}
