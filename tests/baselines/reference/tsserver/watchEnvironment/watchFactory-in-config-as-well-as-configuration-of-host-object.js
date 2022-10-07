currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/a.ts]
export class a { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/tsconfig.json]
{"watchOptions":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}

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
          "watchFactory": {
            "name": "myplugin2",
            "myconfig": "somethingelse"
          }
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Host watch options changed to {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}, it will be take effect for next watches.
Info seq  [hh:mm:ss:mss] response:
    {"seq":0,"type":"response","command":"configure","request_seq":1,"success":true}
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
CustomRequire:: Resolving myplugin2 from /a/pluginprobe1/node_modules
Require:: Module myplugin2 created with config: {"name":"myplugin2","myconfig":"somethingelse"} and options: {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}
Custom myplugin2watchFile: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 },
 "watchOptions": {
  "watchFactory": {
   "name": "myplugin",
   "myconfig": "somethingelse"
  }
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
CustomRequire:: Resolving myplugin from /a/pluginprobe1/node_modules
Require:: Module myplugin created with config: {"name":"myplugin","myconfig":"somethingelse"} and options: {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}
Custom watchFile: /user/username/projects/myproject/tsconfig.json 2000 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Custom watchDirectory: /user/username/projects/myproject true {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} WatchType: Closed Script info
Custom myplugin2watchFile: /user/username/projects/myproject/b.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} WatchType: Closed Script info
Custom myplugin2watchFile: /a/lib/lib.d.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Custom watchDirectory: /user/username/projects/myproject/node_modules/@types true {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
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
  {"pollingInterval":2000,"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}

Plugin WatchedDirectories:Recursive::
/user/username/projects/myproject: *new*
  {"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}
/user/username/projects/myproject/node_modules/@types: *new*
  {"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}

myplugin2Plugin WatchedFiles::
/user/username/projects/myproject/b.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}}
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}}

Add a file
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Invoke plugin watches
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 {"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}} Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} WatchType: Closed Script info
Custom myplugin2watchFile: /user/username/projects/myproject/c.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}
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
After running Timeout callback:: count: 0

Plugin WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000,"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}

Plugin WatchedDirectories:Recursive::
/user/username/projects/myproject:
  {"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}
/user/username/projects/myproject/node_modules/@types:
  {"options":{"watchFactory":{"name":"myplugin","myconfig":"somethingelse"}}}

myplugin2Plugin WatchedFiles::
/user/username/projects/myproject/b.ts:
  {"pollingInterval":500,"options":{"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}}
/a/lib/lib.d.ts:
  {"pollingInterval":500,"options":{"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}}
/user/username/projects/myproject/c.ts: *new*
  {"pollingInterval":500,"options":{"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}}}

Change file
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/b.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Invoke plugin watches
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 {"watchFactory":{"name":"myplugin2","myconfig":"somethingelse"}} WatchType: Closed Script info
Before running Timeout callback:: count: 2
3: /user/username/projects/myproject/tsconfig.json
4: *ensureProjectForOpenFiles*

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
After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configurePlugin",
      "arguments": {
        "pluginName": "myplugin",
        "configuration": {
          "extraData": "myData"
        }
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {"seq":0,"type":"response","command":"configurePlugin","request_seq":3,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configurePlugin",
      "arguments": {
        "pluginName": "myplugin2",
        "configuration": {
          "extraData": "myData"
        }
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {"seq":0,"type":"response","command":"configurePlugin","request_seq":4,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "configurePlugin",
      "arguments": {
        "pluginName": "randomplugin",
        "configuration": {
          "extraData": "myData"
        }
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {"seq":0,"type":"response","command":"configurePlugin","request_seq":5,"success":true,"performanceData":{"updateGraphDurationMs":*}}
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request
