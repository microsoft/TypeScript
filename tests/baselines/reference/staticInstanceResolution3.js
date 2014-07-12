//// [staticInstanceResolution3_1.ts]
///<reference path='staticInstanceResolution3_0.ts'/>
import WinJS = require('staticInstanceResolution3_0');
WinJS.Promise.timeout(10);

//// [staticInstanceResolution3_0.js]
var Promise = (function () {
    function Promise() {
    }
    Promise.timeout = function (delay) {
        return null;
    };
    return Promise;
})();
exports.Promise = Promise;
//// [staticInstanceResolution3_1.js]
///<reference path='staticInstanceResolution3_0.ts'/>
var WinJS = require('staticInstanceResolution3_0');
WinJS.Promise.timeout(10);
