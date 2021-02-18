//// [tests/cases/compiler/extendsUntypedModule.ts] ////

//// [index.js]
// Test that extending an untyped module is an error, unlike extending unknownSymbol.

This file is not read.

//// [index.js]
Nor is this one.

//// [a.ts]
import Foo from "foo";
import Bar from "bar"; // error: unused
export class A extends Foo { }


//// [a.js]
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
exports.__esModule = true;
exports.A = void 0;
var foo_1 = require("foo");
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A;
}(foo_1["default"]));
exports.A = A;
