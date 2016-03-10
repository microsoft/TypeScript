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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
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
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
        this.self1 = this;
        this.self2 = this.self;
        this.self3 = this.foo();
        this.d = new D();
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
