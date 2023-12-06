//// [tests/cases/compiler/classPropertySharingNameWithTypeParameter.ts] ////

//// [classPropertySharingNameWithTypeParameter.ts]
class Leg {}

class Foo<t> extends Leg {
    t = {} as t

    // should allow this access since t was declared as a property on Foo
    foo = this.t 
}

//// [classPropertySharingNameWithTypeParameter.js]
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
var Leg = /** @class */ (function () {
    function Leg() {
    }
    return Leg;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.t = {};
        // should allow this access since t was declared as a property on Foo
        _this.foo = _this.t;
        return _this;
    }
    return Foo;
}(Leg));
