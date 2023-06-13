//// [tests/cases/compiler/inheritedConstructorWithRestParams2.ts] ////

//// [inheritedConstructorWithRestParams2.ts]
class IBaseBase<T, U> {
    constructor(x: U) { }
}

interface IBase<T, U> extends IBaseBase<T, U> { }

class BaseBase2 {
    constructor(x: number) { }
}

declare class BaseBase<T, U> extends BaseBase2 implements IBase<T, U> {
    constructor(x: T, ...y: U[]);
    constructor(x1: T, x2: T, ...y: U[]);
    constructor(x1: T, x2: U, y: T);
}

class Base extends BaseBase<string, number> {
}

class Derived extends Base { }

// Ok
new Derived("", "");
new Derived("", 3);
new Derived("", 3, 3);
new Derived("", 3, 3, 3);
new Derived("", 3, "");
new Derived("", "", 3);
new Derived("", "", 3, 3);

// Errors
new Derived(3);
new Derived("", 3, "", 3);
new Derived("", 3, "", "");

//// [inheritedConstructorWithRestParams2.js]
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
var IBaseBase = /** @class */ (function () {
    function IBaseBase(x) {
    }
    return IBaseBase;
}());
var BaseBase2 = /** @class */ (function () {
    function BaseBase2(x) {
    }
    return BaseBase2;
}());
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Base;
}(BaseBase));
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived;
}(Base));
// Ok
new Derived("", "");
new Derived("", 3);
new Derived("", 3, 3);
new Derived("", 3, 3, 3);
new Derived("", 3, "");
new Derived("", "", 3);
new Derived("", "", 3, 3);
// Errors
new Derived(3);
new Derived("", 3, "", 3);
new Derived("", 3, "", "");
