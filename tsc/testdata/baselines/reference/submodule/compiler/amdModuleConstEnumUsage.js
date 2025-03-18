//// [tests/cases/compiler/amdModuleConstEnumUsage.ts] ////

//// [cc.ts]
export const enum CharCode {
    A,
    B
}
//// [file.ts]
import { CharCode } from 'defs/cc';
export class User {
    method(input: number) {
        if (CharCode.A === input) {}
    }
}


//// [cc.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharCode = void 0;
var CharCode;
(function (CharCode) {
    CharCode[CharCode["A"] = 0] = "A";
    CharCode[CharCode["B"] = 1] = "B";
})(CharCode || (exports.CharCode = CharCode = {}));
//// [file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const cc_1 = require("defs/cc");
class User {
    method(input) {
        if (cc_1.CharCode.A === input) { }
    }
}
exports.User = User;
