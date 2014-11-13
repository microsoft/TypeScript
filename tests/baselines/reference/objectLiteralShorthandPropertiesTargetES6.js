//// [objectLiteralShorthandPropertiesTargetES6.ts]
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


//// [objectLiteralShorthandPropertiesTargetES6.js]
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
    d: function () {
    },
    x3,
    parent: x3
};
var m;
(function (m) {
    m.x;
})(m || (m = {}));
var m;
(function (m) {
    var z = m.x;
    var y = {
        a: m.x,
        x: m.x
    };
})(m || (m = {}));
