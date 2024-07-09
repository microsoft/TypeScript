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
var r2 = foo(d, c); // the constraints are self-referencing, no downstream error
var r9 = foo(() => 1, () => { }); // the constraints are self-referencing, no downstream error

function other<T, U extends T>() {
    var r5 = foo<T, U>(c, d); // error
}
