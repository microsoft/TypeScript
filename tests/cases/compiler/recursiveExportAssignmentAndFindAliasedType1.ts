//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType1_moduleDef.d.ts
declare module "moduleC" {
    import self = require("moduleC");
    export = self;
}

// @Filename: recursiveExportAssignmentAndFindAliasedType1_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType1_moduleA.ts
/// <reference path="recursiveExportAssignmentAndFindAliasedType1_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType1_moduleB");
export var b: ClassB; // This should result in type ClassB