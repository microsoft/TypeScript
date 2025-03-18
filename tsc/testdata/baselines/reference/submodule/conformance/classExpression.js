//// [tests/cases/conformance/classes/classExpression.ts] ////

//// [classExpression.ts]
var x = class C {
}

var y = {
    foo: class C2 {
    }
}

module M {
    var z = class C4 {
    }
}

//// [classExpression.js]
var x = class C {
};
var y = {
    foo: class C2 {
    }
};
var M;
(function (M) {
    var z = class C4 {
    };
})(M || (M = {}));
