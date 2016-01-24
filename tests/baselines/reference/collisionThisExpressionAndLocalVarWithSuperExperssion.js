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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        _super.apply(this, arguments);
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
        _super.apply(this, arguments);
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
