class C {
    var x = 1;
}

class C2 {
    function foo() {}
}

var x = 1;
var y = 2;
class C3 {
    x: number = y + 1; // ok, need a var in the statement production
}