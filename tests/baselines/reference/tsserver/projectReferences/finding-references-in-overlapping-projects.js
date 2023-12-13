currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
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

//// [/user/username/projects/solution/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./a"
    },
    {
      "path": "./b"
    },
    {
      "path": "./c"
    },
    {
      "path": "./d"
    }
  ]
}

//// [/user/username/projects/solution/a/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "module": "none"
  },
  "files": [
    "./index.ts"
  ]
}

//// [/user/username/projects/solution/a/index.ts]

                export interface I {
                    M(): void;
                }

//// [/user/username/projects/solution/b/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "./index.ts"
  ],
  "references": [
    {
      "path": "../a"
    }
  ]
}

//// [/user/username/projects/solution/b/index.ts]

                import { I } from "../a";

                export class B implements I {
                    M() {}
                }

//// [/user/username/projects/solution/c/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "./index.ts"
  ],
  "references": [
    {
      "path": "../b"
    }
  ]
}

//// [/user/username/projects/solution/c/index.ts]

                import { I } from "../a";
                import { B } from "../b";

                export const C: I = new B();
                

//// [/user/username/projects/solution/d/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "./index.ts"
  ],
  "references": [
    {
      "path": "../c"
    }
  ]
}

//// [/user/username/projects/solution/d/index.ts]

                import { I } from "../a";
                import { C } from "../c";

                export const D: I = C;
                


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/solution/b/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/solution/b/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/solution/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/b/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/b/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "../a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/solution/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/a/index.ts"
 ],
 "options": {
  "composite": true,
  "module": 0,
  "configFilePath": "/user/username/projects/solution/a/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/tsconfig.json 2000 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/solution/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/solution/a/index.ts Text-1 "\n                export interface I {\n                    M(): void;\n                }"
	/user/username/projects/solution/b/index.ts SVC-1-0 "\n                import { I } from \"../a\";\n\n                export class B implements I {\n                    M() {}\n                }"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Source from referenced project '../a/tsconfig.json' included because '--module' is specified as 'none'
	  Imported via "../a" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/solution/b/tsconfig.json"
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
          "projectId": "40bc47341ab03bfd7099d7a06b27e131a16445ccbef301460844c9c4e79c0860",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 220,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
        "triggerFile": "/user/username/projects/solution/b/index.ts",
        "configFile": "/user/username/projects/solution/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/tsconfig.json :: Config file name: /user/username/projects/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/solution/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/solution/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/solution: *new*
  {}
/user/username/projects/solution/a/index.ts: *new*
  {}
/user/username/projects/solution/a/tsconfig.json: *new*
  {}
/user/username/projects/solution/b/tsconfig.json: *new*
  {}
/user/username/projects/solution/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/solution/a: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts",
        "line": 4,
        "offset": 43
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/solution/a/tsconfig.json",
        "reason": "Creating project for original file: /user/username/projects/solution/a/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/solution/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/solution/a/index.ts Text-1 "\n                export interface I {\n                    M(): void;\n                }"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/solution/a/tsconfig.json"
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
          "projectId": "601cca2b9f98f2c38347b067a22b5d4ce57730af89c0c832c70f6f64771d0bed",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 86,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true,
            "module": "none"
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Loading configured project /user/username/projects/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/solution/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project /user/username/projects/solution/b/tsconfig.json of open file /user/username/projects/solution/b/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/solution/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/solution/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/a",
   "originalPath": "./a"
  },
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "./b"
  },
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "./c"
  },
  {
   "path": "/user/username/projects/solution/d",
   "originalPath": "./d"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/solution/c/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/c/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/c/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/b",
   "originalPath": "../b"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/solution/d/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/solution/d/index.ts"
 ],
 "options": {
  "composite": true,
  "configFilePath": "/user/username/projects/solution/d/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/solution/c",
   "originalPath": "../c"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/tsconfig.json 2000 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/solution/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/solution/tsconfig.json"
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
          "projectId": "9e1db2ade29bfadfe77584f20398bae03c74e5c89d4b3b0adb0dbf0b5ca26c9e",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 0,
            "tsSize": 0,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
          "files": true,
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
        "triggerFile": "/user/username/projects/solution/tsconfig.json",
        "configFile": "/user/username/projects/solution/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/solution/c/tsconfig.json",
        "reason": "Creating project referenced by : /user/username/projects/solution/tsconfig.json as it references project /user/username/projects/solution/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/solution/c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/solution/a/index.ts Text-1 "\n                export interface I {\n                    M(): void;\n                }"
	/user/username/projects/solution/b/index.ts SVC-1-0 "\n                import { I } from \"../a\";\n\n                export class B implements I {\n                    M() {}\n                }"
	/user/username/projects/solution/c/index.ts Text-1 "\n                import { I } from \"../a\";\n                import { B } from \"../b\";\n\n                export const C: I = new B();\n                "


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/solution/c/tsconfig.json"
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
          "projectId": "366195246a21cbb8033f5f285e72ac32a0e8da77de7380713e91a9b25bcfe284",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 367,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/solution/d/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/solution/d/tsconfig.json",
        "reason": "Creating project referenced by : /user/username/projects/solution/tsconfig.json as it references project /user/username/projects/solution/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution 0 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/a 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/c 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/b 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/d/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/solution/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/solution/d/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/solution/d/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/solution/d/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/solution/a/index.ts Text-1 "\n                export interface I {\n                    M(): void;\n                }"
	/user/username/projects/solution/b/index.ts SVC-1-0 "\n                import { I } from \"../a\";\n\n                export class B implements I {\n                    M() {}\n                }"
	/user/username/projects/solution/c/index.ts Text-1 "\n                import { I } from \"../a\";\n                import { B } from \"../b\";\n\n                export const C: I = new B();\n                "
	/user/username/projects/solution/d/index.ts Text-1 "\n                import { I } from \"../a\";\n                import { C } from \"../c\";\n\n                export const D: I = C;\n                "


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../a/index.ts
	  Imported via "../a" from file 'index.ts'
	  Imported via "../a" from file '../c/index.ts'
	  Imported via "../a" from file '../b/index.ts'
	../b/index.ts
	  Imported via "../b" from file '../c/index.ts'
	../c/index.ts
	  Imported via "../c" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/projects/solution/d/tsconfig.json"
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
          "projectId": "829ae3195c32df333823e591ead5ec3707a23aa5dfea306b01d3033a730c9de5",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 4,
            "tsSize": 508,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "composite": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": false,
          "files": true,
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
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/d/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 4,
              "offset": 43
            },
            "end": {
              "line": 4,
              "offset": 44
            },
            "lineText": "                export class B implements I {",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/a/index.ts",
            "start": {
              "line": 2,
              "offset": 34
            },
            "end": {
              "line": 2,
              "offset": 35
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 4,
              "offset": 18
            },
            "lineText": "                export interface I {",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const C: I = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const D: I = C;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "I",
        "symbolStartOffset": 43,
        "symbolDisplayString": "(alias) interface I\nimport I"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/solution/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/solution/c/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/solution/d/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/solution/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/solution:
  {}
