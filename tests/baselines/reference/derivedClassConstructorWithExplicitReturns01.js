//// [derivedClassConstructorWithExplicitReturns01.ts]
class C {
    cProp = 10;

    foo() { return "this never gets used."; }

    constructor(value: number) {
        return {
            cProp: value,
            foo() {
                return "well this looks kinda C-ish.";
            }
        }
    }
}

class D extends C {
    dProp = () => this;

    constructor(a = 100) {
        super(a);

        if (Math.random() < 0.5) {
            "You win!"
            return {
                cProp: 1,
                dProp: () => this,
                foo() { return "You win!!!!!" }
            };
        }
        else
            return null;
    }
}

//// [derivedClassConstructorWithExplicitReturns01.js]
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
var C = /** @class */ (function () {
    function C(value) {
        this.cProp = 10;
        return {
            cProp: value,
            foo: function () {
                return "well this looks kinda C-ish.";
            }
        };
    }
    C.prototype.foo = function () { return "this never gets used."; };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(a) {
        if (a === void 0) { a = 100; }
        var _this = _super.call(this, a) || this;
        _this.dProp = function () { return _this; };
        if (Math.random() < 0.5) {
            "You win!";
            return {
                cProp: 1,
                dProp: function () { return _this; },
                foo: function () { return "You win!!!!!"; }
            };
        }
        else
            return null;
    }
    return D;
}(C));
//# sourceMappingURL=derivedClassConstructorWithExplicitReturns01.js.map