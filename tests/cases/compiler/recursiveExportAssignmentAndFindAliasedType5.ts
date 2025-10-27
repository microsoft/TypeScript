//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType5_moduleC.ts
import self = require("recursiveExportAssignmentAndFindAliasedType5_moduleD");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType5_moduleD.ts
import self = require("recursiveExportAssignmentAndFindAliasedType5_moduleC");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType5_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType5_moduleA.ts
import moduleC = require("recursiveExportAssignmentAndFindAliasedType5_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType5_moduleB");
export var b: ClassB; // This should result in type ClassB