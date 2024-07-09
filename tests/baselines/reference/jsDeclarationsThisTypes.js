//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsThisTypes.ts] ////

//// [index.js]
export class A {
    /** @returns {this} */
    method() {
        return this;
    }
}
export default class Base extends A {
    // This method is required to reproduce #35932
    verify() { }
}

//// [index.js]
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
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    /** @returns {this} */
    A.prototype.method = function () {
        return this;
    };
    return A;
}());
exports.A = A;
var Base = /** @class */ (function (_super) {
    __extends(Base, _super);
    function Base() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This method is required to reproduce #35932
    Base.prototype.verify = function () { };
    return Base;
}(A));
exports.default = Base;


//// [index.d.ts]
export class A {
    /** @returns {this} */
    method(): this;
}
export default class Base extends A {
    verify(): void;
}
