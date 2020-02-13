/a/lib/tsc.js --w
//// [/user/username/projects/noEmitOnError/shared/types/db.ts]
export interface A {
    name: string;
}

//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;

//// [/user/username/projects/noEmitOnError/src/other.ts]
console.log("hi");
export { }

//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "noEmitOnError": true
    }
}


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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


Output::
>> Screen clear
12:00:31 AM - Starting compilation in watch mode...


src/main.ts(4,1): error TS1005: ',' expected.


12:00:32 AM - Found 1 error. Watching for file changes.


Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror/node_modules/@types:
  {"directoryName":"/user/username/projects/noEmitOnError/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Fix the error

//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/noEmitOnError/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = {
    lastName: 'sdsd'
};


//// [/user/username/projects/noEmitOnError/dev-build/src/other.js]
"use strict";
exports.__esModule = true;
console.log("hi");



Output::
>> Screen clear
12:00:36 AM - File change detected. Starting incremental compilation...



12:00:53 AM - Found 0 errors. Watching for file changes.


Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/noEmitOnError/src/main.ts

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror/node_modules/@types:
  {"directoryName":"/user/username/projects/noEmitOnError/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
