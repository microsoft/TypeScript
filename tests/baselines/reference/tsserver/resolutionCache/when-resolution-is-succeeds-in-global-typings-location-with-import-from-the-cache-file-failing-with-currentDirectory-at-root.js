Info seq  [hh:mm:ss:mss] currentDirectory:: / useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts] Inode:: 9
import { x } from "undici-types";
export const y = x;


//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 13
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

//// [/home/src/Library/Caches/typescript/package.json] Inode:: 111
{ "private": true }

//// [/home/src/Library/Caches/typescript/node_modules/types-registry/index.json] Inode:: 113
{
  "entries": {}
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "module": 99,
          "moduleResolution": 100,
          "target": 7,
          "traceResolution": true
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
        "file": "^/aichat-code-block-anysphere/ocjahtkquh/",
        "fileContent": "// worker.js\nconst { parentPort } = require('worker_threads');\nparentPort.postMessage('Hello, world!');\n",
        "scriptKindName": "JS"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: ^/aichat-code-block-anysphere/ocjahtkquh/ ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] ======== Resolving module 'worker_threads' from '/^/aichat-code-block-anysphere/ocjahtkquh'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'require', 'types'.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Loading module 'worker_threads' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/^/aichat-code-block-anysphere/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/^/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Info seq  [hh:mm:ss:mss] Directory '/^/aichat-code-block-anysphere/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/^/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] ======== Module name 'worker_threads' was not resolved. ========
Info seq  [hh:mm:ss:mss] Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'node' using cache location '/home/src/Library/Caches/typescript'.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/node.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Found 'package.json' at '/home/src/Library/Caches/typescript/package.json'.
Info seq  [hh:mm:ss:mss] ======== Resolving module 'undici-types' from '/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] Loading module 'undici-types' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Library/Caches/typescript/node_modules/@types/node/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Library/Caches/typescript/node_modules/@types/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/undici-types.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Library/Caches/typescript/node_modules/@types/node/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Library/Caches/typescript/node_modules/@types/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.js' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.jsx' does not exist.
Info seq  [hh:mm:ss:mss] ======== Module name 'undici-types' was not resolved. ========
Info seq  [hh:mm:ss:mss] Auto discovery for typings is enabled in project '/dev/null/inferredProject1*'. Running extra resolution pass for module 'undici-types' using cache location '/home/src/Library/Caches/typescript'.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/undici-types.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/undici-types.d.ts' does not exist.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2020.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/node/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts Text-1 "import { x } from \"undici-types\";\nexport const y = x;\n"
	^/aichat-code-block-anysphere/ocjahtkquh/ SVC-1-0 "// worker.js\nconst { parentPort } = require('worker_threads');\nparentPort.postMessage('Hello, world!');\n"


	home/src/tslibs/TS/Lib/lib.es2020.full.d.ts
	  Default library for target 'es2020'
	home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts
	  Imported via 'worker_threads' from file '^/aichat-code-block-anysphere/ocjahtkquh/'
	^/aichat-code-block-anysphere/ocjahtkquh/
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer
//// [/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts] *Lib* Inode:: 19


PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/Library/Caches/typescript/package.json: *new*
  {"inode":111}
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts: *new*
  {"inode":19}

FsWatchesRecursive::
/home/src/Library/Caches/typescript/node_modules: *new*
  {"inode":6}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
^/aichat-code-block-anysphere/ocjahtkquh/ (Dynamic) (Open) *new*
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
        "/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts",
        "^/aichat-code-block-anysphere/ocjahtkquh/"
      ],
      "compilerOptions": {
        "module": 99,
        "moduleResolution": 100,
        "target": 7,
        "traceResolution": true,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2,
        "allowJs": true
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [
        "undici-types"
      ],
      "projectRootPath": "/",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/home/src/tslibs/TS/Lib/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: ["undici-types"]
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [
        "undici-types"
      ],
      "filesToWatch": [
        "/bower_components",
        "/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/bower_components",
        "/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] Skipping watcher creation at /bower_components:: Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Skipping watcher creation at /node_modules:: Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Installing typings ["undici-types"]
TI:: [hh:mm:ss:mss] 'undici-types':: Entry for package 'undici-types' does not exist in local types registry - skipping...
TI:: [hh:mm:ss:mss] All typings are known to be missing or invalid - no need to install more typings
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "module": 99,
        "moduleResolution": 100,
        "target": 7,
        "traceResolution": true,
        "allowNonTsExtensions": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2,
        "allowJs": true
      },
      "typings": [],
      "unresolvedImports": [
        "undici-types"
      ],
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
          "module": 99,
          "moduleResolution": 100,
          "target": 7,
          "traceResolution": true,
          "allowNonTsExtensions": true,
          "noEmitForJsFiles": true,
          "maxNodeModuleJsDepth": 2,
          "allowJs": true
        },
        "typings": [],
        "unresolvedImports": [
          "undici-types"
        ],
        "kind": "action::set"
      }
    }
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: ^/aichat-code-block-anysphere/ocjahtkquh/ ProjectRootPath: undefined
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

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*
