//// [typeGuardMethods.ts]

class A {
    propA: number;
    isA(): this is A {
        return true;
    }
    isC(): this is C {
        return false;
    }
}

class B {
    propB: number;
    isA(): this is A {
        return false;
    }
    isC(): this is C {
        return false;
    }
}

class C extends A {
    propC: number;
    isA(): this is A {
        return false;
    }
    isC(): this is C {
        return true;
    }
}

class D extends C {
    isA(): this is A {
        return false;
    }
    isString(x: any): x is string { // with parameter declaration
        return true;
    }
}

var a: A;

// Basic.
if (a.isC()) {
    a.propC;
}

// Sub type.
var subType: C;
if(subType.isA()) {
    subType.propC;
}

// Union type.
var union: A | B;
if(union.isA()) {
    union.propA;
}

var b: any;
var d = new D;
if(d.isString(b)) {
    b.length;
}

//// [typeGuardMethods.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    A.prototype.isA = function () {
        return true;
    };
    A.prototype.isC = function () {
        return false;
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.isA = function () {
        return false;
    };
    B.prototype.isC = function () {
        return false;
    };
    return B;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    C.prototype.isA = function () {
        return false;
    };
    C.prototype.isC = function () {
        return true;
    };
    return C;
})(A);
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    D.prototype.isA = function () {
        return false;
    };
    D.prototype.isString = function (x) {
        return true;
    };
    return D;
})(C);
var a;
// Basic.
if (a.isC()) {
    a.propC;
}
// Sub type.
var subType;
if (subType.isA()) {
    subType.propC;
}
// Union type.
var union;
if (union.isA()) {
    union.propA;
}
var b;
var d = new D;
if (d.isString(b)) {
    b.length;
}
