currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json"
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
       "projectId": "4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98",
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
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json",
      "reason": "Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-1 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-1-0 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json"
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
       "projectId": "75d5ba36c0a162a329bf40235b10e96d2d129b95469e1f02c08da775fb38a2b4",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 2,
        "tsSize": 77,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "composite": true,
        "outDir": "",
        "baseUrl": ""
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
       "configFileName": "other",
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
      "triggerFile": "/user/username/projects/myproject/src/main.ts",
      "configFile": "/user/username/projects/myproject/tsconfig-src.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] getDefaultProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] findDefaultConfiguredProject for /user/username/projects/myproject/src/main.ts: /user/username/projects/myproject/tsconfig-src.json
Before request
//// [/user/username/projects/myproject/tsconfig-src.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"include":["./src/**/*"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./tsconfig-indirect1.json"},{"path":"./tsconfig-indirect2.json"}],"files":[]}

//// [/user/username/projects/myproject/src/main.ts]
import { foo } from 'helpers/functions';
export { foo };

//// [/user/username/projects/myproject/src/helpers/functions.ts]
export const foo = 1;

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

//// [/dummy/dummy.ts]
let a = 10;

//// [/user/username/projects/myproject/target/src/main.d.ts]
import { foo } from 'helpers/functions';
export { foo };
//# sourceMappingURL=main.d.ts.map

//// [/user/username/projects/myproject/target/src/main.d.ts.map]
{"version":3,"file":"main.d.ts","sourceRoot":"","sources":["../../src/main.ts"],"names":[],"mappings":"AAAA,OAAO,EAAE,GAAG,EAAE,MAAM,mBAAmB,CAAC;AAExC,OAAO,EAAC,GAAG,EAAC,CAAC"}

//// [/user/username/projects/myproject/target/src/helpers/functions.d.ts]
export declare const foo = 1;
//# sourceMappingURL=functions.d.ts.map

//// [/user/username/projects/myproject/target/src/helpers/functions.d.ts.map]
{"version":3,"file":"functions.d.ts","sourceRoot":"","sources":["../../../src/helpers/functions.ts"],"names":[],"mappings":"AAAA,eAAO,MAAM,GAAG,IAAI,CAAC"}

//// [/user/username/projects/myproject/indirect3/tsconfig.json]
{"compilerOptions":{"baseUrl":"../target/src/"}}

//// [/user/username/projects/myproject/indirect3/main.ts]
import { foo } from 'main';
foo;
export function bar() {}

//// [/user/username/projects/myproject/tsconfig-indirect1.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"files":["./indirect1/main.ts"],"references":[{"path":"./tsconfig-src.json"}]}

//// [/user/username/projects/myproject/indirect1/main.ts]
import { foo } from 'main';
foo;
export function bar() {}

//// [/user/username/projects/myproject/tsconfig-indirect2.json]
{"compilerOptions":{"composite":true,"outDir":"./target/","baseUrl":"./src/"},"files":["./indirect2/main.ts"],"references":[{"path":"./tsconfig-src.json"}]}

//// [/user/username/projects/myproject/indirect2/main.ts]
import { foo } from 'main';
foo;
export function bar() {}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/src/helpers/functions.ts: *new*
  {}
/user/username/projects/myproject/tsconfig-indirect1.json: *new*
  {}
/user/username/projects/myproject/tsconfig-indirect2.json: *new*
  {}
/user/username/projects/myproject/tsconfig-src.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/main.ts"
        ]
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/src/main.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "semanticDiag",
     "body": {
      "file": "/user/username/projects/myproject/src/main.ts",
      "diagnostics": []
     }
    }
After running Immedidate callback:: count: 1
2: suggestionCheck

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "suggestionDiag",
     "body": {
      "file": "/user/username/projects/myproject/src/main.ts",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 1
     }
    }
After running Immedidate callback:: count: 0

Info seq  [hh:mm:ss:mss] Search path: /dummy
Info seq  [hh:mm:ss:mss] For info: /dummy/dummy.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /dummy
Info seq  [hh:mm:ss:mss] For info: /dummy/dummy.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/src/main.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json",
      "reason": "Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for /user/username/projects/myproject/src/main.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/helpers/functions.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/user/username/projects/myproject/src/main.ts",
      "configFile": "/user/username/projects/myproject/tsconfig-src.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /dummy
Info seq  [hh:mm:ss:mss] For info: /dummy/dummy.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] reload projects.
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig-src.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Reloading configured project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json",
      "reason": "User requested reload projects"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/user/username/projects/myproject/tsconfig.json",
      "configFile": "/user/username/projects/myproject/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Reloading configured project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json",
      "reason": "User requested reload projects"
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/user/username/projects/myproject/tsconfig-src.json",
      "configFile": "/user/username/projects/myproject/tsconfig-src.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /dummy
