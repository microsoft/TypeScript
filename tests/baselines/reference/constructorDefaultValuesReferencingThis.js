//// [tests/cases/conformance/classes/constructorDeclarations/constructorParameters/constructorDefaultValuesReferencingThis.ts] ////

//// [constructorDefaultValuesReferencingThis.ts]
class C {
    public baseProp = 1;
    constructor(x = this) { }
}

class D<T> {
    constructor(x = this) { }
}

class E<T> {
    constructor(public x = this) { }
}

class F extends C {
    constructor(y = this.baseProp) {
        super();
    }
}


//// [constructorDefaultValuesReferencingThis.js]
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
    function C(x) {
        if (x === void 0) { x = this; }
        this.baseProp = 1;
    }
    return C;
}());
var D = /** @class */ (function () {
    function D(x) {
        if (x === void 0) { x = this; }
    }
    return D;
}());
var E = /** @class */ (function () {
    function E(x) {
        if (x === void 0) { x = this; }
        this.x = x;
    }
    return E;
}());
var F = /** @class */ (function (_super) {
    __extends(F, _super);
    function F(y) {
        if (y === void 0) { y = _this.baseProp; }
        return _super.call(this) || this;
    }
    return F;
}(C));
