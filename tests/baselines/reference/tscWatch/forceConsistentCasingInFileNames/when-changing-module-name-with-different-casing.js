/a/lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
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

//// [/user/username/projects/myproject/logger.js]
"use strict";
exports.__esModule = true;
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



Output::
>> Screen clear
12:00:23 AM - Starting compilation in watch mode...



12:00:28 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/myproject/another.ts","/user/username/projects/myproject/logger.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/logger.ts
/user/username/projects/myproject/another.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/logger.ts
/user/username/projects/myproject/another.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/another.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/logger.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change module name from logger to Logger

//// [/user/username/projects/myproject/another.ts]
import { logger } from "./Logger"; new logger();

//// [/user/username/projects/myproject/another.js]
"use strict";
exports.__esModule = true;
var Logger_1 = require("./Logger");
new Logger_1.logger();



Output::
>> Screen clear
12:00:32 AM - File change detected. Starting incremental compilation...


user/username/projects/myproject/another.ts(1,24): error TS1261: Already included file name '/user/username/projects/myproject/Logger.ts' differs from file name '/user/username/projects/myproject/logger.ts' only in casing.


12:00:36 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/myproject/another.ts","/user/username/projects/myproject/logger.ts"]
Program options: {"forceConsistentCasingInFileNames":true,"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Logger.ts
/user/username/projects/myproject/another.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/another.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":250}
/user/username/projects/myproject/another.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/logger.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
