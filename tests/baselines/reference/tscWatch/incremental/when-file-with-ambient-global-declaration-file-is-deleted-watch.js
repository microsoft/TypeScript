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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/users/username/projects/project/globals.d.ts]
declare namespace Config { const value: string;} 

//// [/users/username/projects/project/index.ts]
console.log(Config.value);

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"incremental":true}}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...


[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/users/username/projects/project/globals.d.ts","/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/globals.d.ts
/users/username/projects/project/index.ts

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"fileName":"/users/username/projects/project/tsconfig.json","pollingInterval":250}
/users/username/projects/project/globals.d.ts:
  {"fileName":"/users/username/projects/project/globals.d.ts","pollingInterval":250}
/users/username/projects/project/index.ts:
  {"fileName":"/users/username/projects/project/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules/@types:
  {"directoryName":"/users/username/projects/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"directoryName":"/users/username/projects/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/index.js]
console.log(Config.value);


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./globals.d.ts": {
        "version": "-6314871648-declare namespace Config { const value: string;} ",
        "signature": "-6314871648-declare namespace Config { const value: string;} ",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "5371023861-console.log(Config.value);",
        "signature": "5381-",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "incremental": true,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./globals.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change::

Input::
//// [/users/username/projects/project/globals.d.ts] deleted

Output::
>> Screen clear
[[90m12:00:30 AM[0m] Starting compilation in watch mode...


[96mindex.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS2304: [0mCannot find name 'Config'.

[7m1[0m console.log(Config.value);
[7m [0m [91m            ~~~~~~[0m


[[90m12:00:37 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/users/username/projects/project/index.ts"]
Program options: {"incremental":true,"watch":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/index.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/index.ts

WatchedFiles::
/users/username/projects/project/tsconfig.json:
  {"fileName":"/users/username/projects/project/tsconfig.json","pollingInterval":250}
/users/username/projects/project/index.ts:
  {"fileName":"/users/username/projects/project/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/users/username/projects/project/node_modules/@types:
  {"directoryName":"/users/username/projects/project/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/users/username/projects/project:
  {"directoryName":"/users/username/projects/project","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/users/username/projects/project/index.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "5371023861-console.log(Config.value);",
        "signature": "5381-",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "incremental": true,
      "watch": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./index.ts",
        [
          {
            "file": "./index.ts",
            "start": 12,
            "length": 6,
            "messageText": "Cannot find name 'Config'.",
            "category": 1,
            "code": 2304
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion"
}

