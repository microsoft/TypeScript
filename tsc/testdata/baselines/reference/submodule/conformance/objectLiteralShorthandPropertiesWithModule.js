//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesWithModule.ts] ////

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
    var z = x;
    var y = {
        a: x,
        x
    };
})(m || (m = {}));
