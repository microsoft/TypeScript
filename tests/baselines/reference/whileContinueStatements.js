//// [tests/cases/conformance/statements/continueStatements/whileContinueStatements.ts] ////

//// [whileContinueStatements.ts]
while(true) {
    continue;
} 

while (true) {
    if (true) {
        continue;
    }
}

ONE:

while (true) {
    continue ONE;
}

TWO:
THREE:
while (true) {
    continue THREE;
}

FOUR:
while (true) {
    FIVE:
    while (true) {
        continue FOUR;
    }
}

while (true) {
    SIX:
    while (true)
        continue SIX;
}

SEVEN:
while (true)
    while (true)
        while (true)
            continue SEVEN;

EIGHT:
while (true) {
    var fn = function () { }
    continue EIGHT;
}

NINE:
while (true) {
    if (true) { continue NINE; }
}


//// [whileContinueStatements.js]
while (true) {
    continue;
}
while (true) {
    if (true) {
        continue;
    }
}
ONE: while (true) {
    continue ONE;
}
TWO: THREE: while (true) {
    continue THREE;
}
FOUR: while (true) {
    FIVE: while (true) {
        continue FOUR;
    }
}
while (true) {
    SIX: while (true)
        continue SIX;
}
SEVEN: while (true)
    while (true)
        while (true)
            continue SEVEN;
EIGHT: while (true) {
    var fn = function () { };
    continue EIGHT;
}
NINE: while (true) {
    if (true) {
        continue NINE;
    }
}
