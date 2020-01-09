/a/lib/tsc.js -w -p /a/b/tsconfig.json
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{"compilerOptions":{"types":["node"],"typeRoots":[]}}

//// [/a/b/node_modules/@types/node/index.d.ts]
declare var process: any

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

//// [/a/b/app.js]
var x = 1;



Output::
>> Screen clear
12:00:25 AM - Starting compilation in watch mode...



12:00:28 AM - Found 0 errors. Watching for file changes.


Program root files: ["/a/b/app.ts"]
Program options: {"types":["node"],"typeRoots":[],"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/a/b/app.ts
/a/b/node_modules/@types/node/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/app.ts
/a/b/node_modules/@types/node/index.d.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"pollingInterval":250}
/a/b/app.ts:
  {"pollingInterval":250}
/a/b/node_modules/@types/node/index.d.ts:
  {"pollingInterval":250}
/a/lib/lib.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
