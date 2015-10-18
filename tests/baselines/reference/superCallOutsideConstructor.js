//// [superCallOutsideConstructor.ts]
class C {
    foo() { }
}
 
class D extends C {
    x = super(); 
 
    constructor() {
        super();
 
        var y = () => {
            super(); 
        }

        var y2 = function() {
            super();
        }
    }
}
 
var d = new D();


//// [superCallOutsideConstructor.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
})();
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.call(this);
        this.x = _super.call(this);
        var y = function () {
            _super.call(this);
        };
        var y2 = function () {
            _super.call(this);
        };
    }
    return D;
})(C);
var d = new D();
