//@module: amd
// @Filename: recursiveExportAssignmentAndFindAliasedType2_moduleDef.d.ts
declare module "moduleC" {
    import self = require("moduleD");
    export = self;
}
declare module "moduleD" {
    import self = require("moduleC");
    export = self;
}

// @Filename: recursiveExportAssignmentAndFindAliasedType2_moduleB.ts
class ClassB { }
export = ClassB;

// @Filename: recursiveExportAssignmentAndFindAliasedType2_moduleA.ts
/// <reference path="recursiveExportAssignmentAndFindAliasedType2_moduleDef.d.ts"/>
import moduleC = require("moduleC");
import ClassB = require("recursiveExportAssignmentAndFindAliasedType2_moduleB");
export var b: ClassB; // This should result in type ClassB