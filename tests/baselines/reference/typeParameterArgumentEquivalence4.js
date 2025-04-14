//// [tests/cases/compiler/typeParameterArgumentEquivalence4.ts] ////

//// [typeParameterArgumentEquivalence4.ts]
function foo<T,U>() {
    var x: (item) => U;
    var y: (item) => T;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}


//// [typeParameterArgumentEquivalence4.js]
function foo() {
    var x;
    var y;
    x = y; // Should be an error
    y = x; // Shound be an error
}
