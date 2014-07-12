module Bar {
    export var a = 1;
    function fooA() { return a; } // Correct: return Bar.a

    export var b;
    function fooB() { return b; } // Incorrect: return b
}
