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
exports.__esModule = true;
var Promise = (function () {
    function Promise() {
    }
    Promise.timeout = function (delay) {
        return null;
    };
    return Promise;
}());
exports.Promise = Promise;
//// [staticInstanceResolution3_1.js]
"use strict";
exports.__esModule = true;
///<reference path='staticInstanceResolution3_0.ts'/>
var WinJS = require("./staticInstanceResolution3_0");
WinJS.Promise.timeout(10);
