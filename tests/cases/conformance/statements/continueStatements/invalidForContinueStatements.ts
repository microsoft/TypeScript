// @allowUnusedLabels: true
// @allowUnreachableCode: true

// All errors

// naked continue not allowed
continue;

// non-existent label
ONE:
for(;;) continue TWO;

// continue from inside function
TWO:
for(;;) {
    var x = () => {
        continue TWO;
    }
}

THREE:
for(;;) {
    var fn = function () {
        continue THREE;
    }
}

// continue forward
for(;;) {
    continue FIVE;
    FIVE:
    for (; ;) { }
}
// label on non-loop statement
NINE:
var y = 12;

for(;;) {
    continue NINE;
}