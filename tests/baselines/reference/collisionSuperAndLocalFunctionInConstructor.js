//// [collisionSuperAndLocalFunctionInConstructor.ts]
function _super() { // No error
}
class Foo {
    constructor() {
        function _super() { // No error
        }
    }
}
class b extends Foo {
    constructor() {
        super();
        function _super() { // Should be error
        }
    }
}
class c extends Foo {
    constructor() {
        super();
        var x = () => {
            function _super() { // Should be error
            }
        }
    }
}

//// [collisionSuperAndLocalFunctionInConstructor.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function _super() {
}
var Foo = (function () {
    function Foo() {
        function _super() {
        }
    }
    return Foo;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.call(this);
        function _super() {
        }
    }
    return b;
}(Foo));
var c = (function (_super) {
    __extends(c, _super);
    function c() {
        _super.call(this);
        var x = function () {
            function _super() {
            }
        };
    }
    return c;
}(Foo));
