//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsEveryObjectType.ts] ////

//// [classExtendsEveryObjectType.ts]
interface I {
    foo: string;
}
class C extends I { } // error

class C2 extends { foo: string; } { } // error
var x: { foo: string; }
class C3 extends x { } // error

module M { export var x = 1; }
class C4 extends M { } // error

function foo() { }
class C5 extends foo { } // error

class C6 extends []{ } // error

//// [classExtendsEveryObjectType.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(I)); // error
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C2;
}({ foo: string })); // error
var x;
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C3;
}(x)); // error
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C4;
}(M)); // error
function foo() { }
var C5 = /** @class */ (function (_super) {
    __extends(C5, _super);
    function C5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C5;
}(foo)); // error
var C6 = /** @class */ (function (_super) {
    __extends(C6, _super);
    function C6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C6;
}([])); // error
