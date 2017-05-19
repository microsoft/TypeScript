// @allowUnusedLabels: true

for(var x in {}) {
    continue;
}

ONE:
for(var x in {}) {
    continue ONE;
}

TWO:
THREE:
for(var x in {}) {
    continue THREE;
}

FOUR:
for(var x in {}) {
    FIVE:
    for(var x in {}) {
        continue FOUR;
    }
}

for(var x in {}) {
    SIX:
    for(var x in {}) continue SIX;
}

SEVEN:
for (var x in {}) for (var x in {}) for (var x in {}) continue SEVEN;

EIGHT:
for (var x in {}){
    var fn = function () { }
    continue EIGHT;
}
