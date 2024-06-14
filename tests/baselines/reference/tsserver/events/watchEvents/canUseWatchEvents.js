currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/a.ts]
export class a { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/b.ts]
export class b { prop = "hello"; foo() { return this.prop; } }

//// [/user/username/projects/myproject/m.ts]
import { x } from "something"

//// [/user/username/projects/myproject/node_modules/something/index.d.ts]
export const x = 10;

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
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/a.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 1,
        "path": "/user/username/projects/myproject/tsconfig.json"
      }
    }
Custom watchFile: 1: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectLoadingStart",
      "body": {
        "project": "/user/username/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/m.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createDirectoryWatcher",
      "body": {
        "id": 2,
        "path": "/user/username/projects/myproject",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory: 2: /user/username/projects/myproject true true
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 3,
        "path": "/user/username/projects/myproject/b.ts"
      }
    }
Custom watchFile: 3: /user/username/projects/myproject/b.ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/m.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 4,
        "path": "/user/username/projects/myproject/m.ts"
      }
    }
Custom watchFile: 4: /user/username/projects/myproject/m.ts
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createDirectoryWatcher",
      "body": {
        "id": 5,
        "path": "/user/username/projects/myproject/node_modules",
        "recursive": true
      }
    }
Custom watchDirectory: 5: /user/username/projects/myproject/node_modules true undefined
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 6,
        "path": "/a/lib/lib.d.ts"
      }
    }
Custom watchFile: 6: /a/lib/lib.d.ts
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createDirectoryWatcher",
      "body": {
        "id": 7,
        "path": "/user/username/projects/myproject/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory: 7: /user/username/projects/myproject/node_modules/@types true true
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createDirectoryWatcher",
      "body": {
        "id": 8,
        "path": "/user/username/projects/node_modules/@types",
        "recursive": true,
        "ignoreUpdate": true
      }
    }
