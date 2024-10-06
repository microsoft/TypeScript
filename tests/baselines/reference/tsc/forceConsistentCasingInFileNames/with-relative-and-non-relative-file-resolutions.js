currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/struct.d.ts]
import * as xs1 from "fp-ts/lib/Struct";
import * as xs2 from "fp-ts/lib/struct";
import * as xs3 from "./Struct";
import * as xs4 from "./struct";


//// [/user/username/projects/myproject/node_modules/fp-ts/lib/struct.d.ts]
export function foo(): void

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js /user/username/projects/myproject/src/struct.d.ts --forceConsistentCasingInFileNames --explainFiles
Output::
[96msrc/struct.d.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/node_modules/fp-ts/lib/struct.d.ts' differs from already included file name '/user/username/projects/myproject/node_modules/fp-ts/lib/Struct.d.ts' only in casing.
  The file is in the program because:
    Imported via "fp-ts/lib/Struct" from file '/user/username/projects/myproject/src/struct.d.ts'
    Imported via "fp-ts/lib/struct" from file '/user/username/projects/myproject/src/struct.d.ts'

[7m2[0m import * as xs2 from "fp-ts/lib/struct";
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~[0m

  [96msrc/struct.d.ts[0m:[93m1[0m:[93m22[0m
    [7m1[0m import * as xs1 from "fp-ts/lib/Struct";
    [7m [0m [96m                     ~~~~~~~~~~~~~~~~~~[0m
    File is included via import here.

[96msrc/struct.d.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/src/Struct.d.ts' differs from already included file name '/user/username/projects/myproject/src/struct.d.ts' only in casing.
  The file is in the program because:
    Root file specified for compilation
    Imported via "./Struct" from file '/user/username/projects/myproject/src/struct.d.ts'
    Imported via "./struct" from file '/user/username/projects/myproject/src/struct.d.ts'

[7m3[0m import * as xs3 from "./Struct";
[7m [0m [91m                     ~~~~~~~~~~[0m

  [96msrc/struct.d.ts[0m:[93m4[0m:[93m22[0m
    [7m4[0m import * as xs4 from "./struct";
    [7m [0m [96m                     ~~~~~~~~~~[0m
    File is included via import here.

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
node_modules/fp-ts/lib/Struct.d.ts
  Imported via "fp-ts/lib/Struct" from file 'src/struct.d.ts'
  Imported via "fp-ts/lib/struct" from file 'src/struct.d.ts'
src/struct.d.ts
  Root file specified for compilation
  Imported via "./Struct" from file 'src/struct.d.ts'
  Imported via "./struct" from file 'src/struct.d.ts'

Found 2 errors in the same file, starting at: src/struct.d.ts[90m:2[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
