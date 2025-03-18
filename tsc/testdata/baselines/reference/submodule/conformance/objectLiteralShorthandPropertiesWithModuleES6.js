//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesWithModuleES6.ts] ////

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
    var z = x;
    var y = {
        a: x,
        x
    };
})(m || (m = {}));
