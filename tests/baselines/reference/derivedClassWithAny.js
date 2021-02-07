//// [derivedClassWithAny.ts]
class C {
    x: number;
    get X(): number { return 1; }
    foo(): number {
        return 1;
    }

    static y: number;
    static get Y(): number {
        return 1;
    }
    static bar(): number {
        return 1;
    }
}

class D extends C {
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
class E extends D {
    x: string;
    get X(): string{ return ''; }
    foo(): string {
        return '';
    }

    static y: string;
    static get Y(): string {
        return '';
    }
    static bar(): string {
        return '';
    }
}

var c: C;
var d: D;
var e: E;

c = d;
c = e;
var r = c.foo(); // e.foo would return string


//// [derivedClassWithAny.js]
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
    Object.defineProperty(C.prototype, "X", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    C.prototype.foo = function () {
        return 1;
    };
    Object.defineProperty(C, "Y", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    C.bar = function () {
        return 1;
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(D.prototype, "X", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    D.prototype.foo = function () {
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
    Object.defineProperty(E.prototype, "X", {
        get: function () { return ''; },
        enumerable: false,
        configurable: true
    });
    E.prototype.foo = function () {
        return '';
    };
    Object.defineProperty(E, "Y", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    E.bar = function () {
        return '';
    };
    return E;
}(D));
var c;
var d;
var e;
c = d;
c = e;
var r = c.foo(); // e.foo would return string
