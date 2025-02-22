Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts] Inode:: 9
import { x } from "./x";
export const y = x;


//// [/home/src/Library/Caches/typescript/node_modules/@types/node/x.d.ts] Inode:: 10
export const x = 10;


//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 17
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

//// [/home/src/Library/Caches/typescript/package.json] Inode:: 115
{ "private": true }

//// [/home/src/Library/Caches/typescript/node_modules/types-registry/index.json] Inode:: 117
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
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] ======== Resolving module 'worker_threads' from '/home/src/Vscode/Projects/bin/^/aichat-code-block-anysphere/ocjahtkquh'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'require', 'types'.
Info seq  [hh:mm:ss:mss] File '/home/src/Vscode/Projects/bin/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Vscode/Projects/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Vscode/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/package.json' does not exist.
Info seq  [hh:mm:ss:mss] File '/package.json' does not exist.
Info seq  [hh:mm:ss:mss] Loading module 'worker_threads' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/^/aichat-code-block-anysphere/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/^/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Searching all ancestor node_modules directories for fallback extensions: JavaScript, JSON.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/^/aichat-code-block-anysphere/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/^/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/bin/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/Projects/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/Vscode/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Info seq  [hh:mm:ss:mss] Directory '/home/node_modules' does not exist, skipping all lookups in it.
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
Info seq  [hh:mm:ss:mss] ======== Resolving module './x' from '/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts'. ========
Info seq  [hh:mm:ss:mss] Explicitly specified module resolution kind: 'Bundler'.
Info seq  [hh:mm:ss:mss] Resolving in CJS mode with conditions 'import', 'types'.
Info seq  [hh:mm:ss:mss] Loading module as file / folder, candidate module location '/home/src/Library/Caches/typescript/node_modules/@types/node/x', target file types: TypeScript, JavaScript, Declaration, JSON.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/x.ts' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/x.tsx' does not exist.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/x.d.ts' exists - use it as a name resolution result.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] ======== Module name './x' was successfully resolved to '/home/src/Library/Caches/typescript/node_modules/@types/node/x.d.ts'. ========
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/node/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/@types/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/node_modules/package.json' does not exist according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] File '/home/src/Library/Caches/typescript/package.json' exists according to earlier cached lookups.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2020.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/^ 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/^ 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/node/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/@types/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/node_modules/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/Library/Caches/typescript/package.json 2000 undefined Project: /dev/null/inferredProject1* WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/Library/Caches/typescript/node_modules/@types/node/x.d.ts Text-1 "export const x = 10;\n"
	/home/src/Library/Caches/typescript/node_modules/@types/node/index.d.ts Text-1 "import { x } from \"./x\";\nexport const y = x;\n"
	^/aichat-code-block-anysphere/ocjahtkquh/ SVC-1-0 "// worker.js\nconst { parentPort } = require('worker_threads');\nparentPort.postMessage('Hello, world!');\n"


	../../../tslibs/TS/Lib/lib.es2020.full.d.ts
	  Default library for target 'es2020'
	../../../Library/Caches/typescript/node_modules/@types/node/x.d.ts
	  Imported via "./x" from file '../../../Library/Caches/typescript/node_modules/@types/node/index.d.ts'
	../../../Library/Caches/typescript/node_modules/@types/node/index.d.ts
	  Imported via 'worker_threads' from file '^/aichat-code-block-anysphere/ocjahtkquh/'
	^/aichat-code-block-anysphere/ocjahtkquh/
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer
//// [/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts] *Lib* Inode:: 23


PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/Vscode/Projects/bin/^: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/Library/Caches/typescript/package.json: *new*
  {"inode":115}
/home/src/Vscode: *new*
  {"inode":11}
/home/src/Vscode/Projects: *new*
  {"inode":12}
/home/src/Vscode/Projects/bin: *new*
  {"inode":13}
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts: *new*
  {"inode":23}

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
/home/src/Library/Caches/typescript/node_modules/@types/node/x.d.ts *new*
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
      "unresolvedImports": [],
      "projectRootPath": "/home/src/Vscode/Projects/bin",
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
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
        "unresolvedImports": [],
        "kind": "action::set"
      }
    }
TI:: [hh:mm:ss:mss] No new typings were requested as a result of typings discovery
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

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

PolledWatches::
/home/src/Library/Caches/typescript/node_modules/@types/node/package.json:
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/@types/package.json:
  {"pollingInterval":2000}
/home/src/Library/Caches/typescript/node_modules/package.json:
  {"pollingInterval":2000}
/home/src/Vscode/Projects/bin/^:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/Library/Caches/typescript/package.json:
  {"inode":115}
/home/src/Vscode:
  {"inode":11}
/home/src/Vscode/Projects:
  {"inode":12}
/home/src/Vscode/Projects/bin:
  {"inode":13}
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts:
  {"inode":23}

FsWatchesRecursive::
/home/src/Library/Caches/typescript/node_modules:
  {"inode":6}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*
