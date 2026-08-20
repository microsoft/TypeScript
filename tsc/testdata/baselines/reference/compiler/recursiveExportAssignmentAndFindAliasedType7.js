//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType7.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType7_moduleC.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleD");
var selfVar = self;
export = selfVar;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleD.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleE");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleE.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.ts]
import moduleC = require("./recursiveExportAssignmentAndFindAliasedType7_moduleC");
import ClassB = require("./recursiveExportAssignmentAndFindAliasedType7_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType7_moduleE.js]
"use strict";
const self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleC");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType7_moduleD.js]
"use strict";
const self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleE");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType7_moduleC.js]
"use strict";
const self = require("./recursiveExportAssignmentAndFindAliasedType7_moduleD");
var selfVar = self;
module.exports = selfVar;
//// [recursiveExportAssignmentAndFindAliasedType7_moduleB.js]
"use strict";
class ClassB {
}
module.exports = ClassB;
//// [recursiveExportAssignmentAndFindAliasedType7_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
