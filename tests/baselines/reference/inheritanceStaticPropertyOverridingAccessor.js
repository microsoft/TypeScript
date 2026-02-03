//// [tests/cases/compiler/inheritanceStaticPropertyOverridingAccessor.ts] ////

//// [inheritanceStaticPropertyOverridingAccessor.ts]
class a {
    static get x(): () => string {
        return null;;
    }
    static set x(aValue: () => string) {
    }
}

class b extends a {
    static x: () => string;
}

//// [inheritanceStaticPropertyOverridingAccessor.js]
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
    Object.defineProperty(a, "x", {
        get: function () {
            return null;
            ;
        },
        set: function (aValue) {
        },
        enumerable: false,
        configurable: true
    });
    return a;
}());
var b = /** @class */ (function (_super) {
    __extends(b, _super);
    function b() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return b;
}(a));
