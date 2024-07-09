//// [tests/cases/conformance/expressions/typeGuards/typeGuardsInRightOperandOfAndAndOperator.ts] ////

//// [typeGuardsInRightOperandOfAndAndOperator.ts]
// In the right operand of a && operation, 
// the type of a variable or parameter is narrowed by any type guard in the left operand when true.
function foo(x: number | string) {
    return typeof x === "string" && x.length === 10; // string
}
function foo2(x: number | string) {
    // modify x in right hand operand
    return typeof x === "string" && ((x = 10) && x); // string | number
}
function foo3(x: number | string) {
    // modify x in right hand operand with string type itself
    return typeof x === "string" && ((x = "hello") && x); // string | number
}
function foo4(x: number | string | boolean) {
    return typeof x !== "string" // string | number | boolean
        && typeof x !== "number"  // number | boolean
        && x;   // boolean
}
function foo5(x: number | string | boolean) {
    // usage of x or assignment to separate variable shouldn't cause narrowing of type to stop
    var b: number | boolean;
    return typeof x !== "string" // string | number | boolean
        && ((b = x) && (typeof x !== "number"  // number | boolean
        && x));   // boolean
}
function foo6(x: number | string | boolean) {
    // Mixing typeguard narrowing in if statement with conditional expression typeguard
    return typeof x !== "string" // string | number | boolean
        && (typeof x !== "number" // number | boolean
        ? x // boolean
        : x === 10) // number 
}
function foo7(x: number | string | boolean) {
    var y: number| boolean | string;
    var z: number| boolean | string;
    // Mixing typeguard narrowing
    return typeof x !== "string"
        && ((z = x) // number | boolean
        && (typeof x === "number"
        // change value of x
        ? ((x = 10) && x.toString()) // x is number
        // do not change value
        : ((y = x) && x.toString()))); // x is boolean
}


//// [typeGuardsInRightOperandOfAndAndOperator.js]
// In the right operand of a && operation, 
// the type of a variable or parameter is narrowed by any type guard in the left operand when true.
function foo(x) {
    return typeof x === "string" && x.length === 10; // string
}
function foo2(x) {
    // modify x in right hand operand
    return typeof x === "string" && ((x = 10) && x); // string | number
}
function foo3(x) {
    // modify x in right hand operand with string type itself
    return typeof x === "string" && ((x = "hello") && x); // string | number
}
function foo4(x) {
    return typeof x !== "string" // string | number | boolean
        && typeof x !== "number" // number | boolean
        && x; // boolean
}
function foo5(x) {
    // usage of x or assignment to separate variable shouldn't cause narrowing of type to stop
    var b;
    return typeof x !== "string" // string | number | boolean
        && ((b = x) && (typeof x !== "number" // number | boolean
            && x)); // boolean
}
function foo6(x) {
    // Mixing typeguard narrowing in if statement with conditional expression typeguard
    return typeof x !== "string" // string | number | boolean
        && (typeof x !== "number" // number | boolean
            ? x // boolean
            : x === 10); // number 
}
function foo7(x) {
    var y;
    var z;
    // Mixing typeguard narrowing
    return typeof x !== "string"
        && ((z = x) // number | boolean
            && (typeof x === "number"
                // change value of x
                ? ((x = 10) && x.toString()) // x is number
                // do not change value
                : ((y = x) && x.toString()))); // x is boolean
}
