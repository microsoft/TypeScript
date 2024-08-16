currentDirectory:: c:\ useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [c:/projects/myproject/tsconfig.json]
{}

//// [c:/projects/myproject/a.ts]
export class a { prop = "hello"; foo() { return this.prop; } }

//// [c:/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }

//// [c:/projects/myproject/m.ts]
import { x } from "something"

//// [c:/projects/myproject/node_modules/something/index.d.ts]
export const x = 10;

//// [c:/a/lib/lib.d.ts]
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
      "command": "open",
      "arguments": {
        "file": "c:\\projects\\myproject\\a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/projects/myproject/a.ts ProjectRootPath: undefined:: Result: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/tsconfig.json 2000 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 1,
        "path": "c:/projects/myproject/tsconfig.json"
      }
    }
Custom watchFile:: Added:: {"id":1,"path":"c:/projects/myproject/tsconfig.json"}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "c:/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for c:/projects/myproject/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: c:/projects/myproject/tsconfig.json : {
 "rootNames": [
  "c:/projects/myproject/a.ts",
  "c:/projects/myproject/b.ts",
  "c:/projects/myproject/m.ts"
 ],
 "options": {
  "configFilePath": "c:/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 2,
        "path": "c:/projects/myproject",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 3,
        "path": "c:/projects/myproject/b.ts"
      }
    }
Custom watchFile:: Added:: {"id":3,"path":"c:/projects/myproject/b.ts"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/m.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 4,
        "path": "c:/projects/myproject/m.ts"
      }
    }
Custom watchFile:: Added:: {"id":4,"path":"c:/projects/myproject/m.ts"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 5,
        "path": "c:/projects/myproject/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory:: Added:: {"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 6,
        "path": "c:/a/lib/lib.d.ts"
      }
    }
Custom watchFile:: Added:: {"id":6,"path":"c:/a/lib/lib.d.ts"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules/something/package.json 2000 undefined Project: c:/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 7,
        "path": "c:/projects/myproject/node_modules/something/package.json"
      }
    }
Custom watchFile:: Added:: {"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules/package.json 2000 undefined Project: c:/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 8,
        "path": "c:/projects/myproject/node_modules/package.json"
      }
    }
Custom watchFile:: Added:: {"id":8,"path":"c:/projects/myproject/node_modules/package.json"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/package.json 2000 undefined Project: c:/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 9,
        "path": "c:/projects/myproject/package.json"
      }
    }
Custom watchFile:: Added:: {"id":9,"path":"c:/projects/myproject/package.json"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/package.json 2000 undefined Project: c:/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 10,
        "path": "c:/projects/package.json"
      }
    }
