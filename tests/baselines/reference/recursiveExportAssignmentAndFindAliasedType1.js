//// [recursiveExportAssignmentAndFindAliasedType1_moduleA.ts]
/// <reference path="recursiveExportAssignmentAndFindAliasedType1_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType1_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType1_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType1_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
