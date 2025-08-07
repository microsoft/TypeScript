Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{
  "files": [],
  "references": [
    {
      "path": "shared/src/library"
    },
    {
      "path": "app/src/program"
    }
  ]
}

//// [/user/username/projects/myproject/shared/src/library/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../bld/library"
  }
}

//// [/user/username/projects/myproject/shared/src/library/index.ts]
export function foo() {}

//// [/user/username/projects/myproject/shared/package.json]
{
  "name": "shared",
  "version": "1.0.0",
  "main": "bld/library/index.js",
  "types": "bld/library/index.d.ts"
}

//// [/user/username/projects/myproject/app/src/program/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../bld/program",
    "disableSourceOfProjectReferenceRedirect": true
  },
  "references": [
    {
      "path": "../../../shared/src/library"
    }
  ]
}

//// [/user/username/projects/myproject/app/src/program/bar.ts]
import {foo} from "shared";

//// [/user/username/projects/myproject/app/src/program/index.ts]
foo

//// [/user/username/projects/myproject/node_modules/shared] symlink(/user/username/projects/myproject/shared)

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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

//// [/user/username/projects/myproject/shared/bld/library/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { }


//// [/user/username/projects/myproject/shared/bld/library/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/shared/bld/library/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../src/library/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3524703962-export function foo() {}","signature":"-5677608893-export declare function foo(): void;\n"}],"root":[2],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/bld/library/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../src/library/index.ts"
  ],
  "fileInfos": {
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../src/library/index.ts": {
      "original": {
        "version": "3524703962-export function foo() {}",
        "signature": "-5677608893-export declare function foo(): void;\n"
      },
      "version": "3524703962-export function foo() {}",
      "signature": "-5677608893-export declare function foo(): void;\n"
    }
  },
  "root": [
    [
      2,
      "../../src/library/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 825
}

//// [/user/username/projects/myproject/app/bld/program/bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/app/bld/program/bar.d.ts]
export {};


//// [/user/username/projects/myproject/app/bld/program/index.js]
foo;


//// [/user/username/projects/myproject/app/bld/program/index.d.ts]


//// [/user/username/projects/myproject/app/bld/program/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../../../home/src/tslibs/ts/lib/lib.d.ts","../../../shared/bld/library/index.d.ts","../../src/program/bar.ts","../../src/program/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-5677608893-export declare function foo(): void;\n",{"version":"-9677035610-import {foo} from \"shared\";","signature":"-3531856636-export {};\n"},{"version":"193491849-foo","signature":"5381-","affectsGlobalScope":true}],"root":[3,4],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[4,[{"start":0,"length":3,"messageText":"Cannot find name 'foo'.","category":1,"code":2304}]]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/app/bld/program/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../../../shared/bld/library/index.d.ts",
    "../../src/program/bar.ts",
    "../../src/program/index.ts"
  ],
  "fileIdsList": [
    [
      "../../../shared/bld/library/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../../../shared/bld/library/index.d.ts": {
      "version": "-5677608893-export declare function foo(): void;\n",
      "signature": "-5677608893-export declare function foo(): void;\n"
    },
    "../../src/program/bar.ts": {
      "original": {
        "version": "-9677035610-import {foo} from \"shared\";",
        "signature": "-3531856636-export {};\n"
      },
      "version": "-9677035610-import {foo} from \"shared\";",
      "signature": "-3531856636-export {};\n"
    },
    "../../src/program/index.ts": {
      "original": {
        "version": "193491849-foo",
        "signature": "5381-",
        "affectsGlobalScope": true
      },
      "version": "193491849-foo",
      "signature": "5381-",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "../../src/program/bar.ts"
    ],
    [
      4,
      "../../src/program/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../../src/program/bar.ts": [
      "../../../shared/bld/library/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../src/program/index.ts",
      [
        {
          "start": 0,
          "length": 3,
          "messageText": "Cannot find name 'foo'.",
          "category": 1,
          "code": 2304
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1171
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/app/src/program/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/app/src/program/tsconfig.json, currentDirectory: /user/username/projects/myproject/app/src/program
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/app/src/program/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/app/src/program/bar.ts",
  "/user/username/projects/myproject/app/src/program/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/app/bld/program",
  "disableSourceOfProjectReferenceRedirect": true,
  "configFilePath": "/user/username/projects/myproject/app/src/program/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/shared/src/library",
   "originalPath": "../../../shared/src/library"
  }
 ]
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/app/src/program/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/app/src/program/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program 1 undefined Config: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/bar.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/shared/src/library/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/shared/src/library/index.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/shared/bld/library",
  "configFilePath": "/user/username/projects/myproject/shared/src/library/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/src/library 1 undefined Config: /user/username/projects/myproject/shared/src/library/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/bld/library/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/shared/package.json 2000 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/program/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/app/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/app/src/program/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/app/src/program/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/shared/bld/library/index.d.ts Text-1 "export declare function foo(): void;\n"
	/user/username/projects/myproject/app/src/program/bar.ts Text-1 "import {foo} from \"shared\";"
	/user/username/projects/myproject/app/src/program/index.ts SVC-1-0 "foo"


	../../../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../shared/bld/library/index.d.ts
	  Imported via "shared" from file 'bar.ts' with packageId 'shared/bld/library/index.d.ts@1.0.0'
	bar.ts
	  Matched by default include pattern '**/*'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/app/src/program/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "411522698dbc12875e9e299d0a129013c8978d5b30e858e832f28e635af6304a",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 30,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 450,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "outDir": "",
            "disableSourceOfProjectReferenceRedirect": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": false,
          "exclude": false,
          "compileOnSave": false,
          "configFileName": "tsconfig.json",
          "projectType": "configured",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/user/username/projects/myproject/app/src/program/index.ts",
        "configFile": "/user/username/projects/myproject/app/src/program/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/app/src/program/tsconfig.json ProjectRootPath: undefined:: Result: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/tsconfig.json, currentDirectory: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/app/src/program/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/app/src/program/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/app/src/program/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/app/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/app/src/program/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/app/src/program/bar.ts: *new*
  {}
/user/username/projects/myproject/app/src/program/tsconfig.json: *new*
  {}
/user/username/projects/myproject/shared/bld/library/index.d.ts: *new*
  {}
/user/username/projects/myproject/shared/package.json: *new*
  {}
/user/username/projects/myproject/shared/src/library/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/app/src/program: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/shared/src/library: *new*
  {}

Projects::
/user/username/projects/myproject/app/src/program/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/app/src/program/tsconfig.json
/user/username/projects/myproject/app/src/program/bar.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/app/src/program/tsconfig.json
/user/username/projects/myproject/app/src/program/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/app/src/program/tsconfig.json *default*
/user/username/projects/myproject/shared/bld/library/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/app/src/program/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/user/username/projects/myproject/app/src/program/index.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"shared\"",
          "changes": [
            {
              "fileName": "/user/username/projects/myproject/app/src/program/index.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"shared\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
