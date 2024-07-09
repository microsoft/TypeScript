//// [/a/b/c/modulea.ts]
import a = require("./ModuleC")

//// [/a/b/c/moduleb.ts]
import a = require("./moduleC")

//// [/a/b/c/modulec.ts]
export var x

//// [/a/b/c/moduled.ts]

import a = require("./moduleA");
import b = require("./moduleB");
                

Diagnostics::
moduleB.ts(1,20): error TS1149: File name '/a/B/c/moduleC.ts' differs from already included file name '/a/B/c/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/a/B/c/moduleA.ts'
    Imported via "./moduleC" from file '/a/B/c/moduleB.ts'

