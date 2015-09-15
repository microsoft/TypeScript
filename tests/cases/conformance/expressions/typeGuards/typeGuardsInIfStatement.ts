// In the true branch statement of an 'if' statement, 
// the type of a variable or parameter is narrowed by any type guard in the 'if' condition when true, 
// provided the true branch statement contains no assignments to the variable or parameter.
// In the false branch statement of an 'if' statement, 
// the type of a variable or parameter is narrowed by any type guard in the 'if' condition when false, 
// provided the false branch statement contains no assignments to the variable or parameter
function foo(x: number | string) {
    if (typeof x === "string") {
        return x.length; // string
    }
    else {
        return x++; // number
    }
}
function foo2(x: number | string) {
    // x is assigned in the if true branch, the type is not narrowed
    if (typeof x === "string") {
        x = 10;
        return x; // string | number
    }
    else {
        return x; // string | number
    }
}
function foo3(x: number | string) {
    // x is assigned in the if true branch, the type is not narrowed
    if (typeof x === "string") {
        x = "Hello"; // even though assigned using same type as narrowed expression
        return x; // string | number
    }
    else {
        return x; // string | number
    }
}
function foo4(x: number | string) {
    // false branch updates the variable - so here it is not number
    if (typeof x === "string") {
        return x; // string | number
    }
    else {
        x = 10; // even though assigned number - this should result in x to be string | number
        return x; // string | number
    }
}
function foo5(x: number | string) {
    // false branch updates the variable - so here it is not number
    if (typeof x === "string") {
        return x; // string | number
    }
    else {
        x = "hello";
        return x; // string | number
    }
}
function foo6(x: number | string) {
    // Modify in both branches
    if (typeof x === "string") {
        x = 10;
        return x; // string | number
    }
    else {
        x = "hello";
        return x; // string | number
    }
}
function foo7(x: number | string | boolean) {
    if (typeof x === "string") {
        return x === "hello"; // string
    }
    else if (typeof x === "boolean") {
        return x; // boolean
    }
    else {
        return x == 10; // number
    }
}
function foo8(x: number | string | boolean) {
    if (typeof x === "string") {
        return x === "hello"; // string
    }
    else {
        var b: number | boolean = x; //  number | boolean
        if (typeof x === "boolean") {
            return x; // boolean
        }
        else {
            return x == 10; // number
        }
    }
}
function foo9(x: number | string) {
    var y = 10;
    if (typeof x === "string") {
        // usage of x or assignment to separate variable shouldn't cause narrowing of type to stop
        y = x.length; 
        return x === "hello"; // string
    }
    else {
        return x == 10; // number
    }
}
function foo10(x: number | string | boolean) {
    // Mixing typeguard narrowing in if statement with conditional expression typeguard
    if (typeof x === "string") {
        return x === "hello"; // string
    }
    else {
        var y: boolean | string;
        var b = x; // number | boolean
        return typeof x === "number"
            ? x === 10 // number
            : x; // x should be boolean
    }
}
function foo11(x: number | string | boolean) {
    // Mixing typeguard narrowing in if statement with conditional expression typeguard
    // Assigning value to x deep inside another guard stops narrowing of type too
    if (typeof x === "string") {
        return x; // string | number | boolean - x changed in else branch
    }
    else {
        var y: number| boolean | string;
        var b = x; // number | boolean | string - because below we are changing value of x in if statement
        return typeof x === "number"
            ? (
            // change value of x
            x = 10 && x.toString() // number | boolean | string
            )
            : (
            // do not change value
            y = x && x.toString() // number | boolean | string
            );
    }
}
function foo12(x: number | string | boolean) {
    // Mixing typeguard narrowing in if statement with conditional expression typeguard
    // Assigning value to x in outer guard shouldn't stop narrowing in the inner expression
    if (typeof x === "string") {
        return x.toString(); // string | number | boolean - x changed in else branch
    }
    else {
        x = 10;
        var b = x; // number | boolean | string
        return typeof x === "number"
            ? x.toString() // number
            : x.toString(); // boolean | string
    }
}