//// [tests/cases/compiler/relationalOperatorComparable.ts] ////

//// [relationalOperatorComparable.ts]
function f(onethree: 1 | 3, two: 2) {
    const t = true;
    const f = false;
    let a1 = onethree < two; // ok
    let a2 = onethree < true; // error, number and boolean
    let a3 = onethree <= false; // error, number and boolean
    let a4 = onethree >= t; // error, number and boolean
    let a5 = onethree > f; // error, number and boolean
    let a6 = true < onethree; // error, boolean and number
    let a7 = false < two; // error, boolean and number
    let a8 = 'foo' < onethree; // error, string and number
    let a9 = onethree < 1; // ok
    let a10 = 1 < two; // ok
    let a11 = 2 < 1; // ok
}


//// [relationalOperatorComparable.js]
function f(onethree, two) {
    var t = true;
    var f = false;
    var a1 = onethree < two; // ok
    var a2 = onethree < true; // error, number and boolean
    var a3 = onethree <= false; // error, number and boolean
    var a4 = onethree >= t; // error, number and boolean
    var a5 = onethree > f; // error, number and boolean
    var a6 = true < onethree; // error, boolean and number
    var a7 = false < two; // error, boolean and number
    var a8 = 'foo' < onethree; // error, string and number
    var a9 = onethree < 1; // ok
    var a10 = 1 < two; // ok
    var a11 = 2 < 1; // ok
}
