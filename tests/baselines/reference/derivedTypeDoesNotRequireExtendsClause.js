//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/derivedTypeDoesNotRequireExtendsClause.ts] ////

//// [derivedTypeDoesNotRequireExtendsClause.ts]
class Base {
    foo: string;
}

class Derived {
    foo: string;
    bar: number;
}

class Derived2 extends Base {
    bar: string;
}

var b: Base;
var d1: Derived;
var d2: Derived2;
b = d1;
b = d2;

var r: Base[] = [d1, d2];

//// [derivedTypeDoesNotRequireExtendsClause.js]
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function () {
    function Derived() {
    }
    return Derived;
}());
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Derived2;
}(Base));
var b;
var d1;
var d2;
b = d1;
b = d2;
var r = [d1, d2];
