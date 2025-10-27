//// [/a/b/c.ts]
/// <reference path="D.ts"/>

//// [/a/b/d.ts]
var x

Diagnostics::
c.ts(1,22): error TS1261: Already included file name 'D.ts' differs from file name 'd.ts' only in casing.
  The file is in the program because:
    Referenced via 'D.ts' from file 'c.ts'
    Root file specified for compilation

