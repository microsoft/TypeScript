//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType6.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType6_moduleC.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleD");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType6_moduleD.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleE");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType6_moduleE.ts]
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType6_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType6_moduleA.ts]
import moduleC = require("recursiveExportAssignmentAndFindAliasedType6_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType6_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType6_moduleE.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleC"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleD.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleE"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleC.js]
define(["require", "exports", "recursiveExportAssignmentAndFindAliasedType6_moduleD"], function (require, exports, self) {
    "use strict";
    return self;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleB.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClassB = /** @class */ (function () {
        function ClassB() {
        }
        return ClassB;
    }());
    return ClassB;
});
//// [recursiveExportAssignmentAndFindAliasedType6_moduleA.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.b = void 0;
});
