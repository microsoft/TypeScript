//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType2.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType2_moduleDef.d.ts]
declare module "moduleC" {
    import self = require("moduleD");
    export = self;
}
declare module "moduleD" {
    import self = require("moduleC");
    export = self;
}

//// [recursiveExportAssignmentAndFindAliasedType2_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType2_moduleA.ts]
/// <reference path="recursiveExportAssignmentAndFindAliasedType2_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType2_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType2_moduleB.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        return ClassB;
    }());
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType2_moduleA.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.b = void 0;
});
