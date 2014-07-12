//// [recursiveExportAssignmentAndFindAliasedType2_moduleA.ts]
/// <reference path="recursiveExportAssignmentAndFindAliasedType2_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType2_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType2_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType2_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
