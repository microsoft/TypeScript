//// [tests/cases/compiler/declarationEmitStringEnumUsedInNonlocalSpread.ts] ////

//// [class.ts]
export const enum TestEnum {
    Test1 = '123123',
    Test2 = '12312312312',
}

export interface ITest {
    [TestEnum.Test1]: string;
    [TestEnum.Test2]: string;
}

export class A {
    getA(): ITest {
        return {
            [TestEnum.Test1]: '123',
            [TestEnum.Test2]: '123',
        };
    }
}
//// [index.ts]
import { A } from './class';

export class B extends A {
    getA() { // TS4053 error
        return {
            ...super.getA(),
            a: '123',
        };
    }
}

//// [class.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.getA = function () {
        var _a;
        return _a = {},
            _a["123123" /* Test1 */] = '123',
            _a["12312312312" /* Test2 */] = '123',
            _a;
    };
    return A;
}());
exports.A = A;
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.B = void 0;
var class_1 = require("./class");
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.getA = function () {
        return __assign(__assign({}, _super.prototype.getA.call(this)), { a: '123' });
    };
    return B;
}(class_1.A));
exports.B = B;


//// [class.d.ts]
export declare const enum TestEnum {
    Test1 = "123123",
    Test2 = "12312312312"
}
export interface ITest {
    [TestEnum.Test1]: string;
    [TestEnum.Test2]: string;
}
export declare class A {
    getA(): ITest;
}
//// [index.d.ts]
import { A } from './class';
export declare class B extends A {
    getA(): {
        a: string;
        123123: string;
        12312312312: string;
    };
}
