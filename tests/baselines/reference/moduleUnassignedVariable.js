//// [moduleUnassignedVariable.ts]
module Bar {
    export var a = 1;
    function fooA() { return a; } // Correct: return Bar.a

    export var b;
    function fooB() { return b; } // Incorrect: return b
}


//// [moduleUnassignedVariable.js]
var Bar;
(function (Bar) {
    Bar.a = 1;
    function fooA() { return Bar.a; } // Correct: return Bar.a
    function fooB() { return Bar.b; } // Incorrect: return b
})(Bar || (Bar = {}));
