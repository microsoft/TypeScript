/compiler/tsc.js -w -p /src/tsconfig.json
//// [/compiler/lib.es5.d.ts]
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
declare const eval: any

//// [/compiler/lib.es2015.promise.d.ts]
declare class Promise<T> {}

//// [/src/app.ts]
var x: Promise<string>;

//// [/src/tsconfig.json]
{"compilerOptions":{"module":"commonjs","target":"es5","noImplicitAny":true,"sourceMap":false,"lib":["es5"]}}

//// [/src/app.js]
var x;



Output::
>> Screen clear
12:00:15 AM - Starting compilation in watch mode...


src/app.ts(1,8): error TS2583: Cannot find name 'Promise'. Do you need to change your target library? Try changing the `lib` compiler option to es2015 or later.


12:00:18 AM - Found 1 error. Watching for file changes.


Program root files: ["/src/app.ts"]
Program options: {"module":1,"target":1,"noImplicitAny":true,"sourceMap":false,"lib":["lib.es5.d.ts"],"watch":true,"project":"/src/tsconfig.json","configFilePath":"/src/tsconfig.json"}
Program files::
/compiler/lib.es5.d.ts
/src/app.ts

Semantic diagnostics in builder refreshed for::
/compiler/lib.es5.d.ts
/src/app.ts

WatchedFiles::
/src/tsconfig.json:
  {"pollingInterval":250}
/src/app.ts:
  {"pollingInterval":250}
/compiler/lib.es5.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/src/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/src:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change the lib in config

//// [/src/tsconfig.json]
{"compilerOptions":{"module":"commonjs","target":"es5","noImplicitAny":true,"sourceMap":false,"lib":["es5","es2015.promise"]}}

//// [/src/app.js] file written with same contents

Output::
>> Screen clear
12:00:22 AM - File change detected. Starting incremental compilation...



12:00:26 AM - Found 0 errors. Watching for file changes.


Program root files: ["/src/app.ts"]
Program options: {"module":1,"target":1,"noImplicitAny":true,"sourceMap":false,"lib":["lib.es5.d.ts","lib.es2015.promise.d.ts"],"watch":true,"project":"/src/tsconfig.json","configFilePath":"/src/tsconfig.json"}
Program files::
/compiler/lib.es5.d.ts
/compiler/lib.es2015.promise.d.ts
/src/app.ts

Semantic diagnostics in builder refreshed for::
/compiler/lib.es5.d.ts
/compiler/lib.es2015.promise.d.ts
/src/app.ts

WatchedFiles::
/src/tsconfig.json:
  {"pollingInterval":250}
/src/app.ts:
  {"pollingInterval":250}
/compiler/lib.es5.d.ts:
  {"pollingInterval":250}
/compiler/lib.es2015.promise.d.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/src:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/src/node_modules/@types:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
