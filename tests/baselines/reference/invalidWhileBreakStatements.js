//// [tests/cases/conformance/statements/breakStatements/invalidWhileBreakStatements.ts] ////

//// [invalidWhileBreakStatements.ts]
// All errors

// naked break not allowed
break;

// non-existent label
ONE:
while (true) break TWO;

// break from inside function
TWO:
while (true){
    var x = () => {
        break TWO;
    }
}

THREE:
while (true) {
    var fn = function () {
        break THREE;
    }
}

// break forward
while (true) {
    break FIVE;
    FIVE:
    while (true) { }
}

// label on non-loop statement
NINE:
var y = 12;

while (true) {
    break NINE;
}

//// [invalidWhileBreakStatements.js]
// All errors
// naked break not allowed
break;
// non-existent label
ONE: while (true)
    break TWO;
// break from inside function
TWO: while (true) {
    var x = function () {
        break TWO;
    };
}
THREE: while (true) {
    var fn = function () {
        break THREE;
    };
}
// break forward
while (true) {
    break FIVE;
    FIVE: while (true) { }
}
// label on non-loop statement
NINE: var y = 12;
while (true) {
    break NINE;
}
