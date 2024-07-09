//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType7_moduleC.ts
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleD");
var selfVar = self;
export = selfVar;

// @Filename: recursiveExportAssignmentAndFindAliasedType7_moduleD.ts
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleE");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType7_moduleE.ts
import self = require("recursiveExportAssignmentAndFindAliasedType7_moduleC");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType7_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType7_moduleA.ts
import moduleC = require("recursiveExportAssignmentAndFindAliasedType7_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType7_moduleB");
export var b: ClassB; // This should result in type ClassB