//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesErrorWithModule.ts] ////

//// [objectLiteralShorthandPropertiesErrorWithModule.ts]
// module export
var x = "Foo";
module m {
    export var x;
}

module n {
    var z = 10000;
    export var y = {
        m.x  // error
    };
}

m.y.x;


//// [objectLiteralShorthandPropertiesErrorWithModule.js]
// module export
var x = "Foo";
var m;
(function (m) {
})(m || (m = {}));
var n;
(function (n) {
    var z = 10000;
    n.y = {
        m: m,
        : .x // error
    };
})(n || (n = {}));
m.y.x;
