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
    exports.__esModule = true;
    exports.CharCode = void 0;
    var CharCode;
    (function (CharCode) {
        CharCode[CharCode["A"] = 0] = "A";
        CharCode[CharCode["B"] = 1] = "B";
    })(CharCode = exports.CharCode || (exports.CharCode = {}));
});
//// [file.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.User = void 0;
    var User = /** @class */ (function () {
        function User() {
        }
        User.prototype.method = function (input) {
            if (0 /* A */ === input) { }
        };
        return User;
    }());
    exports.User = User;
});
