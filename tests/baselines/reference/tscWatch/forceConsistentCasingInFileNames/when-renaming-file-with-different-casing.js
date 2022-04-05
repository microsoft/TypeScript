Input::
//// [/user/username/projects/myproject/logger.ts]
export class logger { }

//// [/user/username/projects/myproject/another.ts]
import { logger } from "./logger"; new logger();

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"forceConsistentCasingInFileNames":true}}

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


/a/lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/another.ts","/user/username/projects/myproject/logger.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/logger.ts
/user/username/projects/myproject/another.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/logger.ts
/user/username/projects/myproject/another.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/logger.ts (used version)
/user/username/projects/myproject/another.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/another.ts:
  {"fileName":"/user/username/projects/myproject/another.ts","pollingInterval":250}
/user/username/projects/myproject/logger.ts:
  {"fileName":"/user/username/projects/myproject/logger.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/logger.js]
"use strict";
exports.__esModule = true;
exports.logger = void 0;
var logger = /** @class */ (function () {
    function logger() {
    }
    return logger;
}());
exports.logger = logger;


//// [/user/username/projects/myproject/another.js]
"use strict";
exports.__esModule = true;
var logger_1 = require("./logger");
new logger_1.logger();



Change:: Change name of file from logger to Logger

Input::
//// [/user/username/projects/myproject/Logger.ts] file was renamed from file /user/username/projects/myproject/logger.ts

Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/another.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1149: [0mFile name '/user/username/projects/myproject/logger.ts' differs from already included file name '/user/username/projects/myproject/Logger.ts' only in casing.
  The file is in the program because:
    Matched by include pattern '**/*' in '/user/username/projects/myproject/tsconfig.json'
    Imported via "./logger" from file '/user/username/projects/myproject/another.ts'

[7m1[0m import { logger } from "./logger"; new logger();
[7m [0m [91m                       ~~~~~~~~~~[0m

[[90m12:00:33 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/Logger.ts","/user/username/projects/myproject/another.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Logger.ts
/user/username/projects/myproject/another.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/another.ts:
  {"fileName":"/user/username/projects/myproject/another.ts","pollingInterval":250}
/user/username/projects/myproject/logger.ts:
  {"fileName":"/user/username/projects/myproject/logger.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

