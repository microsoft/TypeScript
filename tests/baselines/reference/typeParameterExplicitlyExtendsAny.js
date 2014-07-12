//// [typeParameterExplicitlyExtendsAny.ts]
function fee<T>() {
    var t: T;
    t.blah; // Error
    t.toString; // ok
}

function fee2<T extends any>() {
    var t: T;
    t.blah; // Error
    t.toString; // ok
}

//// [typeParameterExplicitlyExtendsAny.js]
function fee() {
    var t;
    t.blah;
    t.toString;
}
function fee2() {
    var t;
    t.blah;
    t.toString;
}
