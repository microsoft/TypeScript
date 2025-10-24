//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType3.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType3_moduleDef.d.ts]
declare module "moduleC" {
    import self = require("moduleD");
    export = self;
}
declare module "moduleD" {
    import self = require("moduleE");
    export = self;
}
declare module "moduleE" {
    import self = require("moduleC");
    export = self;
}

//// [recursiveExportAssignmentAndFindAliasedType3_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType3_moduleA.ts]
/// <reference path="recursiveExportAssignmentAndFindAliasedType3_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("./recursiveExportAssignmentAndFindAliasedType3_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType3_moduleB.js]
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
//// [recursiveExportAssignmentAndFindAliasedType3_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
