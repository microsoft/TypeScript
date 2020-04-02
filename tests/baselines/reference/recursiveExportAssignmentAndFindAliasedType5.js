//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType5.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType5_moduleC.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType5_moduleD");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleD.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType5_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType5_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType5_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType5_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType5_moduleC"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType5_moduleD"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleB.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        return ClassB;
    }());
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType5_moduleA.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.b = void 0;
});
