/// <reference path="fourslash.ts" />

//// function double(n: number) { // eval('double') -> double()
////     return n * 2;
//// }
//// let x = 1; // InlineValueVariableLookup for x here
//// if (x === 2) { // eval(x === 2) -> false
////     x *= 2; // this line should NOT be evaluated since it's not the scope or its parents
//// }
//// if (x === 1) { // eval(x === 1) -> true
////     x *= 2; // InlineValueVariableLookup for x here
////     const y = {
////         z: x ** 2, // eval(x ** 2) -> 16
////     };
////     console.log(x/*a*/); // <-- paused here
//// }

verify.getInlineValues({
    position: test.markerByName('a').position,
    expected: []
});
