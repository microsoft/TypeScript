//// [objectLiteralShorthandProperties3.ts]
// module export

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


//// [objectLiteralShorthandProperties3.js]
// module export
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
