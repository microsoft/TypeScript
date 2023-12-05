//// [modulea.ts]
import {x} from "./ModuleB"

//// [moduleb.ts]
export var x

Diagnostics::
moduleA.ts(1,17): error TS1261: Already included file name 'ModuleB.ts' differs from file name 'moduleB.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleB" from file 'moduleA.ts'
    Root file specified for compilation

