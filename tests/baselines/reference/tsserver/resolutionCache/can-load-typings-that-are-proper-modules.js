Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/app.js]
var x = require("lib")

//// [/home/src/Library/Caches/typescript/node_modules/@types/lib/index.d.ts]
export let x = 1

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "traceResolution": true,
          "allowJs": true
        }
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/app.js"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/app.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] ======== Resolving module 'lib' from '/user/username/projects/project/app.js'. ========
Info seq  [hh:mm:ss:mss] Module resolution kind is not specified, using 'Node10'.
Info seq  [hh:mm:ss:mss] Loading module 'lib' from 'node_modules' folder, target file types: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/project/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Loading module 'lib' from 'node_modules' folder, target file types: JavaScript.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/project/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/username/projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/username/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/user/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'lib' was not resolved. ========
Info seq  [hh:mm:ss:mss] Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'lib' using cache location '/home/src/Library/Caches/typescript'.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/lib.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/lib/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/lib.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/lib/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/lib/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/Library/Caches/typescript/package.json'.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/lib/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/Library/Caches/typescript/node_modules/@types/lib/index.d.ts Text-1 "export let x = 1"
	/user/username/projects/project/app.js SVC-1-0 "var x = require(\"lib\")"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../home/src/Library/Caches/typescript/node_modules/@types/lib/index.d.ts
	  Imported via "lib" from file 'app.js'
	app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/Library/Caches/typescript/package.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/Library/Caches/typescript/node_modules: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/Library/Caches/typescript/node_modules/@types/lib/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/project/app.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location '/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete

TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/project/app.js"
      ],
      "compilerOptions": {
        "traceResolution": true,
        "allowJs": true,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "/user/username/projects/project",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/project/bower_components",
        "/user/username/projects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "traceResolution": true,
        "allowJs": true,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typings": [],
      "unresolvedImports": [],
      "kind": "action::set"
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "setTypings",
      "body": {
        "projectName": "/dev/null/inferredProject1*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "traceResolution": true,
          "allowJs": true,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2
        },
        "typings": [],
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/app.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/lib/package.json:
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/Library/Caches/typescript/package.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/home/src/Library/Caches/typescript/node_modules:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0
