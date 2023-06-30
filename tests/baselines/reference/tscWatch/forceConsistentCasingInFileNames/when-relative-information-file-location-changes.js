currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/moduleA.ts]
import a = require("./ModuleC")

//// [/user/username/projects/myproject/moduleB.ts]
import a = require("./moduleC")

//// [/user/username/projects/myproject/moduleC.ts]
export const x = 10;

//// [/a/lib/lib.d.ts]
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

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"forceConsistentCasingInFileNames":true}}


/a/lib/tsc.js --w --p . --explainFiles
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[91m● [0m[96mmoduleA.ts[0m:[93m1[0m:[93m20[0m  [91mError[0m TS1261
| import a = require("./ModuleC")
  [91m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
Already included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

File is included via import here: [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m

  | import a = require("./moduleC")
    [96m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
[91m● [0m[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m  [91mError[0m TS1149
| import a = require("./moduleC")
  [91m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
File name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

File is included via import here: [96mmoduleA.ts[0m:[93m1[0m:[93m20[0m

  | import a = require("./ModuleC")
    [96m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
../../../../a/lib/lib.d.ts
  Default library for target 'es5'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by default include pattern '**/*'
moduleA.ts
  Matched by default include pattern '**/*'
moduleB.ts
  Matched by default include pattern '**/*'
[[90m12:00:32 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/moduleA.ts","/user/username/projects/myproject/moduleB.ts","/user/username/projects/myproject/moduleC.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/modulec.ts (used version)
/user/username/projects/myproject/modulea.ts (used version)
/user/username/projects/myproject/moduleb.ts (used version)

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/modulea.ts: *new*
  {}
/user/username/projects/myproject/moduleb.ts: *new*
  {}
/user/username/projects/myproject/modulec.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/ModuleC.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/user/username/projects/myproject/moduleA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/moduleB.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/moduleA.ts]
// some comment
                    import a = require("./ModuleC")


Before running Timeout callback:: count: 1
1: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:35 AM[0m] File change detected. Starting incremental compilation...

[91m● [0m[96mmoduleA.ts[0m:[93m2[0m:[93m40[0m  [91mError[0m TS1261
| import a = require("./ModuleC")
  [91m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
Already included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

File is included via import here: [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m

  | import a = require("./moduleC")
    [96m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
[91m● [0m[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m  [91mError[0m TS1149
| import a = require("./moduleC")
  [91m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
File name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by default include pattern '**/*'

File is included via import here: [96mmoduleA.ts[0m:[93m2[0m:[93m40[0m

  | import a = require("./ModuleC")
    [96m                   ▔▔▔▔▔▔▔▔▔▔▔[0m
../../../../a/lib/lib.d.ts
  Default library for target 'es5'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by default include pattern '**/*'
moduleA.ts
  Matched by default include pattern '**/*'
moduleB.ts
  Matched by default include pattern '**/*'
[[90m12:00:39 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/moduleA.ts","/user/username/projects/myproject/moduleB.ts","/user/username/projects/myproject/moduleC.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/ModuleC.ts
/user/username/projects/myproject/moduleA.ts
/user/username/projects/myproject/moduleB.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/moduleA.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/modulea.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/moduleA.js] file written with same contents
