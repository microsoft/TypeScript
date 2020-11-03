Input::
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

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/first.tsconfig.json]
{"compilerOptions":{"strict":false}}

//// [/a/b/second.tsconfig.json]
{"extends":"./first.tsconfig.json","compilerOptions":{"strictNullChecks":true}}

//// [/a/b/third.tsconfig.json]
{"extends":"./second.tsconfig.json","compilerOptions":{"strictBindCallApply":true}}

//// [/a/b/fourth.tsconfig.json]
{"extends":"./third.tsconfig.json","compilerOptions":{"strictFunctionTypes":true}}

//// [/a/b/tsconfig.json]
{"extends":"./fourth.tsconfig.json","compilerOptions":{"strictPropertyInitialization":true}}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:30 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"strict":false,"strictNullChecks":true,"strictBindCallApply":true,"strictFunctionTypes":true,"strictPropertyInitialization":true,"watch":true,"project":"/a/b/tsconfig.json","configFilePath":"/a/b/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

WatchedFiles::
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}
/a/b/commonfile1.ts:
  {"fileName":"/a/b/commonFile1.ts","pollingInterval":250}
/a/b/commonfile2.ts:
  {"fileName":"/a/b/commonFile2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/b/fourth.tsconfig.json:
  {"fileName":"/a/b/fourth.tsconfig.json","pollingInterval":250}
/a/b/third.tsconfig.json:
  {"fileName":"/a/b/third.tsconfig.json","pollingInterval":250}
/a/b/second.tsconfig.json:
  {"fileName":"/a/b/second.tsconfig.json","pollingInterval":250}
/a/b/first.tsconfig.json:
  {"fileName":"/a/b/first.tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a/b/node_modules/@types:
  {"directoryName":"/a/b/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/a/b:
  {"directoryName":"/a/b","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/b/commonFile1.js]
var x = 1;


//// [/a/b/commonFile2.js]
var y = 1;


