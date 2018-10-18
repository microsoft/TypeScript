//// [objectLiteralShorthandPropertiesWithModuleES6.ts]
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


//// [objectLiteralShorthandPropertiesWithModuleES6.js]
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
