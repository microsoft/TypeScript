//// [derivedUninitializedPropertyDeclaration.ts]
class A {
    property = 'x';
}
class B extends A {
    property; // error
}
class BD extends A {
    declare property; // still has implicit any
}
class C {
    p: string;
}
class D extends C {
    p: 'hi'; // error
}
class DD extends C {
    declare p: 'bye'; // ok
}


//// [derivedUninitializedPropertyDeclaration.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
        this.property = 'x';
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
var BD = /** @class */ (function (_super) {
    __extends(BD, _super);
    function BD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BD;
}(A));
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DD;
}(C));