Info seq  [hh:mm:ss:mss] For info: /dummy/dummy.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (0) NoProgram

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Before request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500} *new*
/user/username/projects/node_modules/@types:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {} *new*
/user/username/projects/myproject/tsconfig-indirect1.json:
  {} *new*
/user/username/projects/myproject/tsconfig-indirect2.json:
  {} *new*
/user/username/projects/myproject/tsconfig-src.json:
  {} *new*
/user/username/projects/myproject/tsconfig.json:
  {} *new*

FsWatches *deleted*::
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {} *new*

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/src:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/src/main.ts",
        "line": 2,
        "offset": 10
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/main.ts position 50 in project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect1.json",
      "reason": "Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/indirect1/main.ts Text-1 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect1.json"
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
       "projectId": "9ccc3aed1af08832ccb25ea453f7b771199f56af238b53cc428549dbd2d59246",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 3,
        "tsSize": 134,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "composite": true,
        "outDir": "",
        "baseUrl": ""
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
       "configFileName": "other",
       "projectType": "configured",
       "languageServiceEnabled": true,
       "version": "FakeVersion"
      }
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect2.json",
      "reason": "Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts SVC-2-0 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/indirect2/main.ts Text-1 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect2.json"
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
       "projectId": "d9a040bddd6b85b85abd507a988a4b809b1515b5e61257ea3f8263da59589565",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 3,
        "tsSize": 134,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "composite": true,
        "outDir": "",
        "baseUrl": ""
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
       "configFileName": "other",
       "projectType": "configured",
       "languageServiceEnabled": true,
       "version": "FakeVersion"
      }
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/helpers/functions.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 41
            },
            "lineText": "import { foo } from 'helpers/functions';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 2,
              "offset": 10
            },
            "end": {
              "line": 2,
              "offset": 13
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 16
            },
            "lineText": "export { foo };",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/myproject/src/helpers/functions.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 17
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "export const foo = 1;",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect1/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect1/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect2/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect2/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nexport foo"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/indirect1/main.ts: *new*
  {}
/user/username/projects/myproject/indirect2/main.ts: *new*
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts: *new*
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map: *new*
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/indirect3
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/indirect3/main.ts :: Config file name: /user/username/projects/myproject/indirect3/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/indirect3/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/indirect3/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/indirect3/main.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/indirect3/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect3/main.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/target/src",
  "configFilePath": "/user/username/projects/myproject/indirect3/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3 1 undefined Config: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect3/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/indirect3/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/indirect3/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/target/src/helpers/functions.d.ts Text-1 "export declare const foo = 1;\n//# sourceMappingURL=functions.d.ts.map"
	/user/username/projects/myproject/target/src/main.d.ts Text-1 "import { foo } from 'helpers/functions';\nexport { foo };\n//# sourceMappingURL=main.d.ts.map"
	/user/username/projects/myproject/indirect3/main.ts SVC-1-0 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../target/src/helpers/functions.d.ts
	  Imported via 'helpers/functions' from file '../target/src/main.d.ts'
	../target/src/main.d.ts
	  Imported via 'main' from file 'main.ts'
	main.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/indirect3/tsconfig.json"
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
       "projectId": "5b0817f69b6871821661b976aa73f4f2533b37c5f4b920541094c2d727d0dc39",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 1,
        "tsSize": 57,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 3,
        "dtsSize": 494,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "baseUrl": ""
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
      "triggerFile": "/user/username/projects/myproject/indirect3/main.ts",
      "configFile": "/user/username/projects/myproject/indirect3/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect1/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/helpers/functions.ts
	/user/username/projects/myproject/src/main.ts
	/user/username/projects/myproject/indirect2/main.ts


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts
	/dummy/dummy.ts


	../a/lib/lib.d.ts
	  Default library for target 'es5'
	dummy.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /dummy/dummy.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/indirect3/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/indirect3/main.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/indirect3/tsconfig.json
Before request

PolledWatches::
/user/username/projects/myproject/indirect3/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/indirect3/tsconfig.json: *new*
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}
/user/username/projects/myproject/target/src/main.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/myproject/indirect1/main.ts:
  {}
/user/username/projects/myproject/indirect2/main.ts:
  {}
/user/username/projects/myproject/tsconfig-indirect1.json:
  {}
/user/username/projects/myproject/tsconfig-indirect2.json:
  {}
/user/username/projects/myproject/tsconfig-src.json:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3: *new*
  {}
