//// [invalidDoWhileContinueStatements.js]
continue;

ONE:
do
    continue TWO; while(true);

TWO:
do {
    var x = function () {
        continue TWO;
    };
} while(true);

THREE:
do {
    var fn = function () {
        continue THREE;
    };
} while(true);

do {
    continue FIVE;
    FIVE:
    do {
    } while(true);
} while(true);

NINE:
var y = 12;

do {
    continue NINE;
} while(true);
