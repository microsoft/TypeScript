//// [protectedClassPropertyAccessibleWithinSubclass.ts]
// no errors

class B {
    protected x: string;
    protected static x: string;
}

class C extends B {
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.x; }
    protected bar() { return this.foo(); }

    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.x; }
    protected static bar() { this.foo(); }
}


//// [protectedClassPropertyAccessibleWithinSubclass.js]
// no errors
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B() {
    }
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(C.prototype, "y", {
        get: function () { return this.x; },
        set: function (x) { this.y = this.x; },
        enumerable: true,
        configurable: true
    });
    C.prototype.foo = function () { return this.x; };
    C.prototype.bar = function () { return this.foo(); };
    Object.defineProperty(C, "y", {
        get: function () { return this.x; },
        set: function (x) { this.y = this.x; },
        enumerable: true,
        configurable: true
    });
    C.foo = function () { return this.x; };
    C.bar = function () { this.foo(); };
    return C;
})(B);
