currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/a.ts]
export class a { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configure",
      "arguments": {
        "watchOptions": {
          "watchFactory": "myplugin"
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Host watch options changed to {"watchFactory":"myplugin"}, it will be take effect for next watches.
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 1,
     "success": true
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] For info: /user/username/projects/myproject/a.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":"myplugin"} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Enabling watchFactory 'myplugin' from candidate paths: /a/pluginprobe1,/a/pluginprobe2,/a/lib/tsc.js/../../..
Info seq  [hh:mm:ss:mss] Loading myplugin from /a/pluginprobe1 (resolved to /a/pluginprobe1/node_modules)
CustomRequire:: Resolving myplugin from /a/pluginprobe1/node_modules
Module myplugin:: create with config: {"name":"myplugin"} and options: {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Plugin validation succeeded
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchFile",
     "body": {
      "fileName": "/user/username/projects/myproject/tsconfig.json",
      "pollingInterval": 2000,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchFile: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/user/username/projects/myproject/tsconfig.json",
      "reason": "Creating possible configured project for /user/username/projects/myproject/a.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":"myplugin"} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchDirectory",
     "body": {
      "fileName": "/user/username/projects/myproject",
      "recursive": true,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchDirectory: /user/username/projects/myproject true {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":"myplugin"} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":"myplugin"} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchFile",
     "body": {
      "fileName": "/user/username/projects/myproject/b.ts",
      "pollingInterval": 500,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchFile: /user/username/projects/myproject/b.ts 500 {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"watchFactory":"myplugin"} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchFile",
     "body": {
      "fileName": "/a/lib/lib.d.ts",
      "pollingInterval": 500,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchFile: /a/lib/lib.d.ts 500 {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFactory":"myplugin"} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchDirectory",
     "body": {
      "fileName": "/user/username/projects/myproject/node_modules/@types",
      "recursive": true,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchDirectory: /user/username/projects/myproject/node_modules/@types true {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFactory":"myplugin"} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFactory":"myplugin"} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchDirectory",
     "body": {
      "fileName": "/user/username/projects/node_modules/@types",
      "recursive": true,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchDirectory: /user/username/projects/node_modules/@types true {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"watchFactory":"myplugin"} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'

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
        "ts": 2,
        "tsSize": 124,
        "tsx": 0,
        "tsxSize": 0,
        "dts": 1,
        "dtsSize": 334,
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
      "triggerFile": "/user/username/projects/myproject/a.ts",
      "configFile": "/user/username/projects/myproject/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Plugin WatchedFiles::
/user/username/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000,"options":{"watchFactory":"myplugin"}}
/user/username/projects/myproject/b.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":"myplugin"}}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":"myplugin"}}

Plugin WatchedDirectories:Recursive::
/user/username/projects/myproject: *new*
  {"options":{"watchFactory":"myplugin"}}
/user/username/projects/myproject/node_modules/@types: *new*
  {"options":{"watchFactory":"myplugin"}}
/user/username/projects/node_modules/@types: *new*
  {"options":{"watchFactory":"myplugin"}}

Add a file
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Invoke plugin watches
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "onDirectoryChange",
      "arguments": {
        "dir": "/user/username/projects/myproject",
        "file": "/user/username/projects/myproject/c.ts",
        "recursive": true
      },
      "seq": 3,
      "type": "request"
    }
CustomRequest:: {"command":"onDirectoryChange","arguments":{"dir":"/user/username/projects/myproject","file":"/user/username/projects/myproject/c.ts","recursive":true},"seq":3,"type":"request"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":"myplugin"} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":"myplugin"} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] response:
    {
      "response": "completedOnDirectoryChange"
    }
After request

Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c.ts 500 {"watchFactory":"myplugin"} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "watchFile",
     "body": {
      "fileName": "/user/username/projects/myproject/c.ts",
      "pollingInterval": 500,
      "options": {
       "watchFactory": "myplugin"
      }
     }
    }
Custom watchFile: /user/username/projects/myproject/c.ts 500 {"watchFactory":"myplugin"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background, updating diagnostics for /user/username/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectsUpdatedInBackground",
     "body": {
      "openFiles": [
       "/user/username/projects/myproject/a.ts"
      ]
     }
    }
After running Timeout callback:: count: 1
3: checkOne

Plugin WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000,"options":{"watchFactory":"myplugin"}}
/user/username/projects/myproject/b.ts:
  {"pollingInterval":500,"options":{"watchFactory":"myplugin"}}
/a/lib/lib.d.ts:
  {"pollingInterval":500,"options":{"watchFactory":"myplugin"}}
/user/username/projects/myproject/c.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":"myplugin"}}

Plugin WatchedDirectories:Recursive::
/user/username/projects/myproject:
  {"options":{"watchFactory":"myplugin"}}
/user/username/projects/myproject/node_modules/@types:
  {"options":{"watchFactory":"myplugin"}}
/user/username/projects/node_modules/@types:
  {"options":{"watchFactory":"myplugin"}}

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/a.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0

Change file
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/b.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Invoke plugin watches
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "onFileChange",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts",
        "fileName": "/user/username/projects/myproject/b.ts",
        "eventKind": 1
      },
      "seq": 4,
      "type": "request"
    }
CustomRequest:: {"command":"onFileChange","arguments":{"file":"/user/username/projects/myproject/b.ts","fileName":"/user/username/projects/myproject/b.ts","eventKind":1},"seq":4,"type":"request"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":"myplugin"} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":"myplugin"} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "response": "completedOnFileChange"
    }
After request

Before running Timeout callback:: count: 2
4: /user/username/projects/myproject/tsconfig.json
5: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background, updating diagnostics for /user/username/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectsUpdatedInBackground",
     "body": {
      "openFiles": [
       "/user/username/projects/myproject/a.ts"
      ]
     }
    }
After running Timeout callback:: count: 1
6: checkOne

Before running Timeout callback:: count: 1
6: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "syntaxDiag",
     "body": {
      "file": "/user/username/projects/myproject/a.ts",
      "diagnostics": []
     }
    }
After running Timeout callback:: count: 0