/user/username/projects/myproject/target: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/src:
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/indirect3/main.ts",
        "line": 1,
        "offset": 10
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/indirect3/main.ts position 9 in project /user/username/projects/myproject/indirect3/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/target/src/main.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json",
      "reason": "Creating project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect1.json",
   "originalPath": "./tsconfig-indirect1.json"
  },
  {
   "path": "/user/username/projects/myproject/tsconfig-indirect2.json",
   "originalPath": "./tsconfig-indirect2.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect1.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect1/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect1.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect1.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-src.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/main.ts",
  "/user/username/projects/myproject/src/helpers/functions.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-src.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-src.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/tsconfig-src.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig-indirect2.json : {
 "rootNames": [
  "/user/username/projects/myproject/indirect2/main.ts"
 ],
 "options": {
  "composite": true,
  "outDir": "/user/username/projects/myproject/target",
  "baseUrl": "/user/username/projects/myproject/src",
  "configFilePath": "/user/username/projects/myproject/tsconfig-indirect2.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/tsconfig-src.json",
   "originalPath": "./tsconfig-src.json"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig-indirect2.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json",
      "reason": "Creating project referenced in solution /user/username/projects/myproject/tsconfig.json to find possible configured project for original file: /user/username/projects/myproject/src/main.ts for location: /user/username/projects/myproject/target/src/main.d.ts"
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-src.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-src.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-src.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts Text-3 "import { foo } from 'helpers/functions';\nexport { foo };"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'
	src/main.ts
	  Matched by include pattern './src/**/*' in 'tsconfig-src.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/main.ts position 9 in project /user/username/projects/myproject/tsconfig-src.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect1.json",
      "reason": "Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect1/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect1.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect1.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect1.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts Text-3 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/indirect1/main.ts Text-2 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect1/main.ts'
	indirect1/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect1.json"
     }
    }
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect2.json",
      "reason": "Creating project referenced by : /user/username/projects/myproject/tsconfig.json as it references project /user/username/projects/myproject/tsconfig-src.json"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/indirect2/main.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig-indirect2.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig-indirect2.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig-indirect2.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/helpers/functions.ts Text-2 "export const foo = 1;"
	/user/username/projects/myproject/src/main.ts Text-3 "import { foo } from 'helpers/functions';\nexport { foo };"
	/user/username/projects/myproject/indirect2/main.ts Text-2 "import { foo } from 'main';\nfoo;\nexport function bar() {}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/helpers/functions.ts
	  Imported via 'helpers/functions' from file 'src/main.ts'
	src/main.ts
	  Imported via 'main' from file 'indirect2/main.ts'
	indirect2/main.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig-indirect2.json"
     }
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect1.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /user/username/projects/myproject/src/helpers/functions.ts position 13 in project /user/username/projects/myproject/tsconfig-indirect2.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src/helpers
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/helpers/functions.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/src/main.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/indirect3/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": true
          },
          {
            "file": "/user/username/projects/myproject/indirect3/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 41
            },
            "lineText": "import { foo } from 'helpers/functions';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/main.ts",
            "start": {
              "line": 2,
              "offset": 10
            },
            "end": {
              "line": 2,
              "offset": 13
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 16
            },
            "lineText": "export { foo };",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/src/helpers/functions.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 17
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "export const foo = 1;",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect1/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect1/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect2/main.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 13
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 28
            },
            "lineText": "import { foo } from 'main';",
            "isWriteAccess": true,
            "isDefinition": false
          },
          {
            "file": "/user/username/projects/myproject/indirect2/main.ts",
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 4
            },
            "lineText": "foo;",
            "isWriteAccess": false,
            "isDefinition": false
          }
        ],
        "symbolName": "foo",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) const foo: 1\nimport foo"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/projects/myproject/indirect3/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/indirect1/main.ts: *new*
  {}
/user/username/projects/myproject/indirect2/main.ts: *new*
  {}
/user/username/projects/myproject/indirect3/tsconfig.json:
  {}
/user/username/projects/myproject/src/helpers/functions.ts:
  {}
/user/username/projects/myproject/src/main.ts: *new*
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts:
  {}
/user/username/projects/myproject/target/src/helpers/functions.d.ts.map:
  {}
/user/username/projects/myproject/target/src/main.d.ts:
  {}
/user/username/projects/myproject/target/src/main.d.ts.map: *new*
  {}
/user/username/projects/myproject/tsconfig-indirect1.json: *new*
  {}
/user/username/projects/myproject/tsconfig-indirect2.json: *new*
  {}
/user/username/projects/myproject/tsconfig-src.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/indirect3:
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/target:
  {}
