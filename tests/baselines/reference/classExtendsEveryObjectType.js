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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(I); // error
var C2 = (function () {
    function C2() {
    }
    return C2;
})();
{
} // error
var x;
var C3 = (function (_super) {
    __extends(C3, _super);
    function C3() {
        _super.apply(this, arguments);
    }
    return C3;
})(x); // error
var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
var C4 = (function (_super) {
    __extends(C4, _super);
    function C4() {
        _super.apply(this, arguments);
    }
    return C4;
})(M); // error
function foo() {
}
var C5 = (function (_super) {
    __extends(C5, _super);
    function C5() {
        _super.apply(this, arguments);
    }
    return C5;
})(foo); // error
var C6 = (function () {
    function C6() {
    }
    return C6;
})();
[];
{
} // error
