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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B(y) {
        this.y = y;
    }
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C(y, z, w) {
        _super.call(this, y);
        var x = 10 + w;
        var ll = x * w;
    }
    C.prototype.liftxyz = function () { return x + z + this.y; };
    C.prototype.liftxylocllz = function () { return x + z + this.y + this.ll; };
    return C;
})(B);
