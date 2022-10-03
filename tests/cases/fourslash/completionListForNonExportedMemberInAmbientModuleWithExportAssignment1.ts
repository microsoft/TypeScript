/// <reference path="fourslash.ts"/>

// @Filename: completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0.ts
////var x: Date;
////export = x;

// @Filename: completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file1.ts
///////<reference path='completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0.ts'/>
//// import test = require("completionListForNonExportedMemberInAmbientModuleWithExportAssignment1_file0");
//// test./**/

verify.completions({ marker: "", exact: undefined });
