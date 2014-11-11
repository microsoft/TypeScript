// @target: es6
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

module m {
    export var x;
}

module m {
    var z = x;
    var y = {
        a: x,
        x
    };
}
