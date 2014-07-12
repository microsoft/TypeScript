//// [invalidDoWhileBreakStatements.js]
break;

ONE:
do
    break TWO; while(true);

TWO:
do {
    var x = function () {
        break TWO;
    };
} while(true);

THREE:
do {
    var fn = function () {
        break THREE;
    };
} while(true);

do {
    break FIVE;
    FIVE:
    do {
    } while(true);
} while(true);

NINE:
var y = 12;

do {
    break NINE;
} while(true);
