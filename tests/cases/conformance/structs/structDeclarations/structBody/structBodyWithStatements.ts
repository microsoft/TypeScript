struct C {
    var x = 1; // error, variable statement
}

struct C2 {
    function foo() {} // error, function declaration
}

var x = 1;
var y = 2;
struct C3 {
    x: number = y + 1; // ok, not a statement (need var in the statement production).
}