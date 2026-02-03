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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharCode = void 0;
    var CharCode;
    (function (CharCode) {
        CharCode[CharCode["A"] = 0] = "A";
        CharCode[CharCode["B"] = 1] = "B";
    })(CharCode || (exports.CharCode = CharCode = {}));
});
//// [file.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.User = void 0;
    var User = /** @class */ (function () {
        function User() {
        }
        User.prototype.method = function (input) {
            if (0 /* CharCode.A */ === input) { }
        };
        return User;
    }());
    exports.User = User;
});
