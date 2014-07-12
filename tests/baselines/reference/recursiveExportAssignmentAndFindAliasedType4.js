//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType4_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType4_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType4_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType4_moduleC"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType4_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
