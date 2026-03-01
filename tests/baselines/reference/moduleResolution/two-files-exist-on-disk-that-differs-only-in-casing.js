//// [/a/b/c.ts]
import {x} from "D"

//// [/a/b/D.ts]
export var x

//// [/a/b/d.ts]
export var y

Diagnostics::
error TS5107: Option 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.
D.ts(1,12): error TS7005: Variable 'x' implicitly has an 'any' type.
c.ts(1,17): error TS1261: Already included file name '/a/b/D.ts' differs from file name 'd.ts' only in casing.
  The file is in the program because:
    Imported via "D" from file 'c.ts'
    Root file specified for compilation
d.ts(1,12): error TS7005: Variable 'y' implicitly has an 'any' type.

