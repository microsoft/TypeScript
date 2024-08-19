currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/node_modules/module1/index.ts]
export function module1() {}

//// [/user/username/projects/myproject/node_modules/module2/index.ts]
export function module2() {}

//// [/user/username/projects/myproject/src/file1.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/src/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "traceResolution": true
  }
}

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
        "file": "/user/username/projects/myproject/src/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined:: Result: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/projects/myproject/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/projects/myproject/src/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
 ],
 "options": {
  "traceResolution": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module1' from '/user/username/projects/myproject/src/file1.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'module1' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/src/node_modules/module1/index.ts', result '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module2' from '/user/username/projects/myproject/src/file1.ts'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'module2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/myproject/src/node_modules/@types' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/index.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] Resolving real path for '/user/username/projects/myproject/node_modules/module2/index.ts', result '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module1' from '/user/username/projects/myproject/src/file2.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'module1' was found in cache from location '/user/username/projects/myproject/src'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module1' was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'. ========
Info seq  [hh:mm:ss:mss] ======== Resolving module 'module2' from '/user/username/projects/myproject/src/file2.ts'. ========
Info seq  [hh:mm:ss:mss] Resolution for module 'module2' was found in cache from location '/user/username/projects/myproject/src'.
Info seq  [hh:mm:ss:mss] ======== Module name 'module2' was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'. ========
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/module1/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/module2/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/package.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/node_modules/module1/index.ts Text-1 "export function module1() {}"
	/user/username/projects/myproject/node_modules/module2/index.ts Text-1 "export function module2() {}"
	/user/username/projects/myproject/src/file1.ts SVC-1-0 "import { module1 } from \"module1\";import { module2 } from \"module2\";"
	/user/username/projects/myproject/src/file2.ts Text-1 "import { module1 } from \"module1\";import { module2 } from \"module2\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/node_modules/module1/index.ts
	  Imported via "module1" from file 'src/file1.ts'
	  Imported via "module1" from file 'src/file2.ts'
	node_modules/module2/index.ts
	  Imported via "module2" from file 'src/file1.ts'
	  Imported via "module2" from file 'src/file2.ts'
	src/file1.ts
	  Matched by default include pattern '**/*'
	src/file2.ts
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
            "ts": 4,
            "tsSize": 192,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 334,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "traceResolution": true
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
        "triggerFile": "/user/username/projects/myproject/src/file1.ts",
        "configFile": "/user/username/projects/myproject/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
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
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/module2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/module1/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/src/file2.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/node_modules: *new*
  {}

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/a/lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/module2/index.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/src/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/node_modules/module1/index.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/src/file2.ts 1:: WatchInfo: /user/username/projects/myproject/src/file2.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/src/file2.ts]
import { module1 } from "module1";import { module2 } from "module2";import { module1 } from "module1";import { module2 } from "module2";


Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json *new*
2: *ensureProjectForOpenFiles* *new*

Projects::
/user/username/projects/myproject/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*

ScriptInfos::
/a/lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/node_modules/module2/index.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/src/file2.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/node_modules/module1/index.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'module1' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'module2' from '/user/username/projects/myproject/src/file1.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/module1/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/src/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/module2/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/myproject/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/projects/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/username/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/user/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'module1' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/src/node_modules/module1/index.ts'.
Info seq  [hh:mm:ss:mss] Reusing resolution of module 'module2' from '/user/username/projects/myproject/src/file2.ts' of old program, it was successfully resolved to '/user/username/projects/myproject/node_modules/module2/index.ts'.
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/node_modules/module1/index.ts Text-1 "export function module1() {}"
	/user/username/projects/myproject/node_modules/module2/index.ts Text-1 "export function module2() {}"
	/user/username/projects/myproject/src/file1.ts SVC-1-0 "import { module1 } from \"module1\";import { module2 } from \"module2\";"
	/user/username/projects/myproject/src/file2.ts Text-2 "import { module1 } from \"module1\";import { module2 } from \"module2\";import { module1 } from \"module1\";import { module2 } from \"module2\";"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/projects/myproject/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /user/username/projects/myproject/src/file1.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/user/username/projects/myproject/src/file1.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

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
/user/username/projects/myproject/node_modules/module2/index.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json *default*
/user/username/projects/myproject/src/file2.ts *changed*
    version: Text-2 *changed*
    pendingReloadFromDisk: false *changed*
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
/user/username/projects/myproject/src/node_modules/module1/index.ts
    version: Text-1
    containingProjects: 1
        /user/username/projects/myproject/tsconfig.json
