//// [typeParameterExplicitlyExtendsAny.js]
function fee() {
    var t;
    t.blah; // Error
    t.toString; // ok
}

function fee2() {
    var t;
    t.blah; // Error
    t.toString; // ok
}
