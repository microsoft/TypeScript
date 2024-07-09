//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType6_moduleC.ts
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleD");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType6_moduleD.ts
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleE");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType6_moduleE.ts
import self = require("recursiveExportAssignmentAndFindAliasedType6_moduleC");
export = self;

// @Filename: recursiveExportAssignmentAndFindAliasedType6_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType6_moduleA.ts
import moduleC = require("recursiveExportAssignmentAndFindAliasedType6_moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType6_moduleB");
export var b: ClassB; // This should result in type ClassB