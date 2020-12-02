//// [derivedGenericClassWithAny.ts]
class C<T extends number> {
    x: T;
    get X(): T { return null; }
    foo(): T {
        return null;
    }
}

class D extends C<number> {
    x: any;
    get X(): any {
        return null;
    }
    foo(): any {
        return 1;
    }

    static y: any;
    static get Y(): any {
        return null;
    }
    static bar(): any {
        return null;
    }
}

// if D is a valid class definition than E is now not safe tranisitively through C
class E<T extends string> extends D {
    x: T;
    get X(): T { return ''; } // error
    foo(): T {
        return ''; // error
    }
}

var c: C<number>;
var d: D;
var e: E<string>;

c = d;
c = e;
var r = c.foo(); // e.foo would return string

//// [derivedGenericClassWithAny.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function () {
    function C() {
    }
    var C_prototype = C.prototype;
    Object.defineProperty(C_prototype, "X", {
        get: function () { return null; },
        enumerable: false,
        configurable: true
    });
    C_prototype.foo = function () {
        return null;
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var D_prototype = D.prototype;
    Object.defineProperty(D_prototype, "X", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    D_prototype.foo = function () {
        return 1;
    };
    Object.defineProperty(D, "Y", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    D.bar = function () {
        return null;
    };
    return D;
}(C));
// if D is a valid class definition than E is now not safe tranisitively through C
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    var E_prototype = E.prototype;
    Object.defineProperty(E_prototype, "X", {
        get: function () { return ''; } // error
        ,
        enumerable: false,
        configurable: true
    });
    E_prototype.foo = function () {
        return ''; // error
    };
    return E;
}(D));
var c;
var d;
var e;
c = d;
c = e;
var r = c.foo(); // e.foo would return string
