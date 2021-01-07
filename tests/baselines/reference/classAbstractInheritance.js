//// [classAbstractInheritance.ts]
abstract class A {}

abstract class B extends A {}

class C extends A {}

abstract class AA {
    abstract foo();
}

abstract class BB extends AA {}

class CC extends AA {}

class DD extends BB {}

abstract class EE extends BB {}

class FF extends CC {}

abstract class GG extends CC {}

//// [classAbstractInheritance.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(A));
var AA = /** @class */ (function () {
    function AA() {
    }
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(AA));
var CC = /** @class */ (function (_super) {
    __extends(CC, _super);
    function CC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CC;
}(AA));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DD;
}(BB));
var EE = /** @class */ (function (_super) {
    __extends(EE, _super);
    function EE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EE;
}(BB));
var FF = /** @class */ (function (_super) {
    __extends(FF, _super);
    function FF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FF;
}(CC));
var GG = /** @class */ (function (_super) {
    __extends(GG, _super);
    function GG() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GG;
}(CC));
