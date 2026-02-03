//// [tests/cases/conformance/classes/members/accessibility/privateStaticNotAccessibleInClodule.ts] ////

//// [privateStaticNotAccessibleInClodule.ts]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    private foo: string;
    private static bar: string;
}

module C {
    export var y = C.bar; // error
}

//// [privateStaticNotAccessibleInClodule.js]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function (C) {
    C.y = C.bar; // error
})(C || (C = {}));
