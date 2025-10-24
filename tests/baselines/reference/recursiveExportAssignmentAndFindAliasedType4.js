//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType4.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType4_moduleC.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType4_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.ts]
import moduleC = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
import ClassB = require("./recursiveExportAssignmentAndFindAliasedType4_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType4_moduleC.js]
"use strict";
var self = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType4_moduleB.js]
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
//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
