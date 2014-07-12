//// [memberAccessMustUseModuleInstances_1.ts]
///<reference path='memberAccessMustUseModuleInstances_0.ts'/>
import WinJS = require('memberAccessMustUseModuleInstances_0');

WinJS.Promise.timeout(10);


//// [memberAccessMustUseModuleInstances_0.js]
define(["require", "exports"], function(require, exports) {
    var Promise = (function () {
        function Promise() {
        }
        Promise.timeout = function (delay) {
            return null;
        };
        return Promise;
    })();
    exports.Promise = Promise;
});
//// [memberAccessMustUseModuleInstances_1.js]
define(["require", "exports", 'memberAccessMustUseModuleInstances_0'], function(require, exports, WinJS) {
    WinJS.Promise.timeout(10);
});
