//// [tests/cases/compiler/staticInstanceResolution5.ts] ////

//// [staticInstanceResolution5_0.ts]
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

//// [staticInstanceResolution5_1.ts]
import WinJS = require('staticInstanceResolution5_0');

// these 3 should be errors
var x = (w1: WinJS) => { };
var y = function (w2: WinJS) { }
function z(w3: WinJS) { }


//// [staticInstanceResolution5_0.js]
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
//// [staticInstanceResolution5_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // these 3 should be errors
    var x = function (w1) { };
    var y = function (w2) { };
    function z(w3) { }
});
