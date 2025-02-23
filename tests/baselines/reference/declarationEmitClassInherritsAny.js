//// [tests/cases/compiler/declarationEmitClassInherritsAny.ts] ////

//// [declarationEmitClassInherritsAny.ts]
const anyThing = class {} as any;
export class Foo extends anyThing {}

//// [declarationEmitClassInherritsAny.js]
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
exports.Foo = void 0;
var anyThing = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Foo;
}(anyThing));
exports.Foo = Foo;


//// [declarationEmitClassInherritsAny.d.ts]
declare const anyThing: any;
export declare class Foo extends anyThing {
}
export {};
