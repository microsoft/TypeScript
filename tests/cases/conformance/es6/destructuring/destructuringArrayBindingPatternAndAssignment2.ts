// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is the type Any, or
var [[a0], [[a1]]] = []         // Error
var [[a2], [[a3]]] = undefined  // Error

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is a tuple- like type (section 3.3.3) with a property named N of a type that is assignable to the target given in E,
//        where N is the numeric index of E in the array assignment pattern, or
var [b0, b1, b2]: [number, boolean, string] = [1, 2, "string"];  // Error
interface J extends Array<Number> {
    2: number;
}

function bar(): J {
    return <[number, number, number]>[1, 2, 3];
}
var [b3 = "string", b4, b5] = bar();  // Error

// V is an array assignment pattern, S is the type Any or an array-like type (section 3.3.2), and, for each assignment element E in V,
//      S is not a tuple- like type and the numeric index signature type of S is assignable to the target given in E.
var temp = [1, 2, 3]
var [c0, c1]: [number, number] = [...temp];  // Error
var [c2, c3]: [string, string] = [...temp];  // Error

interface F {
    [idx: number]: boolean
}

function foo(idx: number): F {
    return {
        2: true
    }
}
var [c4, c5, c6] = foo(1);  // Error