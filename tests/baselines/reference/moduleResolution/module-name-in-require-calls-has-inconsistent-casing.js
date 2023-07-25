//// [modulea.ts]
import a = require("./ModuleC")

//// [moduleb.ts]
import a = require("./moduleC")

//// [modulec.ts]
export var x

Diagnostics::
moduleA.ts(1,20): error TS1261: Already included file name 'ModuleC.ts' differs from file name 'moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file 'moduleA.ts'
    Imported via "./moduleC" from file 'moduleB.ts'
    Root file specified for compilation
moduleB.ts(1,20): error TS1149: File name 'moduleC.ts' differs from already included file name 'ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file 'moduleA.ts'
    Imported via "./moduleC" from file 'moduleB.ts'
    Root file specified for compilation

