//// [invalidForBreakStatements.ts]
// All errors

// naked break not allowed
break;

// non-existent label
ONE:
for(;;) break TWO;

// break from inside function
TWO:
for(;;) {
    var x = () => {
        break TWO;
    }
}

THREE:
for(;;) {
    var fn = function () {
        break THREE;
    }
}

// break forward
for(;;) {
    break FIVE;
    FIVE:
    for (; ;) { }
}
// label on non-loop statement
NINE:
var y = 12;

for(;;) {
    break NINE;
}

//// [invalidForBreakStatements.js]
// All errors
// naked break not allowed
break;
// non-existent label
ONE: for (;;)
    break TWO;
// break from inside function
TWO: for (;;) {
    var x = function () {
        break TWO;
    };
}
THREE: for (;;) {
    var fn = function () {
        break THREE;
    };
}
// break forward
for (;;) {
    break FIVE;
    FIVE: for (;;) { }
}
// label on non-loop statement
NINE: var y = 12;
for (;;) {
    break NINE;
}
