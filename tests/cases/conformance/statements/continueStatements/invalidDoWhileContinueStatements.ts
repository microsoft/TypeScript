// @allowUnusedLabels: true
// @allowUnreachableCode: true

// All errors

// naked continue not allowed
continue;

// non-existent label
ONE:
do continue TWO; while (true)

// continue from inside function
TWO:
do {
    var x = () => {
        continue TWO;
    }
}while (true)

THREE:
do {
    var fn = function () {
        continue THREE;
    }
}while (true)

// continue forward
do {
    continue FIVE;
    FIVE:
    do { } while (true)
}while (true)

// label on non-loop statement
NINE:
var y = 12;

do {
    continue NINE;
}while (true)