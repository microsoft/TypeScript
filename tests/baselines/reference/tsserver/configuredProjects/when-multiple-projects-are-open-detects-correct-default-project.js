currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/bar/tsconfig.json]
{"include":["index.ts"],"compilerOptions":{"lib":["dom","es2017"]}}

//// [/user/username/projects/myproject/bar/index.ts]

export function bar() {
  console.log("hello world");
}

//// [/user/username/projects/myproject/foo/tsconfig.json]
{"include":["index.ts"],"compilerOptions":{"lib":["es2017"]}}

//// [/user/username/projects/myproject/foo/index.ts]

import { bar } from "bar";
bar();

//// [/user/username/projects/myproject/foo/node_modules/bar] symlink(/user/username/projects/myproject/bar)
//// [/a/lib/lib.es2017.d.ts]
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

//// [/a/lib/lib.dom.d.ts]

declare var console: {
    log(...args: any[]): void;
};


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/foo/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/foo
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/foo/index.ts :: Config file name: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Config file
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
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/foo/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/foo/index.ts"
 ],
 "options": {
  "lib": [
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/foo/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2017.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/foo/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/foo/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.es2017.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/bar/index.ts Text-1 "\nexport function bar() {\n  console.log(\"hello world\");\n}"
	/user/username/projects/myproject/foo/index.ts SVC-1-0 "\nimport { bar } from \"bar\";\nbar();"


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../bar/index.ts
	  Imported via "bar" from file 'index.ts'
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
        "ts": 2,
        "tsSize": 90,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "lib": [
         "es2017"
        ]
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/foo/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.es2017.d.ts: *new*
  {}
/user/username/projects/myproject/bar/index.ts: *new*
  {}
/user/username/projects/myproject/foo/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/bar/index.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/bar/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject/bar
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/bar/index.ts :: Config file name: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Config file
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
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/bar/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/bar/index.ts"
 ],
 "options": {
  "lib": [
   "lib.dom.d.ts",
   "lib.es2017.d.ts"
  ],
  "configFilePath": "/user/username/projects/myproject/bar/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.dom.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bar/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/bar/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/bar/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.es2017.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/lib/lib.dom.d.ts Text-1 "\ndeclare var console: {\n    log(...args: any[]): void;\n};"
	/user/username/projects/myproject/bar/index.ts Text-1 "\nexport function bar() {\n  console.log(\"hello world\");\n}"


	../../../../../a/lib/lib.es2017.d.ts
	  Library 'lib.es2017.d.ts' specified in compilerOptions
	../../../../../a/lib/lib.dom.d.ts
	  Library 'lib.dom.d.ts' specified in compilerOptions
	index.ts
	  Matched by include pattern 'index.ts' in 'tsconfig.json'

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
        "tsSize": 56,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 2,
        "dtsSize": 391,
        "deferred": 0,
        "deferredSize": 0
       },
       "compilerOptions": {
        "lib": [
         "dom",
         "es2017"
        ]
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
      "triggerFile": "/user/username/projects/myproject/bar/index.ts",
      "configFile": "/user/username/projects/myproject/bar/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/bar/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/foo/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foo/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/bar/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/foo/tsconfig.json,/user/username/projects/myproject/bar/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/user/username/projects/myproject/bar/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/bar/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/foo/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.dom.d.ts: *new*
  {}
/a/lib/lib.es2017.d.ts:
  {}
/user/username/projects/myproject/bar/tsconfig.json: *new*
  {}
/user/username/projects/myproject/foo/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/bar/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/foo/node_modules:
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/bar/index.ts",
          "/user/username/projects/myproject/foo/index.ts"
        ]
      },
      "seq": 3,
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
      "file": "/user/username/projects/myproject/bar/index.ts",
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
      "file": "/user/username/projects/myproject/bar/index.ts",
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
      "file": "/user/username/projects/myproject/bar/index.ts",
      "diagnostics": []
     }
    }
After running Immedidate callback:: count: 0

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/foo/index.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "semanticDiag",
     "body": {
      "file": "/user/username/projects/myproject/foo/index.ts",
      "diagnostics": []
     }
    }
After running Immedidate callback:: count: 1
4: suggestionCheck

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "suggestionDiag",
     "body": {
      "file": "/user/username/projects/myproject/foo/index.ts",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 3
     }
    }
After running Immedidate callback:: count: 0
