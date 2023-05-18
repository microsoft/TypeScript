currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
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

//// [/users/username/projects/myproject/src/a.ts]
import * as myModule from "@custom/plugin";
function foo() {
  // hello
}

//// [/users/username/projects/myproject/tsconfig.json]
{"include":["src"]}

//// [/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts]
import './proposed';
declare module '@custom/plugin' {
    export const version: string;
}

//// [/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts]
declare module '@custom/plugin' {
    export const bar = 10;
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/users/username/projects/myproject/src/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /users/username/projects/myproject/src
Info seq  [hh:mm:ss:mss] For info: /users/username/projects/myproject/src/a.ts :: Config file name: /users/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /users/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /users/username/projects/myproject/tsconfig.json 2000 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/users/username/projects/myproject/tsconfig.json",
      "reason": "Creating possible configured project for /users/username/projects/myproject/src/a.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /users/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/users/username/projects/myproject/src/a.ts"
 ],
 "options": {
  "configFilePath": "/users/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Config: /users/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/src 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/myproject/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /users/username/projects/node_modules/@types 1 undefined Project: /users/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts Text-1 "declare module '@custom/plugin' {\n    export const bar = 10;\n}"
	/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts Text-1 "import './proposed';\ndeclare module '@custom/plugin' {\n    export const version: string;\n}"
	/users/username/projects/myproject/src/a.ts SVC-1-0 "import * as myModule from \"@custom/plugin\";\nfunction foo() {\n  // hello\n}"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/@custom/plugin/proposed.d.ts
	  Imported via './proposed' from file 'node_modules/@custom/plugin/index.d.ts'
	node_modules/@custom/plugin/index.d.ts
	  Imported via "@custom/plugin" from file 'src/a.ts'
	src/a.ts
	  Matched by include pattern 'src' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/users/username/projects/myproject/tsconfig.json"
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
       "projectId": "49814c247d0e4666719ac54e31c3f19091be4020c5ac046c86474826dc7e4ede",
       "fileStats": {
        "js": 0,
        "jsSize": 0,
        "jsx": 0,
        "jsxSize": 0,
        "ts": 1,
        "tsSize": 73,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 3,
        "dtsSize": 486,
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
      "triggerFile": "/users/username/projects/myproject/src/a.ts",
      "configFile": "/users/username/projects/myproject/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /users/username/projects/myproject/src/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /users/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/users/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/users/username/projects/myproject/node_modules: *new*
  {}
/users/username/projects/myproject/src: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/src/a.ts"
        ]
      },
      "seq": 2,
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
      "file": "/users/username/projects/myproject/src/a.ts",
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
      "file": "/users/username/projects/myproject/src/a.ts",
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
      "file": "/users/username/projects/myproject/src/a.ts",
      "diagnostics": [
       {
        "start": {
         "line": 1,
         "offset": 1
        },
        "end": {
         "line": 1,
         "offset": 44
        },
        "text": "'myModule' is declared but its value is never read.",
        "code": 6133,
        "category": "suggestion",
        "reportsUnnecessary": true
       },
       {
        "start": {
         "line": 2,
         "offset": 10
        },
        "end": {
         "line": 2,
         "offset": 13
        },
        "text": "'foo' is declared but its value is never read.",
        "code": 6133,
        "category": "suggestion",
        "reportsUnnecessary": true
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 2
     }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "change",
      "arguments": {
        "file": "/users/username/projects/myproject/src/a.ts",
        "line": 3,
        "offset": 8,
        "endLine": 3,
        "endOffset": 8,
        "insertString": "o"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/users/username/projects/myproject/src/a.ts"
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /users/username/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/users/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/users/username/projects/myproject/node_modules/@custom/plugin/proposed.d.ts Text-1 "declare module '@custom/plugin' {\n    export const bar = 10;\n}"
	/users/username/projects/myproject/node_modules/@custom/plugin/index.d.ts Text-1 "import './proposed';\ndeclare module '@custom/plugin' {\n    export const version: string;\n}"
	/users/username/projects/myproject/src/a.ts SVC-1-1 "import * as myModule from \"@custom/plugin\";\nfunction foo() {\n  // heollo\n}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/users/username/projects/myproject/src/a.ts",
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
      "file": "/users/username/projects/myproject/src/a.ts",
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
      "file": "/users/username/projects/myproject/src/a.ts",
      "diagnostics": [
       {
        "start": {
         "line": 1,
         "offset": 1
        },
        "end": {
         "line": 1,
         "offset": 44
        },
        "text": "'myModule' is declared but its value is never read.",
        "code": 6133,
        "category": "suggestion",
        "reportsUnnecessary": true
       },
       {
        "start": {
         "line": 2,
         "offset": 10
        },
        "end": {
         "line": 2,
         "offset": 13
        },
        "text": "'foo' is declared but its value is never read.",
        "code": 6133,
        "category": "suggestion",
        "reportsUnnecessary": true
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "requestCompleted",
     "body": {
      "request_seq": 4
     }
    }
After running Immedidate callback:: count: 0
