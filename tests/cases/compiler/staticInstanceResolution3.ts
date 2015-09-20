// @module: commonjs
// @Filename: staticInstanceResolution3_0.ts
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

// @Filename: staticInstanceResolution3_1.ts
///<reference path='staticInstanceResolution3_0.ts'/>
import WinJS = require('./staticInstanceResolution3_0');
WinJS.Promise.timeout(10);