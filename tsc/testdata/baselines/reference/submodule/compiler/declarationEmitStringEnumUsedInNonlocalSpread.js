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
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = exports.TestEnum = void 0;
var TestEnum;
(function (TestEnum) {
    TestEnum["Test1"] = "123123";
    TestEnum["Test2"] = "12312312312";
})(TestEnum || (exports.TestEnum = TestEnum = {}));
class A {
    getA() {
        return {
            ["123123" /* TestEnum.Test1 */]: '123',
            ["12312312312" /* TestEnum.Test2 */]: '123',
        };
    }
}
exports.A = A;
//// [index.js]
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = void 0;
const class_1 = require("./class");
class B extends class_1.A {
    getA() {
        return __assign(__assign({}, super.getA()), { a: '123' });
    }
}
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
        "123123": string;
        "12312312312": string;
        a: string;
    };
}
