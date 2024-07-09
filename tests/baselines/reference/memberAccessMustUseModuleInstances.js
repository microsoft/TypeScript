//// [tests/cases/compiler/memberAccessMustUseModuleInstances.ts] ////

//// [memberAccessMustUseModuleInstances_0.ts]
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

//// [memberAccessMustUseModuleInstances_1.ts]
///<reference path='memberAccessMustUseModuleInstances_0.ts'/>
import WinJS = require('memberAccessMustUseModuleInstances_0');

WinJS.Promise.timeout(10);


//// [memberAccessMustUseModuleInstances_0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Promise = void 0;
    var Promise = /** @class */ (function () {
        function Promise() {
        }
        Promise.timeout = function (delay) {
            return null;
        };
        return Promise;
    }());
    exports.Promise = Promise;
});
//// [memberAccessMustUseModuleInstances_1.js]
define(["require", "exports", "memberAccessMustUseModuleInstances_0"], function (require, exports, WinJS) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WinJS.Promise.timeout(10);
});
