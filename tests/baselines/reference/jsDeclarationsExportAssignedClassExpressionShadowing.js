//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedClassExpressionShadowing.ts] ////

//// [index.js]
class A {
    member = new Q();
}
class Q {
    x = 42;
}
module.exports = class Q {
    constructor() {
        this.x = new A();
    }
}
module.exports.Another = Q;


//// [index.js]
var A = /** @class */ (function () {
    function A() {
        this.member = new Q();
    }
    return A;
}());
var Q = /** @class */ (function () {
    function Q() {
        this.x = 42;
    }
    return Q;
}());
module.exports = /** @class */ (function () {
    function Q() {
        this.x = new A();
    }
    return Q;
}());
module.exports.Another = Q;


//// [index.d.ts]
export = Q;
declare class Q {
    x: A;
}
declare namespace Q {
    export { Q_1 as Another };
}
declare class A {
    member: Q;
}
declare class Q_1 {
    x: number;
}
