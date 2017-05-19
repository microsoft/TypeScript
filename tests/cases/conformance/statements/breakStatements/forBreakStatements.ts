// @allowUnusedLabels: true
// @allowUnreachableCode: true

for (; ;) {
    break;
}

ONE:
for (; ;) {
    break ONE;
}

TWO:
THREE:
for (; ;) {
    break THREE;
}

FOUR:
for (; ;) {
    FIVE:
    for (; ;) {
        break FOUR;
    }
}

for (; ;) {
    SIX:
    for (; ;) break SIX;
}

SEVEN:
for (; ;) for (; ;) for (; ;) break SEVEN;

EIGHT:
for (; ;) {
    var fn = function () { }
    break EIGHT;
}
