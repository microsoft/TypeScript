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
"use strict";
var m;
(function (m) {
})(m || (m = {}));
(function (m) {
    var z = x;
    var y = {
        a: x,
        x
    };
})(m || (m = {}));
