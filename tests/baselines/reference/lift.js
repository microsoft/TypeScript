//// [tests/cases/compiler/lift.ts] ////

//// [lift.ts]
class B {
    constructor(public y:number) {
    }
    public ll:number;  // to be shadowed
}

class C extends B {
    constructor(y:number,z:number,w:number) {
        super(y)
        var x=10+w;
        var ll=x*w;
    }

    public liftxyz () { return x+z+this.y; }
    public liftxylocllz () { return x+z+this.y+this.ll; }
}


//// [lift.js]
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
var B = /** @class */ (function () {
    function B(y) {
        this.y = y;
    }
    return B;
}());
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(y, z, w) {
        var _this = _super.call(this, y) || this;
        var x = 10 + w;
        var ll = x * w;
        return _this;
    }
    C.prototype.liftxyz = function () { return x + z + this.y; };
    C.prototype.liftxylocllz = function () { return x + z + this.y + this.ll; };
    return C;
}(B));
