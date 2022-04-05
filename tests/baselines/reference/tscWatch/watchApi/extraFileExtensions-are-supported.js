Input::
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/main.ts]
const x = 10;

//// [/user/username/projects/myproject/other.vue]


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


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

/a/lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/main.ts","/user/username/projects/myproject/other.vue"]
Program options: {"allowNonTsExtensions":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)
/user/username/projects/myproject/other.vue (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/main.ts:
  {"fileName":"/user/username/projects/myproject/main.ts","pollingInterval":250}
/user/username/projects/myproject/other.vue:
  {"fileName":"/user/username/projects/myproject/other.vue","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/main.js]
var x = 10;


//// [/user/username/projects/myproject/other.vue.js]



fileExists:: {} 

directoryExists:: {
 "/user/username/projects/myproject/node_modules/@types": 1,
 "/user/username/projects/node_modules/@types": 1,
 "/user/username/node_modules/@types": 1,
 "/user/node_modules/@types": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Write a file

Input::
//// [/user/username/projects/myproject/other2.vue]



fileExists:: {
 "/user/username/projects/myproject/other2.vue": 1
} 

directoryExists:: {
 "/user/username/projects/myproject/other2.vue": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:31 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/main.ts","/user/username/projects/myproject/other.vue","/user/username/projects/myproject/other2.vue"]
Program options: {"allowNonTsExtensions":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue
/user/username/projects/myproject/other2.vue

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/other2.vue

Shape signatures in builder refreshed for::
/user/username/projects/myproject/other2.vue (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/main.ts:
  {"fileName":"/user/username/projects/myproject/main.ts","pollingInterval":250}
/user/username/projects/myproject/other.vue:
  {"fileName":"/user/username/projects/myproject/other.vue","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/other2.vue:
  {"fileName":"/user/username/projects/myproject/other2.vue","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/other2.vue.js]



fileExists:: {
 "/user/username/projects/myproject/other2.vue.js": 1
} 

directoryExists:: {
 "/user/username/projects/myproject/node_modules/@types": 1,
 "/user/username/projects/node_modules/@types": 1,
 "/user/username/node_modules/@types": 1,
 "/user/node_modules/@types": 1,
 "/node_modules/@types": 1,
 "/user/username/projects/myproject/other2.vue.js": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 
