//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers11.ts] ////

//// [typeOfThisInStaticMembers11.ts]
declare const foo: any;

@foo
class C {
    static a = 1;
    static b = this.a + 1;
}

@foo
class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static foo () {
        return this.c + 1;
    }
    static get fa () {
        return this.c + 1;
    }
    static set fa (v: number) {
        this.c = v + 1;
    }
}

class CC {
    static a = 1;
    static b = this.a + 1;
}

class DD extends CC {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
    static f = () => this.c + 1;
    static ff = function () { this.c + 1 }
    static foo () {
        return this.c + 1;
    }
    static get fa () {
        return this.c + 1;
    }
    static set fa (v: number) {
        this.c = v + 1;
    }
}


//// [typeOfThisInStaticMembers11.js]
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C, "a", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 1
    });
    Object.defineProperty(C, "b", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: (void 0).a + 1
    });
    C = __decorate([
        foo
    ], C);
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(D, "foo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.c + 1;
        }
    });
    Object.defineProperty(D, "fa", {
        get: function () {
            return this.c + 1;
        },
        set: function (v) {
            this.c = v + 1;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(D, "c", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 2
    });
    Object.defineProperty(D, "d", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: (void 0).c + 1
    });
    Object.defineProperty(D, "e", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _super.a + (void 0).c + 1
    });
    Object.defineProperty(D, "f", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function () { return (void 0).c + 1; }
    });
    Object.defineProperty(D, "ff", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function () { this.c + 1; }
    });
    D = __decorate([
        foo
    ], D);
    return D;
}(C));
var CC = /** @class */ (function () {
    function CC() {
    }
    var _a;
    _a = CC;
    Object.defineProperty(CC, "a", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 1
    });
    Object.defineProperty(CC, "b", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.a + 1
    });
    return CC;
}());
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DD, "foo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.c + 1;
        }
    });
    Object.defineProperty(DD, "fa", {
        get: function () {
            return this.c + 1;
        },
        set: function (v) {
            this.c = v + 1;
        },
        enumerable: false,
        configurable: true
    });
    var _b;
    _b = DD;
    Object.defineProperty(DD, "c", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 2
    });
    Object.defineProperty(DD, "d", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _b.c + 1
    });
    Object.defineProperty(DD, "e", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _super.a + _b.c + 1
    });
    Object.defineProperty(DD, "f", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function () { return _b.c + 1; }
    });
    Object.defineProperty(DD, "ff", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function () { this.c + 1; }
    });
    return DD;
}(CC));
