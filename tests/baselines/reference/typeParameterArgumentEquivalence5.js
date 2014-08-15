//// [typeParameterArgumentEquivalence5.ts]
function foo<T,U>() {
    var x: () => (item) => U;
    var y: () => (item) => T;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}


//// [typeParameterArgumentEquivalence5.js]
function foo() {
    var x;
    var y;
    x = y; // Should be an error
    y = x; // Shound be an error
}
