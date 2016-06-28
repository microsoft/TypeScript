//// [cyclicTypeInstantiation.ts]
function foo<T>() {
    var x: {
        a: T;
        b: typeof x;
    };
    return x;
}

function bar<T>() {
    var x: {
        a: T;
        b: typeof x;
    };
    return x;
}

var a = foo<string>();
var b = bar<string>();
// Relating types of a and b produces instantiations of the cyclic anonymous types in foo and bar
a = b;


//// [cyclicTypeInstantiation.js]
function foo() {
    var x;
    return x;
}
function bar() {
    var x;
    return x;
}
var a = foo();
var b = bar();
// Relating types of a and b produces instantiations of the cyclic anonymous types in foo and bar
a = b;
