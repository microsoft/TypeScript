//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType4_moduleC.ts
import self = require("recursiveExportAssignmentAndFindAliasedType4_moduleC");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType4_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType4_moduleA.ts
import moduleC = require("recursiveExportAssignmentAndFindAliasedType4_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType4_moduleB");
export var b: ClassB; // This should result in type ClassB