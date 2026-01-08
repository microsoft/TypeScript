//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesWithModuleES6.ts] ////

//// [objectLiteralShorthandPropertiesWithModuleES6.ts]
namespace m {
    export var x;
}

namespace m {
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
