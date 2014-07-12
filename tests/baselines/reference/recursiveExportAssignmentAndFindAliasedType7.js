//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType7_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType7_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType7_moduleE.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleC"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleE"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleD"], function(require, exports, self) {
    var selfVar = self;
    
    return selfVar;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
