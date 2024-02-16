//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractConstructorAssignability.ts] ////

//// [classAbstractConstructorAssignability.ts]
class A {}

abstract class B extends A {}

class C extends B {}

var AA : typeof A = B;
var BB : typeof B = A;
var CC : typeof C = B;

new AA;
new BB;
new CC;

// https://github.com/microsoft/TypeScript/issues/57412

// private methods have parameters stripped away in the generated declaration files
abstract class GeneratedConstructable {
  private constructor() {}
}

class MyPrivateClass {
  private privateVal: boolean;
  private constructor(
    public readonly foo: string,
    public readonly bar: string,
  ) {
    this.privateVal = true;
  }
}

export const funcThatAcceptsAnyGeneratedClass = (
  clazz: typeof GeneratedConstructable,
) => {};

funcThatAcceptsAnyGeneratedClass(MyPrivateClass);


//// [classAbstractConstructorAssignability.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcThatAcceptsAnyGeneratedClass = void 0;
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
}(B));
var AA = B;
var BB = A;
var CC = B;
new AA;
new BB;
new CC;
// https://github.com/microsoft/TypeScript/issues/57412
// private methods have parameters stripped away in the generated declaration files
var GeneratedConstructable = /** @class */ (function () {
    function GeneratedConstructable() {
    }
    return GeneratedConstructable;
}());
var MyPrivateClass = /** @class */ (function () {
    function MyPrivateClass(foo, bar) {
        this.foo = foo;
        this.bar = bar;
        this.privateVal = true;
    }
    return MyPrivateClass;
}());
var funcThatAcceptsAnyGeneratedClass = function (clazz) { };
exports.funcThatAcceptsAnyGeneratedClass = funcThatAcceptsAnyGeneratedClass;
(0, exports.funcThatAcceptsAnyGeneratedClass)(MyPrivateClass);
