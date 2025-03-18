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

//// [recursiveExportAssignmentAndFindAliasedType6_moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
