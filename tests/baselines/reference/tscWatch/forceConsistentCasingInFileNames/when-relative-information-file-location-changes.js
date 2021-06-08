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

[96mmoduleA.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by include pattern '**/*' in 'tsconfig.json'

[7m1[0m import a = require("./ModuleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./moduleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by include pattern '**/*' in 'tsconfig.json'

[7m1[0m import a = require("./moduleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleA.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./ModuleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

../../../../a/lib/lib.d.ts
  Default library for target 'es3'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by include pattern '**/*' in 'tsconfig.json'
moduleA.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
moduleB.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
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

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/modulea.ts:
  {"fileName":"/user/username/projects/myproject/moduleA.ts","pollingInterval":250}
/user/username/projects/myproject/modulec.ts:
  {"fileName":"/user/username/projects/myproject/ModuleC.ts","pollingInterval":250}
/user/username/projects/myproject/moduleb.ts:
  {"fileName":"/user/username/projects/myproject/moduleB.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/ModuleC.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/user/username/projects/myproject/moduleA.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/moduleB.js]
"use strict";
exports.__esModule = true;



Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/moduleA.ts]
// some comment
                    import a = require("./ModuleC")


Output::
>> Screen clear
[[90m12:00:35 AM[0m] File change detected. Starting incremental compilation...

[96mmoduleA.ts[0m:[93m2[0m:[93m40[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/ModuleC.ts' differs from file name '/user/username/projects/myproject/moduleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by include pattern '**/*' in 'tsconfig.json'

[7m2[0m                     import a = require("./ModuleC")
[7m [0m [91m                                       ~~~~~~~~~~~[0m

  [96mmoduleB.ts[0m:[93m1[0m:[93m20[0m
    [7m1[0m import a = require("./moduleC")
    [7m [0m [96m                   ~~~~~~~~~~~[0m
    File is included via import here.

[96mmoduleB.ts[0m:[93m1[0m:[93m20[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/moduleC.ts' differs from already included file name '/user/username/projects/myproject/ModuleC.ts' only in casing.
  The file is in the program because:
    Imported via "./ModuleC" from file '/user/username/projects/myproject/moduleA.ts'
    Imported via "./moduleC" from file '/user/username/projects/myproject/moduleB.ts'
    Matched by include pattern '**/*' in 'tsconfig.json'

[7m1[0m import a = require("./moduleC")
[7m [0m [91m                   ~~~~~~~~~~~[0m

  [96mmoduleA.ts[0m:[93m2[0m:[93m40[0m
    [7m2[0m                     import a = require("./ModuleC")
    [7m [0m [96m                                       ~~~~~~~~~~~[0m
    File is included via import here.

../../../../a/lib/lib.d.ts
  Default library for target 'es3'
ModuleC.ts
  Imported via "./ModuleC" from file 'moduleA.ts'
  Imported via "./moduleC" from file 'moduleB.ts'
  Matched by include pattern '**/*' in 'tsconfig.json'
moduleA.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
moduleB.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
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

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/modulea.ts:
  {"fileName":"/user/username/projects/myproject/moduleA.ts","pollingInterval":250}
/user/username/projects/myproject/modulec.ts:
  {"fileName":"/user/username/projects/myproject/ModuleC.ts","pollingInterval":250}
/user/username/projects/myproject/moduleb.ts:
  {"fileName":"/user/username/projects/myproject/moduleB.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/moduleA.js] file written with same contents