Custom watchFile:: Added:: {"id":10,"path":"c:/projects/package.json"}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules/@types 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 11,
        "path": "c:/projects/myproject/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/projects/myproject/node_modules/@types 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/projects/node_modules/@types 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createDirectoryWatcher",
      "body": {
        "id": 12,
        "path": "c:/projects/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory:: Added:: {"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/projects/node_modules/@types 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	node_modules/something/index.d.ts
	  Imported via "something" from file 'm.ts'
	m.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "c:/projects/myproject/tsconfig.json"
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
          "projectId": "97f177d0a126eace4239f1be3ea802bded2784e559d112a10ed01c6617b1a28f",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 153,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 2,
            "dtsSize": 354,
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
        "triggerFile": "c:/projects/myproject/a.ts",
        "configFile": "c:/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
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
c:/a/lib/lib.d.ts: *new*
  {"event":{"id":6,"path":"c:/a/lib/lib.d.ts"}}
c:/projects/myproject/b.ts: *new*
  {"event":{"id":3,"path":"c:/projects/myproject/b.ts"}}
c:/projects/myproject/m.ts: *new*
  {"event":{"id":4,"path":"c:/projects/myproject/m.ts"}}
c:/projects/myproject/node_modules/package.json: *new*
  {"event":{"id":8,"path":"c:/projects/myproject/node_modules/package.json"}}
c:/projects/myproject/node_modules/something/package.json: *new*
  {"event":{"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}}
c:/projects/myproject/package.json: *new*
  {"event":{"id":9,"path":"c:/projects/myproject/package.json"}}
c:/projects/myproject/tsconfig.json: *new*
  {"event":{"id":1,"path":"c:/projects/myproject/tsconfig.json"}}
c:/projects/package.json: *new*
  {"event":{"id":10,"path":"c:/projects/package.json"}}

FsWatchesRecursive::
c:/projects/myproject: *new*
  {"event":{"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}}
c:/projects/myproject/node_modules: *new*
  {"event":{"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}}
c:/projects/myproject/node_modules/@types: *new*
  {"event":{"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
c:/projects/node_modules/@types: *new*
  {"event":{"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Projects::
c:/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
c:/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\c.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\c.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 2,
        "created": [
          "c:\\projects\\myproject\\c.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with c:/projects/myproject/c.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with c:/projects/myproject/c.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
After request

Timeout callback:: count: 2
1: c:/projects/myproject/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 2
1: c:/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 13,
        "path": "c:/projects/myproject/c.ts"
      }
    }
Custom watchFile:: Added:: {"id":13,"path":"c:/projects/myproject/c.ts"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	c:/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	node_modules/something/index.d.ts
	  Imported via "something" from file 'm.ts'
	m.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background c:/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "c:/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
c:/a/lib/lib.d.ts:
  {"event":{"id":6,"path":"c:/a/lib/lib.d.ts"}}
c:/projects/myproject/b.ts:
  {"event":{"id":3,"path":"c:/projects/myproject/b.ts"}}
c:/projects/myproject/c.ts: *new*
  {"event":{"id":13,"path":"c:/projects/myproject/c.ts"}}
c:/projects/myproject/m.ts:
  {"event":{"id":4,"path":"c:/projects/myproject/m.ts"}}
c:/projects/myproject/node_modules/package.json:
  {"event":{"id":8,"path":"c:/projects/myproject/node_modules/package.json"}}
c:/projects/myproject/node_modules/something/package.json:
  {"event":{"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}}
c:/projects/myproject/package.json:
  {"event":{"id":9,"path":"c:/projects/myproject/package.json"}}
c:/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"c:/projects/myproject/tsconfig.json"}}
c:/projects/package.json:
  {"event":{"id":10,"path":"c:/projects/package.json"}}

FsWatchesRecursive::
c:/projects/myproject:
  {"event":{"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}}
c:/projects/myproject/node_modules:
  {"event":{"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}}
c:/projects/myproject/node_modules/@types:
  {"event":{"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
c:/projects/node_modules/@types:
  {"event":{"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Custom watchFile:: Triggered:: {"id":3,"path":"c:/projects/myproject/b.ts"}:: c:\projects\myproject\b.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\b.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/b.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 3,
        "updated": [
          "c:\\projects\\myproject\\b.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with c:/projects/myproject/b.ts 1:: WatchInfo: c:/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with c:/projects/myproject/b.ts 1:: WatchInfo: c:/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
After request

Timeout callback:: count: 2
3: c:/projects/myproject/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
3: c:/projects/myproject/tsconfig.json
4: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	c:/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background c:/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "c:/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:\\projects\\myproject\\b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: c:/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "closeFileWatcher",
      "body": {
        "id": 3
      }
    }
Custom watchFile:: Close:: {"id":3,"path":"c:/projects/myproject/b.ts"}
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/projects/myproject/b.ts ProjectRootPath: undefined:: Result: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
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
c:/a/lib/lib.d.ts:
  {"event":{"id":6,"path":"c:/a/lib/lib.d.ts"}}
c:/projects/myproject/c.ts:
  {"event":{"id":13,"path":"c:/projects/myproject/c.ts"}}
c:/projects/myproject/m.ts:
  {"event":{"id":4,"path":"c:/projects/myproject/m.ts"}}
c:/projects/myproject/node_modules/package.json:
  {"event":{"id":8,"path":"c:/projects/myproject/node_modules/package.json"}}
c:/projects/myproject/node_modules/something/package.json:
  {"event":{"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}}
c:/projects/myproject/package.json:
  {"event":{"id":9,"path":"c:/projects/myproject/package.json"}}
c:/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"c:/projects/myproject/tsconfig.json"}}
c:/projects/package.json:
  {"event":{"id":10,"path":"c:/projects/package.json"}}

PolledWatches *deleted*::
c:/projects/myproject/b.ts:
  {"event":{"id":3,"path":"c:/projects/myproject/b.ts"}}

FsWatchesRecursive::
c:/projects/myproject:
  {"event":{"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}}
c:/projects/myproject/node_modules:
  {"event":{"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}}
c:/projects/myproject/node_modules/@types:
  {"event":{"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
c:/projects/node_modules/@types:
  {"event":{"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts (Open) *changed*
    open: true *changed*
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "c:\\projects\\myproject\\b.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 14,
        "path": "c:/projects/myproject/b.ts"
      }
    }
Custom watchFile:: Added:: {"id":14,"path":"c:/projects/myproject/b.ts"}
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 5,
      "success": true
    }
After request

PolledWatches::
c:/a/lib/lib.d.ts:
  {"event":{"id":6,"path":"c:/a/lib/lib.d.ts"}}
c:/projects/myproject/b.ts: *new*
  {"event":{"id":14,"path":"c:/projects/myproject/b.ts"}}
c:/projects/myproject/c.ts:
  {"event":{"id":13,"path":"c:/projects/myproject/c.ts"}}
c:/projects/myproject/m.ts:
  {"event":{"id":4,"path":"c:/projects/myproject/m.ts"}}
c:/projects/myproject/node_modules/package.json:
  {"event":{"id":8,"path":"c:/projects/myproject/node_modules/package.json"}}
c:/projects/myproject/node_modules/something/package.json:
  {"event":{"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}}
c:/projects/myproject/package.json:
  {"event":{"id":9,"path":"c:/projects/myproject/package.json"}}
c:/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"c:/projects/myproject/tsconfig.json"}}
c:/projects/package.json:
  {"event":{"id":10,"path":"c:/projects/package.json"}}

FsWatchesRecursive::
c:/projects/myproject:
  {"event":{"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}}
c:/projects/myproject/node_modules:
  {"event":{"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}}
c:/projects/myproject/node_modules/@types:
  {"event":{"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
c:/projects/node_modules/@types:
  {"event":{"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts *changed*
    open: false *changed*
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Custom watchFile:: Triggered:: {"id":13,"path":"c:/projects/myproject/c.ts"}:: c:\projects\myproject\c.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\c.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }export const y = 20;


After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 13,
        "updated": [
          "c:\\projects\\myproject\\c.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with c:/projects/myproject/c.ts 1:: WatchInfo: c:/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with c:/projects/myproject/c.ts 1:: WatchInfo: c:/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
After request

Timeout callback:: count: 2
5: c:/projects/myproject/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
5: c:/projects/myproject/tsconfig.json
6: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	c:/projects/myproject/c.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background c:/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "c:/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\d.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\d.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/d.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Custom watchFile:: Triggered:: {"id":13,"path":"c:/projects/myproject/c.ts"}:: c:\projects\myproject\c.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\c.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }export const y = 20;export const z = 30;


After running Timeout callback:: count: 0

Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\e.ts created
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\e.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/e.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": [
        {
          "id": 2,
          "created": [
            "c:\\projects\\myproject\\d.ts",
            "c:\\projects\\myproject\\e.ts"
          ]
        },
        {
          "id": 13,
          "updated": [
            "c:\\projects\\myproject\\c.ts"
          ]
        }
      ],
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with c:/projects/myproject/d.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with c:/projects/myproject/d.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with c:/projects/myproject/e.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with c:/projects/myproject/e.ts :: WatchInfo: c:/projects/myproject 1 undefined Config: c:/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with c:/projects/myproject/c.ts 1:: WatchInfo: c:/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with c:/projects/myproject/c.ts 1:: WatchInfo: c:/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
After request

Timeout callback:: count: 2
11: c:/projects/myproject/tsconfig.json *new*
12: *ensureProjectForOpenFiles* *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
11: c:/projects/myproject/tsconfig.json
12: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 15,
        "path": "c:/projects/myproject/d.ts"
      }
    }
Custom watchFile:: Added:: {"id":15,"path":"c:/projects/myproject/d.ts"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/projects/myproject/e.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "createFileWatcher",
      "body": {
        "id": 16,
        "path": "c:/projects/myproject/e.ts"
      }
    }
Custom watchFile:: Added:: {"id":16,"path":"c:/projects/myproject/e.ts"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 5 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	c:/projects/myproject/c.ts Text-3 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;export const z = 30;"
	c:/projects/myproject/d.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/e.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"


	../../a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Matched by default include pattern '**/*'
	b.ts
	  Matched by default include pattern '**/*'
	node_modules/something/index.d.ts
	  Imported via "something" from file 'm.ts'
	m.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'
	d.ts
	  Matched by default include pattern '**/*'
	e.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background c:/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "c:/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
c:/a/lib/lib.d.ts:
  {"event":{"id":6,"path":"c:/a/lib/lib.d.ts"}}
c:/projects/myproject/b.ts:
  {"event":{"id":14,"path":"c:/projects/myproject/b.ts"}}
c:/projects/myproject/c.ts:
  {"event":{"id":13,"path":"c:/projects/myproject/c.ts"}}
c:/projects/myproject/d.ts: *new*
  {"event":{"id":15,"path":"c:/projects/myproject/d.ts"}}
c:/projects/myproject/e.ts: *new*
  {"event":{"id":16,"path":"c:/projects/myproject/e.ts"}}
c:/projects/myproject/m.ts:
  {"event":{"id":4,"path":"c:/projects/myproject/m.ts"}}
c:/projects/myproject/node_modules/package.json:
  {"event":{"id":8,"path":"c:/projects/myproject/node_modules/package.json"}}
c:/projects/myproject/node_modules/something/package.json:
  {"event":{"id":7,"path":"c:/projects/myproject/node_modules/something/package.json"}}
c:/projects/myproject/package.json:
  {"event":{"id":9,"path":"c:/projects/myproject/package.json"}}
c:/projects/myproject/tsconfig.json:
  {"event":{"id":1,"path":"c:/projects/myproject/tsconfig.json"}}
c:/projects/package.json:
  {"event":{"id":10,"path":"c:/projects/package.json"}}

FsWatchesRecursive::
c:/projects/myproject:
  {"event":{"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}}
c:/projects/myproject/node_modules:
  {"event":{"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}}
c:/projects/myproject/node_modules/@types:
  {"event":{"id":11,"path":"c:/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}}
c:/projects/node_modules/@types:
  {"event":{"id":12,"path":"c:/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}}

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/d.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/e.ts *new*
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Custom watchDirectory:: Triggered:: {"id":5,"path":"c:/projects/myproject/node_modules","recursive":true}:: c:\projects\myproject\node_modules\something\index.d.ts updated
Custom watchDirectory:: Triggered Ignored:: {"id":2,"path":"c:/projects/myproject","recursive":true,"ignoreUpdate":true}:: c:\projects\myproject\node_modules\something\index.d.ts updated
Before running Timeout callback:: count: 0
//// [c:/projects/myproject/node_modules/something/index.d.ts]
export const x = 10;export const y = 20;


After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 5,
        "updated": [
          "c:\\projects\\myproject\\node_modules\\something\\index.d.ts"
        ]
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with c:/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: c:/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with c:/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: c:/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with c:/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: c:/projects/myproject/node_modules 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: c:/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with c:/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: c:/projects/myproject/node_modules 1 undefined Project: c:/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
After request

Timeout callback:: count: 3
13: c:/projects/myproject/tsconfig.json *new*
14: *ensureProjectForOpenFiles* *new*
15: c:/projects/myproject/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts
    version: Text-3
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/e.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 3
13: c:/projects/myproject/tsconfig.json
14: *ensureProjectForOpenFiles*
15: c:/projects/myproject/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: c:/projects/myproject/tsconfig.json projectStateVersion: 6 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	c:/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	c:/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/node_modules/something/index.d.ts Text-2 "export const x = 10;export const y = 20;"
	c:/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	c:/projects/myproject/c.ts Text-3 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;export const z = 30;"
	c:/projects/myproject/d.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	c:/projects/myproject/e.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
After running Timeout callback:: count: 1

Timeout callback:: count: 1
14: *ensureProjectForOpenFiles* *deleted*
15: c:/projects/myproject/tsconfig.jsonFailedLookupInvalidation *deleted*
16: *ensureProjectForOpenFiles* *new*

Projects::
c:/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
c:/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        c:/projects/myproject/tsconfig.json *default*
c:/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/c.ts
    version: Text-3
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/d.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/e.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        c:/projects/myproject/tsconfig.json
c:/projects/myproject/node_modules/something/index.d.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        c:/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 1
16: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project 'c:/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: c:/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background c:/projects/myproject/a.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "c:/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0
