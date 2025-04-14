//// [/root/src/a/b/c/d/e/app.ts]
/// <reference types="lib"/>

//// [/root/src/a/b/c/d/node_modules/lib/index.d.ts]
declare var x: number;

//// [/root/src/a/b/c/d/f/g/app.ts]
/// <reference types="lib"/>

//// [/root/src/a/b/c/d/f/node_modules/lib/index.d.ts]
declare var x: number;


Program1 Options Diagnostics::
error TS6053: File 'lib.d.ts' not found.
  The file is in the program because:
    Default library for target 'es5'


Program Reused:: Completely

Program2 Options Diagnostics::
error TS6053: File 'lib.d.ts' not found.
  The file is in the program because:
    Default library for target 'es5'

