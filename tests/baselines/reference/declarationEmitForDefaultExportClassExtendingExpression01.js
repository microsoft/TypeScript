//// [tests/cases/compiler/declarationEmitForDefaultExportClassExtendingExpression01.ts] ////

//// [declarationEmitForDefaultExportClassExtendingExpression01.ts]
interface Greeter {
    getGreeting(): string;
}

interface GreeterConstructor {
    new (): Greeter;
}

class A {
    getGreeting() {
        return 'hello';
    }
}

const getGreeterBase = (): GreeterConstructor => A;

export default class extends getGreeterBase() {
}



//// [declarationEmitForDefaultExportClassExtendingExpression01.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.getGreeting = function () {
        return 'hello';
    };
    return A;
}());
var getGreeterBase = function () { return A; };
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return default_1;
}(getGreeterBase()));
exports.default = default_1;


//// [declarationEmitForDefaultExportClassExtendingExpression01.d.ts]
interface Greeter {
    getGreeting(): string;
}
interface GreeterConstructor {
    new (): Greeter;
}
declare const default_base: GreeterConstructor;
export default class extends default_base {
}
export {};
