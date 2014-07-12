//// [typeArgumentConstraintResolution1.js]
function foo1(test) {
}
foo1(""); // should error

function foo2(test) {
    return null;
}
foo2(""); // Type Date does not satisfy the constraint 'Number' for type parameter 'T extends Number'
