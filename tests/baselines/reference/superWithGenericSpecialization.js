//// [superWithGenericSpecialization.ts]
class C<T> {
    x: T;
}

class D<T> extends C<string> {
    y: T;
    constructor() {
        super(); // uses the type parameter type of the base class, ie string
    }
}

var d: D<number>;
var r: string = d.x;
var r2: number = d.y;

//// [superWithGenericSpecialization.js]
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
    function C() {
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.call(this) || this;
    }
    return D;
}(C));
var d;
var r = d.x;
var r2 = d.y;
