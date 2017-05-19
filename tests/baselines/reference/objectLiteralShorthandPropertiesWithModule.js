//// [objectLiteralShorthandPropertiesWithModule.ts]
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


//// [objectLiteralShorthandPropertiesWithModule.js]
// module export
var m;
(function (m) {
})(m || (m = {}));
(function (m) {
    var z = m.x;
    var y = {
        a: m.x,
        x: m.x
    };
})(m || (m = {}));
