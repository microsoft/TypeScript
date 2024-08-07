currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/rootfolder/otherfolder/a/b/project/file1.ts]
import a from "file2"

//// [/user/username/rootfolder/otherfolder/a/b/project/file3.ts]
export class c { }

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

//// [/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json]
{
  "compilerOptions": {
    "typeRoots": []
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/rootfolder/otherfolder/a/b/project/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined:: Result: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/rootfolder/otherfolder/a/b/project/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json : {
 "rootNames": [
  "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
  "/user/username/rootfolder/otherfolder/a/b/project/file3.ts"
 ],
 "options": {
  "typeRoots": [],
  "configFilePath": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project 1 undefined Config: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-1 "export class c { }"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json"
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
          "projectId": "79b1a0103ed8006f174a1f979cf698219d4ec4ae3a48594da1085f7a1749553c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 39,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "typeRoots": []
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
        "triggerFile": "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
        "configFile": "/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
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
/user/username/rootfolder/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/project/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules: *new*
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts: *new*
  {}
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/project: *new*
  {}

Projects::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
/user/username/rootfolder/otherfolder/a/b/project/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json *default*
/user/username/rootfolder/otherfolder/a/b/project/file3.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/project/file3.ts 1:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/project/file3.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/rootfolder/otherfolder/a/b/project/file3.ts]
export class c { }export class d {}


Timeout callback:: count: 2
1: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
/user/username/rootfolder/otherfolder/a/b/project/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json *default*
/user/username/rootfolder/otherfolder/a/b/project/file3.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-2 "export class c { }export class d {}"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info seq  [hh:mm:ss:mss] Queueing diagnostics update for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/rootfolder/otherfolder/a/b/project/file1.ts"
        ]
      }
    }
After running Timeout callback:: count: 1

Timeout callback:: count: 1
3: checkOne *new*

Projects::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
/user/username/rootfolder/otherfolder/a/b/project/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json *default*
/user/username/rootfolder/otherfolder/a/b/project/file3.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts :: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 2
3: checkOne
6: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation
//// [/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts]
export class a { }


PolledWatches::
/user/username/rootfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/b/project/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts:
  {}
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/node_modules: *new*
  {}
/user/username/rootfolder/otherfolder/a/b/project:
  {}

Timeout callback:: count: 2
3: checkOne
6: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation *new*

Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/node_modules/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/b/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/a/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/otherfolder/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/rootfolder/package.json 2000 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/a/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/otherfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/rootfolder/node_modules 1 undefined Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts Text-1 "export class a { }"
	/user/username/rootfolder/otherfolder/a/b/project/file1.ts SVC-1-0 "import a from \"file2\""
	/user/username/rootfolder/otherfolder/a/b/project/file3.ts Text-2 "export class c { }export class d {}"


	../../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	../node_modules/file2.d.ts
	  Imported via "file2" from file 'file1.ts'
	file1.ts
	  Matched by default include pattern '**/*'
	file3.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/user/username/rootfolder/otherfolder/a/b/project/file1.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 1

PolledWatches::
/user/username/rootfolder/otherfolder/a/b/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/rootfolder/otherfolder/a/b/package.json: *new*
  {"pollingInterval":2000}
/user/username/rootfolder/otherfolder/a/b/project/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/package.json: *new*
  {"pollingInterval":2000}
/user/username/rootfolder/otherfolder/package.json: *new*
  {"pollingInterval":2000}
/user/username/rootfolder/package.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/rootfolder/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/a/node_modules:
  {"pollingInterval":500}
/user/username/rootfolder/otherfolder/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/rootfolder/otherfolder/a/b/project/file3.ts:
  {}
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/rootfolder/otherfolder/a/b/node_modules:
  {}
/user/username/rootfolder/otherfolder/a/b/project:
  {}

Timeout callback:: count: 1
6: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.jsonFailedLookupInvalidation *deleted*
7: *ensureProjectForOpenFiles* *new*

Immedidate callback:: count: 1
1: semanticCheck *new*

Projects::
/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2 *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
/user/username/rootfolder/otherfolder/a/b/node_modules/file2.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
/user/username/rootfolder/otherfolder/a/b/project/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json *default*
/user/username/rootfolder/otherfolder/a/b/project/file3.ts
    version: Text-2
    containingProjects: 1
        /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json

Before running Timeout callback:: count: 1
7: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/rootfolder/otherfolder/a/b/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/rootfolder/otherfolder/a/b/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/rootfolder/otherfolder/a/b/project/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info seq  [hh:mm:ss:mss] Queueing diagnostics update for /user/username/rootfolder/otherfolder/a/b/project/file1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/rootfolder/otherfolder/a/b/project/file1.ts"
        ]
      }
    }
After running Timeout callback:: count: 1

Timeout callback:: count: 1
8: checkOne *new*

Immedidate callback:: count: 0
1: semanticCheck *deleted*
