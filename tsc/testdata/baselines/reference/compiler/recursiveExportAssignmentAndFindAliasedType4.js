//// [tests/cases/compiler/recursiveExportAssignmentAndFindAliasedType4.ts] ////

//// [recursiveExportAssignmentAndFindAliasedType4_moduleC.ts]
import self = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
export = self;

//// [recursiveExportAssignmentAndFindAliasedType4_moduleB.ts]
class ClassB { }
export = ClassB;

//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.ts]
import moduleC = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
import ClassB = require("./recursiveExportAssignmentAndFindAliasedType4_moduleB");
export var b: ClassB; // This should result in type ClassB

//// [recursiveExportAssignmentAndFindAliasedType4_moduleC.js]
"use strict";
const self = require("./recursiveExportAssignmentAndFindAliasedType4_moduleC");
module.exports = self;
//// [recursiveExportAssignmentAndFindAliasedType4_moduleB.js]
"use strict";
class ClassB {
}
module.exports = ClassB;
//// [recursiveExportAssignmentAndFindAliasedType4_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
