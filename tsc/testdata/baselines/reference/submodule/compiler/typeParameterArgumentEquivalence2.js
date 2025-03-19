//// [tests/cases/compiler/typeParameterArgumentEquivalence2.ts] ////

//// [typeParameterArgumentEquivalence2.ts]
function foo<T,U>() {
    var x: (item: U) => boolean;
    var y: (item: T) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}


//// [typeParameterArgumentEquivalence2.js]
function foo() {
    var x;
    var y;
    x = y; // Should be an error
    y = x; // Shound be an error
}
