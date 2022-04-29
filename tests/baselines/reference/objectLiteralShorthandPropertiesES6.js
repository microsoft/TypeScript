//// [objectLiteralShorthandPropertiesES6.ts]
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



//// [objectLiteralShorthandPropertiesES6.js]
var a, b, c;
var x1 = {
    a
};
var x2 = {
    a,
};
var x3 = {
    a: 0,
    b,
    c,
    d() { },
    x3,
    parent: x3
};
