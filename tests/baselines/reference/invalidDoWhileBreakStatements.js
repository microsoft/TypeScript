//// [invalidDoWhileBreakStatements.ts]
// All errors

// naked break not allowed
break;

// non-existent label
ONE:
do break TWO; while (true)

// break from inside function
TWO:
do {
    var x = () => {
        break TWO;
    }
}while (true)

THREE:
do {
    var fn = function () {
        break THREE;
    }
}while (true)

// break forward
do {
    break FIVE;
    FIVE:
    do { } while (true)
}while (true)

// label on non-loop statement
NINE:
var y = 12;

do {
    break NINE;
}while (true)

//// [invalidDoWhileBreakStatements.js]
// All errors
// naked break not allowed
break;
// non-existent label
ONE: do
    break TWO;
while (true);
// break from inside function
TWO: do {
    var x = function () {
        break TWO;
    };
} while (true);
THREE: do {
    var fn = function () {
        break THREE;
    };
} while (true);
// break forward
do {
    break FIVE;
    FIVE: do { } while (true);
} while (true);
// label on non-loop statement
NINE: var y = 12;
do {
    break NINE;
} while (true);
