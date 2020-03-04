//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType7.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType7_moduleC.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleD");
var selfVar = self;
export = selfVar;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleD.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleE");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleE.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType7_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType7_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType7_moduleE.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleC"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleE"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType7_moduleD"], function (require, exports, self) {
    "use strict";
    var selfVar = self;
    return selfVar;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleB.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        return ClassB;
    }());
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.b = void 0;
});
