//// [typeGuardsInRightOperandOfOrOrOperator.ts]
// In the right operand of a || operation, 
// the type of a variable or parameter is narrowed by any type guard in the left operand when false, 
// provided the right operand contains no assignments to the variable or parameter.
function foo(x: number | string) {
    return typeof x !== "string" || x.length === 10; // string
}
function foo2(x: number | string) {
    // modify x in right hand operand
    return typeof x !== "string" || ((x = 10) || x); // string | number
}
function foo3(x: number | string) {
    // modify x in right hand operand with string type itself
    return typeof x !== "string" || ((x = "hello") || x); // string | number
}
function foo4(x: number | string | boolean) {
    return typeof x === "string" // string | number | boolean
        || typeof x === "number"  // number | boolean
        || x;   // boolean
}
function foo5(x: number | string | boolean) {
    // usage of x or assignment to separate variable shouldn't cause narrowing of type to stop
    var b: number | boolean;
    return typeof x === "string" // string | number | boolean
        || ((b = x) || (typeof x === "number"  // number | boolean
        || x));   // boolean
}
function foo6(x: number | string | boolean) {
    // Mixing typeguard
    return typeof x === "string" // string | number | boolean
        || (typeof x !== "number" // number | boolean
        ? x // boolean
        : x === 10) // number 
}
function foo7(x: number | string | boolean) {
    var y: number| boolean | string;
    var z: number| boolean | string;
    // Mixing typeguard narrowing
    // Assigning value to x deep inside another guard stops narrowing of type too
    return typeof x === "string"
        || ((z = x) // string | number | boolean - x changed deeper in conditional expression
        || (typeof x === "number"
        // change value of x
        ? (x = 10 && x.toString()) // number | boolean | string
        // do not change value
        : (y = x && x.toString()))); // number | boolean | string
}
function foo8(x: number | string) {
    // Mixing typeguard 
    // Assigning value to x in outer guard shouldn't stop narrowing in the inner expression
    return typeof x === "string"
        || (x = 10) // change x - number| string
        || (typeof x === "number"
        ? x // number
        : x.length); // string
}

//// [typeGuardsInRightOperandOfOrOrOperator.js]
// In the right operand of a || operation, 
// the type of a variable or parameter is narrowed by any type guard in the left operand when false, 
// provided the right operand contains no assignments to the variable or parameter.
function foo(x) {
    return typeof x !== "string" || x.length === 10; // string
}
function foo2(x) {
    // modify x in right hand operand
    return typeof x !== "string" || ((x = 10) || x); // string | number
}
function foo3(x) {
    // modify x in right hand operand with string type itself
    return typeof x !== "string" || ((x = "hello") || x); // string | number
}
function foo4(x) {
    return typeof x === "string" || typeof x === "number" || x; // boolean
}
function foo5(x) {
    // usage of x or assignment to separate variable shouldn't cause narrowing of type to stop
    var b;
    return typeof x === "string" || ((b = x) || (typeof x === "number" || x)); // boolean
}
function foo6(x) {
    // Mixing typeguard
    return typeof x === "string" || (typeof x !== "number" ? x : x === 10); // number 
}
function foo7(x) {
    var y;
    var z;
    // Mixing typeguard narrowing
    // Assigning value to x deep inside another guard stops narrowing of type too
    return typeof x === "string" || ((z = x) || (typeof x === "number" ? (x = 10 && x.toString()) : (y = x && x.toString()))); // number | boolean | string
}
function foo8(x) {
    // Mixing typeguard 
    // Assigning value to x in outer guard shouldn't stop narrowing in the inner expression
    return typeof x === "string" || (x = 10) || (typeof x === "number" ? x : x.length); // string
}