/user/username/projects/solution/a/index.ts:
  {}
/user/username/projects/solution/a/tsconfig.json:
  {}
/user/username/projects/solution/b/tsconfig.json:
  {}
/user/username/projects/solution/c/index.ts: *new*
  {}
/user/username/projects/solution/c/tsconfig.json: *new*
  {}
/user/username/projects/solution/d/index.ts: *new*
  {}
/user/username/projects/solution/d/tsconfig.json: *new*
  {}
/user/username/projects/solution/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/solution/a:
  {}
/user/username/projects/solution/b: *new*
  {}
/user/username/projects/solution/c: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/solution/b/index.ts",
        "line": 4,
        "offset": 43
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/b/index.ts position 86 in project /user/username/projects/solution/d/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/b
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/b/index.ts :: Config file name: /user/username/projects/solution/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/a
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/a/index.ts :: Config file name: /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/solution/c
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/solution/c/index.ts :: Config file name: /user/username/projects/solution/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/solution/a/index.ts position 34 in project /user/username/projects/solution/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/b/index.ts",
            "start": {
              "line": 4,
              "offset": 43
            },
            "end": {
              "line": 4,
              "offset": 44
            },
            "lineText": "                export class B implements I {",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/a/index.ts",
            "start": {
              "line": 2,
              "offset": 34
            },
            "end": {
              "line": 2,
              "offset": 35
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 4,
              "offset": 18
            },
            "lineText": "                export interface I {",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/c/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const C: I = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 2,
              "offset": 26
            },
            "end": {
              "line": 2,
              "offset": 27
            },
            "contextStart": {
              "line": 2,
              "offset": 17
            },
            "contextEnd": {
              "line": 2,
              "offset": 42
            },
            "lineText": "                import { I } from \"../a\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/solution/d/index.ts",
            "start": {
              "line": 5,
              "offset": 33
            },
            "end": {
              "line": 5,
              "offset": 34
            },
            "lineText": "                export const D: I = C;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "I",
        "symbolStartOffset": 43,
        "symbolDisplayString": "(alias) interface I\nimport I"
      },
      "responseRequired": true
    }
After request
