// Generic call with constraints infering type parameter from object member properties

class C {
    x: string;
}

class D {
    x: string;
    y: string;
}

function foo<T, U extends T>(t: T, t2: U) {
    return (x: T) => t2;
}

var c: C;
var d: D;
var r = foo(c, d);
var r2 = foo(d, c); // error because C does not extend D
var r3 = foo(c, { x: '', foo: c });
var r4 = foo(null, null);
var r5 = foo({}, null);
var r6 = foo(null, {});
var r7 = foo({}, {});
var r8 = foo(() => { }, () => { });
var r9 = foo(() => { }, () => 1);

function other<T, U extends T>() {
    var r4 = foo(c, d);
    var r5 = foo<T, U>(c, d); // error
}

