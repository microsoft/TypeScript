//// [/a/b/c.ts]
import {x} from "D"

//// [/a/b/d.ts]
export var x

Diagnostics::
c.ts(1,17): error TS1261: Already included file name '/a/b/D.ts' differs from file name 'd.ts' only in casing.
  The file is in the program because:
    Imported via "D" from file 'c.ts'
    Root file specified for compilation

