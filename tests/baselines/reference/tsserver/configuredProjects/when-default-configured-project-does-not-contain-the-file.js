Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/bar/tsconfig.json]
{}

//// [/user/username/projects/myproject/bar/index.ts]
import {foo} from "../foo/lib";
foo();

//// [/user/username/projects/myproject/foobar/tsconfig.json]
/user/username/projects/myproject/bar/tsconfig.json

//// [/user/username/projects/myproject/foobar/index.ts]
import {foo} from "../foo/lib";
foo();

//// [/user/username/projects/myproject/foo/tsconfig.json]
{
  "include": [
    "index.ts"
  ],
  "compilerOptions": {
    "declaration": true,
    "outDir": "lib"
  }
}

//// [/user/username/projects/myproject/foo/index.ts]
export function foo() {}

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

//// [/user/username/projects/myproject/foo/lib/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
function foo() { }


//// [/user/username/projects/myproject/foo/lib/index.d.ts]
export declare function foo(): void;


//// [/user/username/projects/myproject/foo/lib/tsconfig.tsbuildinfo]
{"root":["../index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/foo/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 50
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/bar/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/bar/tsconfig.json, currentDirectory: /user/username/projects/myproject/bar
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/bar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/bar/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/bar/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/bar/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/bar/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar 1 undefined Config: /user/username/projects/myproject/bar/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar 1 undefined Config: /user/username/projects/myproject/bar/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/foo/lib/index.d.ts Text-1 "export declare function foo(): void;\n"
	/user/username/projects/myproject/bar/index.ts SVC-1-0 "import {foo} from \"../foo/lib\";\nfoo();"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../foo/lib/index.d.ts
	  Imported via "../foo/lib" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/bar/tsconfig.json"
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
          "projectId": "5370ca7ca3faf398ecd694700ec7a0793b5e111125c5b8f56f69d3de23ff19ae",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 38,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 450,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
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
        "triggerFile": "/user/username/projects/myproject/bar/index.ts",
        "configFile": "/user/username/projects/myproject/bar/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
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
/user/username/projects/myproject/bar/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/bar/tsconfig.json: *new*
  {}
/user/username/projects/myproject/foo/lib/index.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar: *new*
  {}
/user/username/projects/myproject/foo: *new*
  {}

Projects::
/user/username/projects/myproject/bar/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json
/user/username/projects/myproject/bar/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json *default*
/user/username/projects/myproject/foo/lib/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foobar/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/foobar/tsconfig.json, currentDirectory: /user/username/projects/myproject/foobar
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/foobar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foobar/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/foobar/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/foobar/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/foobar/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar 1 undefined Config: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar 1 undefined Config: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foobar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foobar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foobar/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/foo/lib/index.d.ts Text-1 "export declare function foo(): void;\n"
	/user/username/projects/myproject/foobar/index.ts SVC-1-0 "import {foo} from \"../foo/lib\";\nfoo();"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../foo/lib/index.d.ts
	  Imported via "../foo/lib" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/foobar/tsconfig.json"
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
          "projectId": "949f16dcb00dd27802a7f89d6b97159e5b6a72c2080f9204d547e9e6d64b92be",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 38,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 450,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {},
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
        "triggerFile": "/user/username/projects/myproject/foobar/index.ts",
        "configFile": "/user/username/projects/myproject/foobar/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 2
            },
            "text": "'{' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 6
            },
            "end": {
              "line": 1,
              "offset": 7
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 15
            },
            "end": {
              "line": 1,
              "offset": 16
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 24
            },
            "end": {
              "line": 1,
              "offset": 25
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 34
            },
            "end": {
              "line": 1,
              "offset": 35
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 38
            },
            "end": {
              "line": 1,
              "offset": 39
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 47
            },
            "end": {
              "line": 1,
              "offset": 48
            },
            "text": "',' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 52
            },
            "end": {
              "line": 1,
              "offset": 52
            },
            "text": "'}' expected.",
            "code": 1005,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 2
            },
            "end": {
              "line": 1,
              "offset": 6
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 7
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 16
            },
            "end": {
              "line": 1,
              "offset": 24
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 25
            },
            "end": {
              "line": 1,
              "offset": 34
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 35
            },
            "end": {
              "line": 1,
              "offset": 38
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 39
            },
            "end": {
              "line": 1,
              "offset": 47
            },
            "text": "Property assignment expected.",
            "code": 1136,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 47
            },
            "end": {
              "line": 1,
              "offset": 47
            },
            "text": "String literal with double quotes expected.",
            "code": 1327,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          },
          {
            "start": {
              "line": 1,
              "offset": 47
            },
            "end": {
              "line": 1,
              "offset": 52
            },
            "text": "Property value can only be string literal, numeric literal, 'true', 'false', 'null', object literal or array literal.",
            "code": 1328,
            "category": "error",
            "fileName": "/user/username/projects/myproject/foobar/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}
/user/username/projects/myproject/foobar/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar: *new*
  {}

Projects::
/user/username/projects/myproject/bar/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/myproject/foobar/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/myproject/bar/tsconfig.json
        /user/username/projects/myproject/foobar/tsconfig.json *new*
/user/username/projects/myproject/bar/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json *default*
/user/username/projects/myproject/foo/lib/index.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /user/username/projects/myproject/bar/tsconfig.json
        /user/username/projects/myproject/foobar/tsconfig.json *new*
/user/username/projects/myproject/foobar/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/foobar/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/index.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/projects/myproject/foo/tsconfig.json, currentDirectory: /user/username/projects/myproject/foo
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/foo/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foo/index.ts"
 ],
 "options": {
  "declaration": true,
  "outDir": "/user/username/projects/myproject/foo/lib",
  "configFilePath": "/user/username/projects/myproject/foo/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/foo/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/foo/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/foo/index.ts SVC-1-0 "export function foo() {}"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/myproject/foo/tsconfig.json"
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
          "projectId": "36730603d9c37d63f14b455060fadde05a7a93dcbc44aecd507b60e066616be6",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 24,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "declaration": true,
            "outDir": ""
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": false,
          "include": true,
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
        "triggerFile": "/user/username/projects/myproject/foo/index.ts",
        "configFile": "/user/username/projects/myproject/foo/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foo/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}
/user/username/projects/myproject/foo/tsconfig.json: *new*
  {}
/user/username/projects/myproject/foobar/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar:
  {}

Projects::
/user/username/projects/myproject/bar/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/myproject/foo/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/projects/myproject/foobar/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /user/username/projects/myproject/bar/tsconfig.json
        /user/username/projects/myproject/foobar/tsconfig.json
        /user/username/projects/myproject/foo/tsconfig.json *new*
/user/username/projects/myproject/bar/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json *default*
/user/username/projects/myproject/foo/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/foo/tsconfig.json *default*
/user/username/projects/myproject/foo/lib/index.d.ts
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/bar/tsconfig.json
        /user/username/projects/myproject/foobar/tsconfig.json
/user/username/projects/myproject/foobar/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/foobar/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/lib/index.d.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/foo/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/foo/lib/index.d.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/foo/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foobar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foobar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foo/lib/index.d.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/bar/tsconfig.json,/user/username/projects/myproject/foobar/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/foobar/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json:
  {}
/user/username/projects/myproject/foo/tsconfig.json:
  {}
/user/username/projects/myproject/foobar/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/foo/lib/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/bar:
  {}
/user/username/projects/myproject/foo:
  {}
/user/username/projects/myproject/foobar:
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /user/username/projects/myproject/bar/tsconfig.json
        /user/username/projects/myproject/foobar/tsconfig.json
        /user/username/projects/myproject/foo/tsconfig.json
/user/username/projects/myproject/bar/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/bar/tsconfig.json *default*
/user/username/projects/myproject/foo/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/foo/tsconfig.json *default*
/user/username/projects/myproject/foo/lib/index.d.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2
        /user/username/projects/myproject/bar/tsconfig.json *default*
        /user/username/projects/myproject/foobar/tsconfig.json
/user/username/projects/myproject/foobar/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/foobar/tsconfig.json *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getApplicableRefactors",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/lib/index.d.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 1,
        "endOffset": 1
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "projectInfo",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/lib/index.d.ts",
        "needFileNameList": false,
        "needDefaultConfiguredProjectInfo": true
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "configFileName": "/user/username/projects/myproject/bar/tsconfig.json",
        "languageServiceDisabled": false,
        "configuredProjectInfo": {
          "notInProject": [
            "/user/username/projects/myproject/foo/tsconfig.json"
          ]
        }
      },
      "responseRequired": true
    }
After request
