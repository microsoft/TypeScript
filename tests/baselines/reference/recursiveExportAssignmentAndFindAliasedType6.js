//// [recursiveExportAssignmentAndFindAliasedType6_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType6_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType6_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType6_moduleE.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleC"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleE"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleD"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
