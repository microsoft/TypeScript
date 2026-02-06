currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/moduleA.ts]
import a = require("./ModuleC")

//// [/user/username/projects/myproject/moduleB.ts]
import a = require("./moduleC")

//// [/user/username/projects/myproject/moduleC.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w --p . --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mmoduleA.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1202: [0mImport assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.

[7m1[0m import a = require("./ModuleC")
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mmoduleA.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

[7m1[0m import a = require("./ModuleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./moduleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

[96mmoduleB.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1202: [0mImport assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.

[7m1[0m import a = require("./moduleC")
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

[7m1[0m import a = require("./moduleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleA.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./ModuleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by default include pattern '**/*'
moduleA.ts
  Matched by default include pattern '**/*'
moduleB.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/projects/myproject/ModuleC.js]
export const x = 10;


//// [/user/username/projects/myproject/moduleA.js]
export {};


//// [/user/username/projects/myproject/moduleB.js]
export {};



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/projects/myproject/ModuleC.ts: *new*
  {}
/user/username/projects/myproject/moduleA.ts: *new*
  {}
/user/username/projects/myproject/moduleB.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/moduleA.ts",
  "/user/username/projects/myproject/moduleB.ts",
  "/user/username/projects/myproject/moduleC.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/modulec.ts (used version)
/user/username/projects/myproject/modulea.ts (used version)
/user/username/projects/myproject/moduleb.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/moduleA.ts]
// some comment
                    import a = require("./ModuleC")


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mmoduleA.ts[0m:[93m2[0m:[93m21[0m - [91merror[0m[90m TS1202: [0mImport assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.

[7m2[0m                     import a = require("./ModuleC")
[7m [0m [91m                    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mmoduleA.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

[7m2[0m                     import a = require("./ModuleC")
[7m [0m [91m                                       ~~~~~~~~~~~[0m

  [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./moduleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

[96mmoduleB.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS1202: [0mImport assignment cannot be used when targeting ECMAScript modules. Consider using 'import * as ns from "mod"', 'import {a} from "mod"', 'import d from "mod"', or another module format instead.

[7m1[0m import a = require("./moduleC")
[7m [0m [91m~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m

[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

[7m1[0m import a = require("./moduleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleA.ts[0m:[93m2[0m:[93m40[0m
    [7m2[0m                     import a = require("./ModuleC")
    [7m [0m [96m                                       ~~~~~~~~~~~[0m
    File is included via import here.

../../../../home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
  Default library for target 'es2025'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by default include pattern '**/*'
moduleA.ts
  Matched by default include pattern '**/*'
moduleB.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 4 errors. Watching for file changes.



//// [/user/username/projects/myproject/moduleA.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/moduleA.ts",
  "/user/username/projects/myproject/moduleB.ts",
  "/user/username/projects/myproject/moduleC.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/moduleA.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/modulea.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
