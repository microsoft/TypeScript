//// [tests/cases/compiler/baseCheck.ts] ////

//// [baseCheck.ts]
class C { constructor(x: number, y: number) { } }
class ELoc extends C {
    constructor(x: number) {
        super(0, x);
    }
}
class ELocVar extends C {  
    constructor(x: number) {
        super(0, loc);
    }

    m() {
        var loc=10;
    }
}

class D extends C { constructor(public z: number) { super(this.z) }  } // too few params
class E extends C { constructor(public z: number) { super(0, this.z) } }
class F extends C { constructor(public z: number) { super("hello", this.z) } } // first param type

function f() {
    if (x<10) {
      x=11;
    }
    else {
        x=12;
    }
}


//// [baseCheck.js]
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
    function C(x, y) {
    }
    return C;
}());
var ELoc = /** @class */ (function (_super) {
    __extends(ELoc, _super);
    function ELoc(x) {
        return _super.call(this, 0, x) || this;
    }
    return ELoc;
}(C));
var ELocVar = /** @class */ (function (_super) {
    __extends(ELocVar, _super);
    function ELocVar(x) {
        return _super.call(this, 0, loc) || this;
    }
    ELocVar.prototype.m = function () {
        var loc = 10;
    };
    return ELocVar;
}(C));
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(z) {
        var _this = _super.call(this, _this.z) || this;
        _this.z = z;
        return _this;
    }
    return D;
}(C)); // too few params
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E(z) {
        var _this = _super.call(this, 0, _this.z) || this;
        _this.z = z;
        return _this;
    }
    return E;
}(C));
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F(z) {
        var _this = _super.call(this, "hello", _this.z) || this;
        _this.z = z;
        return _this;
    }
    return F;
}(C)); // first param type
function f() {
    if (x < 10) {
        x = 11;
    }
    else {
        x = 12;
    }
}
