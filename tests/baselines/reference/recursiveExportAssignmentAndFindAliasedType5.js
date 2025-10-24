//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType5.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType5_moduleC.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType5_moduleD");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleD.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType5_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.ts]
import moduleC = require("./recursiveExportAssignmentAndFindAliasedType5_moduleC");
import ClassB = require("./recursiveExportAssignmentAndFindAliasedType5_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType5_moduleD.js]
"use strict";
var self = require("./recursiveExportAssignmentAndFindAliasedType5_moduleC");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType5_moduleC.js]
"use strict";
var self = require("./recursiveExportAssignmentAndFindAliasedType5_moduleD");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType5_moduleB.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    class ClassB {
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        return ClassB;
    }());
=======
"use strict";
var ClassB = /** @class */ (function () {
    function ClassB() {
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
    }
    return ClassB;
}());
module.exports = ClassB;
//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
