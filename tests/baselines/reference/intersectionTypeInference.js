//// [intersectionTypeInference.ts]

function extend<T, U>(obj1: T, obj2: U): T & U {
    var result: T & U;
    obj1 = result;
    obj2 = result;
    result = obj1;  // Error
    result = obj2;  // Error
    return result;
}

var x = extend({ a: "hello" }, { b: 42 });
var s = x.a;
var n = x.b;


//// [intersectionTypeInference.js]
function extend(obj1, obj2) {
    var result;
    obj1 = result;
    obj2 = result;
    result = obj1; // Error
    result = obj2; // Error
    return result;
}
var x = extend({ a: "hello" }, { b: 42 });
var s = x.a;
var n = x.b;
