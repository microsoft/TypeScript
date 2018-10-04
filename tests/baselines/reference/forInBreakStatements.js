//// [forInBreakStatements.ts]
for(var x in {}) {
    break;
}

ONE:
for(var x in {}) {
    break ONE;
}

TWO:
THREE:
for(var x in {}) {
    break THREE;
}

FOUR:
for(var x in {}) {
    FIVE:
    for(var x in {}) {
        break FOUR;
    }
}

for(var x in {}) {
    SIX:
    for(var x in {}) break SIX;
}

SEVEN:
for (var x in {}) for (var x in {}) for (var x in {}) break SEVEN;

EIGHT:
for (var x in {}){
    var fn = function () { }
    break EIGHT;
}


//// [forInBreakStatements.js]
for (var x in {}) {
    break;
}
ONE: for (var x in {}) {
    break ONE;
}
TWO: THREE: for (var x in {}) {
    break THREE;
}
FOUR: for (var x in {}) {
    FIVE: for (var x in {}) {
        break FOUR;
    }
}
for (var x in {}) {
    SIX: for (var x in {})
        break SIX;
}
SEVEN: for (var x in {})
    for (var x in {})
        for (var x in {})
            break SEVEN;
EIGHT: for (var x in {}) {
    var fn = function () { };
    break EIGHT;
}
