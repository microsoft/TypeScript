//// [tests/cases/compiler/typeParameterArgumentEquivalence.ts] ////

//// [typeParameterArgumentEquivalence.ts]
function foo<T>() {
    var x: (item: number) => boolean;
    var y: (item: T) => boolean;
    x = y;  // Should be an error
    y = x;  // Shound be an error
}


//// [typeParameterArgumentEquivalence.js]
function foo() {
    var x;
    var y;
    x = y; // Should be an error
    y = x; // Shound be an error
}
