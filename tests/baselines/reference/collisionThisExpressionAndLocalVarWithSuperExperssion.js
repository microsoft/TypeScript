//// [tests/cases/compiler/collisionThisExpressionAndLocalVarWithSuperExperssion.ts] ////

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
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.foo = function () {
    };
    return a;
}());
var b = /** @class */ (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    b.prototype.foo = function () {
        var _this_1 = this;
        var _this = 10;
        var f = function () { return _super.prototype.foo.call(_this_1); };
    };
    return b;
}(a));
var b2 = /** @class */ (function (_super) {
    __extends(b2, _super);
    function b2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    b2.prototype.foo = function () {
        var _this_1 = this;
        var f = function () {
            var _this = 10;
            return _super.prototype.foo.call(_this_1);
        };
    };
    return b2;
}(a));
