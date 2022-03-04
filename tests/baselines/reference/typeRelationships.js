//// [typeRelationships.ts]
class C {
    self = this;
    c = new C();
    foo() {
        return this;
    }
    f1() {
        this.c = this.self;
        this.self = this.c;  // Error
    }
    f2() {
        var a: C[];
        var a = [this, this.c];  // C[] since this is subtype of C
        var b: this[];
        var b = [this, this.self, null, undefined];
    }
    f3(b: boolean) {
        return b ? this.c : this.self;  // Should be C
    }
}

class D extends C {
    self1 = this;
    self2 = this.self;
    self3 = this.foo();
    d = new D();
    bar() {
        this.self = this.self1;
        this.self = this.self2;
        this.self = this.self3;
        this.self1 = this.self;
        this.self2 = this.self;
        this.self3 = this.self;
        this.d = this.self;
        this.d = this.c;  // Error
        this.self = this.d;  // Error
        this.c = this.d;
    }
}


//// [typeRelationships.js]
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
        this.self = this;
        this.c = new C();
    }
    C.prototype.foo = function () {
        return this;
    };
    C.prototype.f1 = function () {
        this.c = this.self;
        this.self = this.c; // Error
    };
    C.prototype.f2 = function () {
        var a;
        var a = [this, this.c]; // C[] since this is subtype of C
        var b;
        var b = [this, this.self, null, undefined];
    };
    C.prototype.f3 = function (b) {
        return b ? this.c : this.self; // Should be C
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.self1 = _this;
        _this.self2 = _this.self;
        _this.self3 = _this.foo();
        _this.d = new D();
        return _this;
    }
    D.prototype.bar = function () {
        this.self = this.self1;
        this.self = this.self2;
        this.self = this.self3;
        this.self1 = this.self;
        this.self2 = this.self;
        this.self3 = this.self;
        this.d = this.self;
        this.d = this.c; // Error
        this.self = this.d; // Error
        this.c = this.d;
    };
    return D;
}(C));
