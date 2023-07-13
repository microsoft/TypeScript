//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandProperties.ts] ////

//// [objectLiteralShorthandProperties.ts]
var a, b, c;

var x1 = {
    a
};

var x2 = {
    a,
}

var x3 = {
    a: 0,
    b,
    c,
    d() { },
    x3,
    parent: x3
};



//// [objectLiteralShorthandProperties.js]
var a, b, c;
var x1 = {
    a: a
};
var x2 = {
    a: a,
};
var x3 = {
    a: 0,
    b: b,
    c: c,
    d: function () { },
    x3: x3,
    parent: x3
};