Custom watchDirectory: 8: /user/username/projects/node_modules/@types true true
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""


	../../../../a/lib/lib.d.ts
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
      "event": "CustomHandler::projectLoadingFinish",
      "body": {
        "project": "/user/username/projects/myproject/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectInfo",
      "body": {
        "projectId": "4a33d78ee40d836c4f4e64c59aed976628aea0013be9585c5ff171dfc41baf98",
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
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::configFileDiag",
      "body": {
        "configFileName": "/user/username/projects/myproject/tsconfig.json",
        "diagnostics": [],
        "triggerFile": "/user/username/projects/myproject/a.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Custom WatchedFiles::
/a/lib/lib.d.ts: *new*
  {"id":6,"path":"/a/lib/lib.d.ts"}
/user/username/projects/myproject/b.ts: *new*
  {"id":3,"path":"/user/username/projects/myproject/b.ts"}
/user/username/projects/myproject/m.ts: *new*
  {"id":4,"path":"/user/username/projects/myproject/m.ts"}
/user/username/projects/myproject/tsconfig.json: *new*
  {"id":1,"path":"/user/username/projects/myproject/tsconfig.json"}

Custom WatchedDirectoriesRecursive::
/user/username/projects/myproject: *new*
  {"id":2,"path":"/user/username/projects/myproject","recursive":true,"ignoreUpdate":true}
/user/username/projects/myproject/node_modules: *new*
  {"id":5,"path":"/user/username/projects/myproject/node_modules","recursive":true}
/user/username/projects/myproject/node_modules/@types: *new*
  {"id":7,"path":"/user/username/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
/user/username/projects/node_modules/@types: *new*
  {"id":8,"path":"/user/username/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Add file: /user/username/projects/myproject/c.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/c.ts created
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 2,
        "created": [
          "/user/username/projects/myproject/c.ts"
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/c.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 9,
        "path": "/user/username/projects/myproject/c.ts"
      }
    }
Custom watchFile: 9: /user/username/projects/myproject/c.ts
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-1 "export class b { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	/user/username/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"


	../../../../a/lib/lib.d.ts
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Custom WatchedFiles::
/a/lib/lib.d.ts:
  {"id":6,"path":"/a/lib/lib.d.ts"}
/user/username/projects/myproject/b.ts:
  {"id":3,"path":"/user/username/projects/myproject/b.ts"}
/user/username/projects/myproject/c.ts: *new*
  {"id":9,"path":"/user/username/projects/myproject/c.ts"}
/user/username/projects/myproject/m.ts:
  {"id":4,"path":"/user/username/projects/myproject/m.ts"}
/user/username/projects/myproject/tsconfig.json:
  {"id":1,"path":"/user/username/projects/myproject/tsconfig.json"}

Custom WatchedDirectoriesRecursive::
/user/username/projects/myproject:
  {"id":2,"path":"/user/username/projects/myproject","recursive":true,"ignoreUpdate":true}
/user/username/projects/myproject/node_modules:
  {"id":5,"path":"/user/username/projects/myproject/node_modules","recursive":true}
/user/username/projects/myproject/node_modules/@types:
  {"id":7,"path":"/user/username/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
/user/username/projects/node_modules/@types:
  {"id":8,"path":"/user/username/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Change File: /user/username/projects/myproject/b.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/b.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Custom watch:: /user/username/projects/myproject/b.ts /user/username/projects/myproject/b.ts updated
Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/b.ts updated
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 3,
        "updated": [
          "/user/username/projects/myproject/b.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/b.ts 1:: WatchInfo: /user/username/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
3: /user/username/projects/myproject/tsconfig.json *new*
4: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
3: /user/username/projects/myproject/tsconfig.json
4: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	/user/username/projects/myproject/c.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::closeFileWatcher",
      "body": {
        "id": 3
      }
    }
Custom watchFile:: Close:: 3: /user/username/projects/myproject/b.ts
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/b.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/b.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Custom WatchedFiles::
/a/lib/lib.d.ts:
  {"id":6,"path":"/a/lib/lib.d.ts"}
/user/username/projects/myproject/c.ts:
  {"id":9,"path":"/user/username/projects/myproject/c.ts"}
/user/username/projects/myproject/m.ts:
  {"id":4,"path":"/user/username/projects/myproject/m.ts"}
/user/username/projects/myproject/tsconfig.json:
  {"id":1,"path":"/user/username/projects/myproject/tsconfig.json"}

Custom WatchedFiles *deleted*::
/user/username/projects/myproject/b.ts:
  {"id":3,"path":"/user/username/projects/myproject/b.ts"}

Custom WatchedDirectoriesRecursive::
/user/username/projects/myproject:
  {"id":2,"path":"/user/username/projects/myproject","recursive":true,"ignoreUpdate":true}
/user/username/projects/myproject/node_modules:
  {"id":5,"path":"/user/username/projects/myproject/node_modules","recursive":true}
/user/username/projects/myproject/node_modules/@types:
  {"id":7,"path":"/user/username/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
/user/username/projects/node_modules/@types:
  {"id":8,"path":"/user/username/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts (Open) *changed*
    open: true *changed*
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/b.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 10,
        "path": "/user/username/projects/myproject/b.ts"
      }
    }
Custom watchFile: 10: /user/username/projects/myproject/b.ts
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Custom WatchedFiles::
/a/lib/lib.d.ts:
  {"id":6,"path":"/a/lib/lib.d.ts"}
/user/username/projects/myproject/b.ts: *new*
  {"id":10,"path":"/user/username/projects/myproject/b.ts"}
/user/username/projects/myproject/c.ts:
  {"id":9,"path":"/user/username/projects/myproject/c.ts"}
/user/username/projects/myproject/m.ts:
  {"id":4,"path":"/user/username/projects/myproject/m.ts"}
/user/username/projects/myproject/tsconfig.json:
  {"id":1,"path":"/user/username/projects/myproject/tsconfig.json"}

Custom WatchedDirectoriesRecursive::
/user/username/projects/myproject:
  {"id":2,"path":"/user/username/projects/myproject","recursive":true,"ignoreUpdate":true}
/user/username/projects/myproject/node_modules:
  {"id":5,"path":"/user/username/projects/myproject/node_modules","recursive":true}
/user/username/projects/myproject/node_modules/@types:
  {"id":7,"path":"/user/username/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
/user/username/projects/node_modules/@types:
  {"id":8,"path":"/user/username/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts *changed*
    open: false *changed*
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Change File: /user/username/projects/myproject/c.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }export const y = 20;


After running Timeout callback:: count: 0

Custom watch:: /user/username/projects/myproject/c.ts /user/username/projects/myproject/c.ts updated
Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/c.ts updated
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 9,
        "updated": [
          "/user/username/projects/myproject/c.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/c.ts 1:: WatchInfo: /user/username/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/c.ts 1:: WatchInfo: /user/username/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
5: /user/username/projects/myproject/tsconfig.json *new*
6: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
5: /user/username/projects/myproject/tsconfig.json
6: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 4 projectProgramVersion: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-1 "export const x = 10;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	/user/username/projects/myproject/c.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 2
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

update with npm install
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/node_modules/something/index.d.ts]
export const x = 10;export const y = 20;


After running Timeout callback:: count: 0

Custom watch:: /user/username/projects/myproject/node_modules /user/username/projects/myproject/node_modules/something/index.d.ts updated
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": {
        "id": 5,
        "updated": [
          "/user/username/projects/myproject/node_modules/something/index.d.ts"
        ]
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/node_modules/something/index.d.ts :: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 3
7: /user/username/projects/myproject/tsconfig.json *new*
8: *ensureProjectForOpenFiles* *new*
9: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 3
7: /user/username/projects/myproject/tsconfig.json
8: *ensureProjectForOpenFiles*
9: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 5 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-2 "export const x = 10;export const y = 20;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	/user/username/projects/myproject/c.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
After running Timeout callback:: count: 1

Timeout callback:: count: 1
8: *ensureProjectForOpenFiles* *deleted*
9: /user/username/projects/myproject/tsconfig.jsonFailedLookupInvalidation *deleted*
10: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 1
10: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Add file: /user/username/projects/myproject/d.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/d.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Change File: /user/username/projects/myproject/c.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/c.ts]
export class a { prop = "hello"; foo() { return this.prop; } }export const y = 20;export const z = 30;


After running Timeout callback:: count: 0

Add File: /user/username/projects/myproject/e.ts
Before running Timeout callback:: count: 0
//// [/user/username/projects/myproject/e.ts]
export class a { prop = "hello"; foo() { return this.prop; } }


After running Timeout callback:: count: 0

Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/d.ts created
Custom watch:: /user/username/projects/myproject/c.ts /user/username/projects/myproject/c.ts updated
Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/c.ts updated
Custom watch:: /user/username/projects/myproject /user/username/projects/myproject/e.ts created
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "watchChange",
      "arguments": [
        {
          "id": 2,
          "created": [
            "/user/username/projects/myproject/d.ts",
            "/user/username/projects/myproject/e.ts"
          ]
        },
        {
          "id": 9,
          "updated": [
            "/user/username/projects/myproject/c.ts"
          ]
        }
      ],
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/projects/myproject/e.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/e.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/c.ts 1:: WatchInfo: /user/username/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/c.ts 1:: WatchInfo: /user/username/projects/myproject/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

Timeout callback:: count: 2
15: /user/username/projects/myproject/tsconfig.json *new*
16: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts *changed*
    version: Text-2
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Before running Timeout callback:: count: 2
15: /user/username/projects/myproject/tsconfig.json
16: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 11,
        "path": "/user/username/projects/myproject/d.ts"
      }
    }
Custom watchFile: 11: /user/username/projects/myproject/d.ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/e.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::createFileWatcher",
      "body": {
        "id": 12,
        "path": "/user/username/projects/myproject/e.ts"
      }
    }
Custom watchFile: 12: /user/username/projects/myproject/e.ts
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 6 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/a.ts SVC-1-0 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/b.ts Text-2 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/node_modules/something/index.d.ts Text-2 "export const x = 10;export const y = 20;"
	/user/username/projects/myproject/m.ts Text-1 "import { x } from \"something\""
	/user/username/projects/myproject/c.ts Text-3 "export class a { prop = \"hello\"; foo() { return this.prop; } }export const y = 20;export const z = 30;"
	/user/username/projects/myproject/d.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"
	/user/username/projects/myproject/e.ts Text-1 "export class a { prop = \"hello\"; foo() { return this.prop; } }"


	../../../../a/lib/lib.d.ts
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
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (8)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "CustomHandler::projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/a.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

Custom WatchedFiles::
/a/lib/lib.d.ts:
  {"id":6,"path":"/a/lib/lib.d.ts"}
/user/username/projects/myproject/b.ts:
  {"id":10,"path":"/user/username/projects/myproject/b.ts"}
/user/username/projects/myproject/c.ts:
  {"id":9,"path":"/user/username/projects/myproject/c.ts"}
/user/username/projects/myproject/d.ts: *new*
  {"id":11,"path":"/user/username/projects/myproject/d.ts"}
/user/username/projects/myproject/e.ts: *new*
  {"id":12,"path":"/user/username/projects/myproject/e.ts"}
/user/username/projects/myproject/m.ts:
  {"id":4,"path":"/user/username/projects/myproject/m.ts"}
/user/username/projects/myproject/tsconfig.json:
  {"id":1,"path":"/user/username/projects/myproject/tsconfig.json"}

Custom WatchedDirectoriesRecursive::
/user/username/projects/myproject:
  {"id":2,"path":"/user/username/projects/myproject","recursive":true,"ignoreUpdate":true}
/user/username/projects/myproject/node_modules:
  {"id":5,"path":"/user/username/projects/myproject/node_modules","recursive":true}
/user/username/projects/myproject/node_modules/@types:
  {"id":7,"path":"/user/username/projects/myproject/node_modules/@types","recursive":true,"ignoreUpdate":true}
/user/username/projects/node_modules/@types:
  {"id":8,"path":"/user/username/projects/node_modules/@types","recursive":true,"ignoreUpdate":true}

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 6
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/a.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/b.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/c.ts *changed*
    version: Text-3 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/e.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/m.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/something/index.d.ts
    version: Text-2
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
