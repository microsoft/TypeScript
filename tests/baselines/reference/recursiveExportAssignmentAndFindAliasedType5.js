//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType5_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType5_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType5_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType5_moduleC"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType5_moduleD"], function(require, exports, self) {
    
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleB.js]
define(["require", "exports"], function(require, exports) {
    var ClassB = (function () {
        function ClassB() {
        }
        return ClassB;
    })();
    
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.js]
define(["require", "exports"], function(require, exports) {
    exports.b; // This should result in type ClassB
});
