Input::
//// [/lib/lib.d.ts]
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

//// [/src/project/node_modules/fp-ts/lib/struct.d.ts]
export function foo(): void

//// [/src/project/src/struct.d.ts]
import * as xs1 from "fp-ts/lib/Struct";
import * as xs2 from "fp-ts/lib/struct";
import * as xs3 from "./Struct";
import * as xs4 from "./struct";




Output::
/lib/tsc /src/project/src/struct.d.ts --forceConsistentCasingInFileNames --explainFiles
[96msrc/project/src/struct.d.ts[0m:[93m2[0m:[93m22[0m - [91merror[0m[90m TS1149: [0mFile name '/src/project/node_modules/fp-ts/lib/struct.d.ts' differs from already included file name '/src/project/node_modules/fp-ts/lib/Struct.d.ts' only in casing.
  The file is in the program because:
    Imported via "fp-ts/lib/Struct" from file '/src/project/src/struct.d.ts'
    Imported via "fp-ts/lib/struct" from file '/src/project/src/struct.d.ts'

[7m2[0m import * as xs2 from "fp-ts/lib/struct";
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~[0m

  [96msrc/project/src/struct.d.ts[0m:[93m1[0m:[93m22[0m
    [7m1[0m import * as xs1 from "fp-ts/lib/Struct";
    [7m [0m [96m                     ~~~~~~~~~~~~~~~~~~[0m
    File is included via import here.

[96msrc/project/src/struct.d.ts[0m:[93m3[0m:[93m22[0m - [91merror[0m[90m TS1149: [0mFile name '/src/project/src/Struct.d.ts' differs from already included file name '/src/project/src/struct.d.ts' only in casing.
  The file is in the program because:
    Root file specified for compilation
    Imported via "./Struct" from file '/src/project/src/struct.d.ts'
    Imported via "./struct" from file '/src/project/src/struct.d.ts'

[7m3[0m import * as xs3 from "./Struct";
[7m [0m [91m                     ~~~~~~~~~~[0m

  [96msrc/project/src/struct.d.ts[0m:[93m4[0m:[93m22[0m
    [7m4[0m import * as xs4 from "./struct";
    [7m [0m [96m                     ~~~~~~~~~~[0m
    File is included via import here.

lib/lib.d.ts
  Default library for target 'es5'
src/project/node_modules/fp-ts/lib/Struct.d.ts
  Imported via "fp-ts/lib/Struct" from file 'src/project/src/struct.d.ts'
  Imported via "fp-ts/lib/struct" from file 'src/project/src/struct.d.ts'
src/project/src/struct.d.ts
  Root file specified for compilation
  Imported via "./Struct" from file 'src/project/src/struct.d.ts'
  Imported via "./struct" from file 'src/project/src/struct.d.ts'

Found 2 errors in the same file, starting at: src/project/src/struct.d.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


