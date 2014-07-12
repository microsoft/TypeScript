//// [recursiveExportAssignmentAndFindAliasedType3_moduleA.ts]
/// <reference path="recursiveExportAssignmentAndFindAliasedType3_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType3_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType3_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType3_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
