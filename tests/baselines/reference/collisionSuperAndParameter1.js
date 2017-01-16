//// [collisionSuperAndParameter1.ts]
class Foo {
}

class Foo2 extends Foo {
    x() {
        var lambda = (_super: number) => { // Error 
        }
    }
}

//// [collisionSuperAndParameter1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
var Foo2 = (function (_super) {
    __extends(Foo2, _super);
    function Foo2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Foo2.prototype.x = function () {
        var lambda = function (_super) {
        };
    };
    return Foo2;
}(Foo));
