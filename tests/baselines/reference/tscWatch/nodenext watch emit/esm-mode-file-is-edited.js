Input::
//// [/project/tsconfig.json]
{"compilerOptions":{"strict":true,"target":"es2020","module":"nodenext","moduleResolution":"nodenext","outDir":"../dist"}}

//// [/project/src/index.ts]
import * as Thing from "thing";

Thing.fn();

//// [/project/src/deps.d.ts]
declare module "thing";

//// [/project/package.json]
{"name":"some-proj","version":"1.0.0","description":"","type":"module","main":"index.js"}

//// [/a/lib/lib.es2020.full.d.ts]
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


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

/a/lib/tsc.js --w --p /project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:27 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/project/src/deps.d.ts","/project/src/index.ts"]
Program options: {"strict":true,"target":7,"module":199,"moduleResolution":99,"outDir":"/dist","watch":true,"project":"/project/tsconfig.json","configFilePath":"/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2020.full.d.ts (used version)
/project/src/deps.d.ts (used version)
/project/src/index.ts (used version)

WatchedFiles::
/project/tsconfig.json:
  {"fileName":"/project/tsconfig.json","pollingInterval":250}
/project/src/deps.d.ts:
  {"fileName":"/project/src/deps.d.ts","pollingInterval":250}
/project/src/index.ts:
  {"fileName":"/project/src/index.ts","pollingInterval":250}
/a/lib/lib.es2020.full.d.ts:
  {"fileName":"/a/lib/lib.es2020.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/project/node_modules/@types:
  {"directoryName":"/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/project:
  {"directoryName":"/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/dist/index.js]
import * as Thing from "thing";
Thing.fn();



fileExists:: {
 "/project/tsconfig.json": 1,
 "/project/src/package.json": 3,
 "/project/package.json": 3,
 "/a/lib/package.json": 2,
 "/a/package.json": 2,
 "/package.json": 2
} 

directoryExists:: {
 "/project/tsconfig.json": 1,
 "/project/src": 3,
 "/project": 3,
 "/project/src/node_modules": 2,
 "/project/node_modules": 2,
 "/node_modules": 2,
 "/project/node_modules/@types": 1,
 "/node_modules/@types": 1,
 "/a/lib": 2,
 "/a": 2,
 "/": 2,
 "/dist": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Modify typescript file

Input::
//// [/project/src/index.ts]
import * as Thing from "thing";
Thing.fn();


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/project/src/deps.d.ts","/project/src/index.ts"]
Program options: {"strict":true,"target":7,"module":199,"moduleResolution":99,"outDir":"/dist","watch":true,"project":"/project/tsconfig.json","configFilePath":"/project/tsconfig.json"}
Program structureReused: Completely
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/project/src/index.ts

Shape signatures in builder refreshed for::
/project/src/index.ts (computed .d.ts)

WatchedFiles::
/project/tsconfig.json:
  {"fileName":"/project/tsconfig.json","pollingInterval":250}
/project/src/deps.d.ts:
  {"fileName":"/project/src/deps.d.ts","pollingInterval":250}
/project/src/index.ts:
  {"fileName":"/project/src/index.ts","pollingInterval":250}
/a/lib/lib.es2020.full.d.ts:
  {"fileName":"/a/lib/lib.es2020.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/project/node_modules/@types:
  {"directoryName":"/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/project:
  {"directoryName":"/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/dist/index.js] file written with same contents

fileExists:: {
 "/a/lib/package.json": 1,
 "/a/package.json": 1,
 "/package.json": 1,
 "/project/src/package.json": 3,
 "/project/package.json": 3
} 

directoryExists:: {
 "/a/lib": 1,
 "/a": 1,
 "/": 1,
 "/project/src": 3,
 "/project": 3
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 
