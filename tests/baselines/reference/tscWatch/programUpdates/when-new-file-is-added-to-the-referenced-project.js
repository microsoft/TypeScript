Input::
//// [/user/username/projects/myproject/projets/project1/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true}}

//// [/user/username/projects/myproject/projets/project1/class1.ts]
class class1 {}

//// [/user/username/projects/myproject/projets/project2/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"references":[{"path":"../project1"}]}

//// [/user/username/projects/myproject/projets/project2/class2.ts]
class class2 {}

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

//// [/user/username/projects/myproject/projets/project1/class1.d.ts]
declare class class1 {}


/a/lib/tsc.js -w -p /user/username/projects/myproject/projets/project2/tsconfig.json
Output::
>> Screen clear
[[90m12:00:33 AM[0m] Starting compilation in watch mode...

[[90m12:00:40 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/projets/project2/class2.ts"]
Program options: {"module":0,"composite":true,"watch":true,"project":"/user/username/projects/myproject/projets/project2/tsconfig.json","configFilePath":"/user/username/projects/myproject/projets/project2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/projets/project1/class1.d.ts
/user/username/projects/myproject/projets/project2/class2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/projets/project1/class1.d.ts
/user/username/projects/myproject/projets/project2/class2.ts

WatchedFiles::
/user/username/projects/myproject/projets/project2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/projets/project2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/projets/project1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/projets/project1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/projets/project1/class1.d.ts:
  {"fileName":"/user/username/projects/myproject/projets/project1/class1.d.ts","pollingInterval":250}
/user/username/projects/myproject/projets/project2/class2.ts:
  {"fileName":"/user/username/projects/myproject/projets/project2/class2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/projets/project1:
  {"directoryName":"/user/username/projects/myproject/projets/project1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/project2/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/projets/project2/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/projets/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/project2:
  {"directoryName":"/user/username/projects/myproject/projets/project2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/projets/project2/class2.js]
var class2 = /** @class */ (function () {
    function class2() {
    }
    return class2;
}());


//// [/user/username/projects/myproject/projets/project2/class2.d.ts]
declare class class2 {
}


//// [/user/username/projects/myproject/projets/project2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "module": 0,
      "composite": true,
      "watch": true,
      "project": "./tsconfig.json",
      "configFilePath": "./tsconfig.json"
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../project1/class1.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change:: Add class3 to project1 and build it

Input::
//// [/user/username/projects/myproject/projets/project1/class3.ts]
class class3 {}

//// [/user/username/projects/myproject/projets/project1/class3.d.ts]
declare class class3 {}


Output::
>> Screen clear
[[90m12:00:45 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:55 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/projets/project2/class2.ts"]
Program options: {"module":0,"composite":true,"watch":true,"project":"/user/username/projects/myproject/projets/project2/tsconfig.json","configFilePath":"/user/username/projects/myproject/projets/project2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/projets/project1/class1.d.ts
/user/username/projects/myproject/projets/project1/class3.d.ts
/user/username/projects/myproject/projets/project2/class2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/projets/project1/class1.d.ts
/user/username/projects/myproject/projets/project1/class3.d.ts
/user/username/projects/myproject/projets/project2/class2.ts

WatchedFiles::
/user/username/projects/myproject/projets/project2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/projets/project2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/projets/project1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/projets/project1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/projets/project1/class1.d.ts:
  {"fileName":"/user/username/projects/myproject/projets/project1/class1.d.ts","pollingInterval":250}
/user/username/projects/myproject/projets/project2/class2.ts:
  {"fileName":"/user/username/projects/myproject/projets/project2/class2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/projets/project1/class3.d.ts:
  {"fileName":"/user/username/projects/myproject/projets/project1/class3.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/projets/project1:
  {"directoryName":"/user/username/projects/myproject/projets/project1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/project2/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/projets/project2/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/projets/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/projets/project2:
  {"directoryName":"/user/username/projects/myproject/projets/project2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/projets/project2/class2.js] file written with same contents
//// [/user/username/projects/myproject/projets/project2/class2.d.ts] file written with same contents
//// [/user/username/projects/myproject/projets/project2/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "../project1/class3.d.ts": {
        "version": "-3469165364-declare class class3 {}",
        "signature": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "module": 0,
      "composite": true,
      "watch": true,
      "project": "./tsconfig.json",
      "configFilePath": "./tsconfig.json"
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion"
}

