//// [tests/cases/compiler/externalModuleAssignToVar.ts] ////

//// [externalModuleAssignToVar_ext.ts]
class D { foo: string; }
export = D;

//// [externalModuleAssignToVar_core_require.ts]
export class C { bar: string; }

//// [externalModuleAssignToVar_core_require2.ts]
class C { baz: string; }
export = C;

//// [externalModuleAssignToVar_core.ts]
///<reference path='externalModuleAssignToVar_core_require.ts'/>
import ext = require('externalModuleAssignToVar_core_require');
var y1: { C: new() => ext.C; } = ext;
y1 = ext; // ok

import ext2 = require('externalModuleAssignToVar_core_require2');
var y2: new() => ext2 = ext2;
y2 = ext2; // ok

import ext3 = require('externalModuleAssignToVar_ext');
var y3: new () => ext3 = ext3;
y3 = ext3; // ok


//// [externalModuleAssignToVar_core_require.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.C = void 0;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
});
//// [externalModuleAssignToVar_core_require2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    return C;
});
//// [externalModuleAssignToVar_ext.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    return D;
});
//// [externalModuleAssignToVar_core.js]
define(["require", "exports", "externalModuleAssignToVar_core_require", "externalModuleAssignToVar_core_require2", "externalModuleAssignToVar_ext"], function (require, exports, ext, ext2, ext3) {
    "use strict";
    exports.__esModule = true;
    var y1 = ext;
    y1 = ext; // ok
    var y2 = ext2;
    y2 = ext2; // ok
    var y3 = ext3;
    y3 = ext3; // ok
});
