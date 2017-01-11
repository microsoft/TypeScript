//// [collisionThisExpressionAndLocalVarWithSuperExperssion.ts]
class a {
    public foo() {
    }
}
class b extends a {
    public foo() {
        var _this = 10;
        var f = () => super.foo();
    }
}
class b2 extends a {
    public foo() {
        var f = () => {
            var _this = 10;
            return super.foo()
        }
    }
}

//// [collisionThisExpressionAndLocalVarWithSuperExperssion.js]
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
var a = (function () {
    function a() {
    }
    a.prototype.foo = function () {
    };
    return a;
}());
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    b.prototype.foo = function () {
        var _this = this;
        var _this = 10;
        var f = function () { return _super.prototype.foo.call(_this); };
    };
    return b;
}(a));
var b2 = (function (_super) {
    __extends(b2, _super);
    function b2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    b2.prototype.foo = function () {
        var _this = this;
        var f = function () {
            var _this = 10;
            return _super.prototype.foo.call(_this);
        };
    };
    return b2;
}(a));
