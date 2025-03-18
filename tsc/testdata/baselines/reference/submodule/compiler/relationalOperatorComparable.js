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
    const t = true;
    const f = false;
    let a1 = onethree < two;
    let a2 = onethree < true;
    let a3 = onethree <= false;
    let a4 = onethree >= t;
    let a5 = onethree > f;
    let a6 = true < onethree;
    let a7 = false < two;
    let a8 = 'foo' < onethree;
    let a9 = onethree < 1;
    let a10 = 1 < two;
    let a11 = 2 < 1;
}
