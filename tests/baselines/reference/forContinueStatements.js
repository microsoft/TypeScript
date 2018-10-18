//// [forContinueStatements.ts]
for (; ;) {
    continue;
}

ONE:
for (; ;) {
    continue ONE;
}

TWO:
THREE:
for (; ;) {
    continue THREE;
}

FOUR:
for (; ;) {
    FIVE:
    for (; ;) {
        continue FOUR;
    }
}

for (; ;) {
    SIX:
    for (; ;) continue SIX;
}

SEVEN:
for (; ;) for (; ;) for (; ;) continue SEVEN;

EIGHT:
for (; ;) {
    var fn = function () { }
    continue EIGHT;
}


//// [forContinueStatements.js]
for (;;) {
    continue;
}
ONE: for (;;) {
    continue ONE;
}
TWO: THREE: for (;;) {
    continue THREE;
}
FOUR: for (;;) {
    FIVE: for (;;) {
        continue FOUR;
    }
}
for (;;) {
    SIX: for (;;)
        continue SIX;
}
SEVEN: for (;;)
    for (;;)
        for (;;)
            continue SEVEN;
EIGHT: for (;;) {
    var fn = function () { };
    continue EIGHT;
}
