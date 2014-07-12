//// [invalidWhileContinueStatements.ts]
// All errors

// naked continue not allowed
continue;

// non-existent label
ONE:
while (true) continue TWO;

// continue from inside function
TWO:
while (true){
    var x = () => {
        continue TWO;
    }
}

THREE:
while (true) {
    var fn = function () {
        continue THREE;
    }
}

// continue forward
while (true) {
    continue FIVE;
    FIVE:
    while (true) { }
}

// label on non-loop statement
NINE:
var y = 12;

while (true) {
    continue NINE;
}

//// [invalidWhileContinueStatements.js]
continue;
ONE: while (true)
    continue TWO;
TWO: while (true) {
    var x = function () {
        continue TWO;
    };
}
THREE: while (true) {
    var fn = function () {
        continue THREE;
    };
}
while (true) {
    continue FIVE;
    FIVE: while (true) {
    }
}
NINE: var y = 12;
while (true) {
    continue NINE;
}
