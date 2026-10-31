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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promise = void 0;
class Promise {
    static timeout(delay) {
        return null;
    }
}
exports.Promise = Promise;
//// [memberAccessMustUseModuleInstances_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='memberAccessMustUseModuleInstances_0.ts'/>
const WinJS = require("memberAccessMustUseModuleInstances_0");
WinJS.Promise.timeout(10);
