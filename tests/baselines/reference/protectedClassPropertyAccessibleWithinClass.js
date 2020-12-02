//// [protectedClassPropertyAccessibleWithinClass.ts]
// no errors

class C {
    protected x: string;
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.foo; }

    protected static x: string;
    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.foo; }
    protected static bar() { this.foo(); }
}

// added level of function nesting
class C2 {
    protected x: string;
    protected get y() { () => this.x; return null; }
    protected set y(x) { () => { this.y = this.x; } }
    protected foo() { () => this.foo; }

    protected static x: string;
    protected static get y() { () => this.x; return null; }
    protected static set y(x) {
        () => { this.y = this.x; }
     }
    protected static foo() { () => this.foo; }
    protected static bar() { () => this.foo(); }
}


//// [protectedClassPropertyAccessibleWithinClass.js]
// no errors
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    Object.defineProperty(C_prototype, "y", {
        get: function () { return this.x; },
        set: function (x) { this.y = this.x; },
        enumerable: false,
        configurable: true
    });
    C_prototype.foo = function () { return this.foo; };
    Object.defineProperty(C, "y", {
        get: function () { return this.x; },
        set: function (x) { this.y = this.x; },
        enumerable: false,
        configurable: true
    });
    C.foo = function () { return this.foo; };
    C.bar = function () { this.foo(); };
    return C;
}());
// added level of function nesting
var C2 = /** @class */ (function () {
    function C2() {
    }
    var C2_prototype = C2.prototype;
    Object.defineProperty(C2_prototype, "y", {
        get: function () {
            var _this = this;
            (function () { return _this.x; });
            return null;
        },
        set: function (x) {
            var _this = this;
            (function () { _this.y = _this.x; });
        },
        enumerable: false,
        configurable: true
    });
    C2_prototype.foo = function () {
        var _this = this;
        (function () { return _this.foo; });
    };
    Object.defineProperty(C2, "y", {
        get: function () {
            var _this = this;
            (function () { return _this.x; });
            return null;
        },
        set: function (x) {
            var _this = this;
            (function () { _this.y = _this.x; });
        },
        enumerable: false,
        configurable: true
    });
    C2.foo = function () {
        var _this = this;
        (function () { return _this.foo; });
    };
    C2.bar = function () {
        var _this = this;
        (function () { return _this.foo(); });
    };
    return C2;
}());
