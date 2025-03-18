//// [tests/cases/compiler/staticInstanceResolution3.ts] ////

//// [staticInstanceResolution3_0.ts]
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

//// [staticInstanceResolution3_1.ts]
///<reference path='staticInstanceResolution3_0.ts'/>
import WinJS = require('./staticInstanceResolution3_0');
WinJS.Promise.timeout(10);

//// [staticInstanceResolution3_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promise = void 0;
class Promise {
    static timeout(delay) {
        return null;
    }
}
exports.Promise = Promise;
//// [staticInstanceResolution3_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WinJS = require("./staticInstanceResolution3_0");
WinJS.Promise.timeout(10);
