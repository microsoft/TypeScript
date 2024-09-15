Info seq  [hh:mm:ss:mss] For files of style c:/myprojects/project/x.js
Info seq  [hh:mm:ss:mss] currentDirectory:: c:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: c:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: c:\home\src\Library\Caches\typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [c:/myprojects/project/x.js]
const x = 10

//// [c:/home/src/tslibs/TS/Lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/myprojects/project/x.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: c:/myprojects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	c:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/myprojects/project/x.js SVC-1-0 "const x = 10"


	../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
c:/myprojects/node_modules/@types: *new*
  {"pollingInterval":500}
c:/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}
c:/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
c:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/myprojects/project/x.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location 'c:\home\src\Library\Caches\typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location 'c:\home\src\Library\Caches\typescript'
TI:: [hh:mm:ss:mss] Trying to find 'c:/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location 'c:\home\src\Library\Caches\typescript'
TI:: [hh:mm:ss:mss] Npm config file: c:/home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: 'c:/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [c:/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [c:/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "c:/home/src/tslibs/TS/Lib/lib.d.ts",
        "c:/myprojects/project/x.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "c:/myprojects/project",
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
        "c:/myprojects/project/bower_components",
        "c:/myprojects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "c:/myprojects/project/bower_components",
        "c:/myprojects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
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
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/myprojects/project/x.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
c:/myprojects/node_modules/@types:
  {"pollingInterval":500}
c:/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
c:/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
c:/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] For files of style //vda1cs4850/myprojects/project/x.js
Info seq  [hh:mm:ss:mss] currentDirectory:: //vda1cs4850/home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: //vda1cs4850/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: //vda1cs4850/home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/vda1cs4850/myprojects/project/x.js]
const x = 10

//// [//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: //vda1cs4850/myprojects/project/x.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: //vda1cs4850/myprojects/project
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	//vda1cs4850/myprojects/project/x.js SVC-1-0 ""


	../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

FsWatches::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
//vda1cs4850/myprojects/project/x.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location '//vda1cs4850/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '//vda1cs4850/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: //vda1cs4850/home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: '//vda1cs4850/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [//vda1cs4850/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts",
        "//vda1cs4850/myprojects/project/x.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "//vda1cs4850/myprojects/project",
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
        "//vda1cs4850/myprojects/project/bower_components",
        "//vda1cs4850/myprojects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "//vda1cs4850/myprojects/project/bower_components",
        "//vda1cs4850/myprojects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] Skipping watcher creation at //vda1cs4850/myprojects/project/bower_components:: Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Skipping watcher creation at //vda1cs4850/myprojects/project/node_modules:: Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
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
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: //vda1cs4850/myprojects/project/x.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] For files of style //vda1cs4850/c$/myprojects/project/x.js
Info seq  [hh:mm:ss:mss] currentDirectory:: //vda1cs4850/home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: //vda1cs4850/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: //vda1cs4850/home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/vda1cs4850/c$/myprojects/project/x.js]
const x = 10

//// [//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: //vda1cs4850/c$/myprojects/project/x.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: //vda1cs4850/c$/myprojects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	//vda1cs4850/c$/myprojects/project/x.js SVC-1-0 ""


	../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
//vda1cs4850/c$/myprojects/node_modules/@types: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
//vda1cs4850/c$/myprojects/project/x.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

TI:: [hh:mm:ss:mss] Global cache location '//vda1cs4850/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '//vda1cs4850/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: //vda1cs4850/home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: '//vda1cs4850/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [//vda1cs4850/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts",
        "//vda1cs4850/c$/myprojects/project/x.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "//vda1cs4850/c$/myprojects/project",
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
        "//vda1cs4850/c$/myprojects/project/bower_components",
        "//vda1cs4850/c$/myprojects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "//vda1cs4850/c$/myprojects/project/bower_components",
        "//vda1cs4850/c$/myprojects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
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
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: //vda1cs4850/c$/myprojects/project/x.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
//vda1cs4850/c$/myprojects/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] For files of style c:/users/username/myprojects/project/x.js
Info seq  [hh:mm:ss:mss] currentDirectory:: c:\home\src\Vscode\Projects\bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: c:/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: c:\home\src\Library\Caches\typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [c:/users/username/myprojects/project/x.js]
const x = 10

//// [c:/home/src/tslibs/TS/Lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "c:/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: c:/users/username/myprojects/project/x.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: c:/users/username/myprojects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: c:/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	c:/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	c:/users/username/myprojects/project/x.js SVC-1-0 "const x = 10"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
c:/users/username/myprojects/node_modules/@types: *new*
  {"pollingInterval":500}
c:/users/username/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
c:/users/username/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}
c:/users/username/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
c:/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
c:/users/username/myprojects/project/x.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location 'c:\home\src\Library\Caches\typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location 'c:\home\src\Library\Caches\typescript'
TI:: [hh:mm:ss:mss] Trying to find 'c:/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location 'c:\home\src\Library\Caches\typescript'
TI:: [hh:mm:ss:mss] Npm config file: c:/home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: 'c:/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [c:/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [c:/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "c:/home/src/tslibs/TS/Lib/lib.d.ts",
        "c:/users/username/myprojects/project/x.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "c:/users/username/myprojects/project",
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
        "c:/users/username/myprojects/project/bower_components",
        "c:/users/username/myprojects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "c:/users/username/myprojects/project/bower_components",
        "c:/users/username/myprojects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: c:/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
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
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: c:/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
c:/users/username/myprojects/node_modules/@types:
  {"pollingInterval":500}
c:/users/username/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
c:/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
c:/users/username/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
c:/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
c:/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
c:/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Info seq  [hh:mm:ss:mss] For files of style //vda1cs4850/c$/users/username/myprojects/project/x.js
Info seq  [hh:mm:ss:mss] currentDirectory:: //vda1cs4850/home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: //vda1cs4850/home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: //vda1cs4850/home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [//vda1cs4850/vda1cs4850/c$/users/username/myprojects/project/x.js]
const x = 10

//// [//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts]
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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "//vda1cs4850/c$/users/username/myprojects/project/x.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: //vda1cs4850/c$/users/username/myprojects/project/x.js ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: //vda1cs4850/c$/users/username/myprojects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: //vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	//vda1cs4850/c$/users/username/myprojects/project/x.js SVC-1-0 ""


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
//vda1cs4850/c$/users/username/myprojects/node_modules/@types: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/node_modules/@types: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
//vda1cs4850/c$/users/username/myprojects/project/x.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*

TI:: [hh:mm:ss:mss] Global cache location '//vda1cs4850/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '//vda1cs4850/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '//vda1cs4850/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: //vda1cs4850/home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: '//vda1cs4850/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [//vda1cs4850/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [//vda1cs4850/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts",
        "//vda1cs4850/c$/users/username/myprojects/project/x.js"
      ],
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
        "noEmitForJsFiles": true,
        "maxNodeModuleJsDepth": 2
      },
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "unresolvedImports": [],
      "projectRootPath": "//vda1cs4850/c$/users/username/myprojects/project",
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
        "//vda1cs4850/c$/users/username/myprojects/project/bower_components",
        "//vda1cs4850/c$/users/username/myprojects/project/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "//vda1cs4850/c$/users/username/myprojects/project/bower_components",
        "//vda1cs4850/c$/users/username/myprojects/project/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: //vda1cs4850/c$/users/username/myprojects/project/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "target": 1,
        "jsx": 1,
        "allowNonTsExtensions": true,
        "allowJs": true,
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
          "target": 1,
          "jsx": 1,
          "allowNonTsExtensions": true,
          "allowJs": true,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: //vda1cs4850/c$/users/username/myprojects/project/x.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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
//vda1cs4850/c$/users/username/myprojects/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/bower_components: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/jsconfig.json:
  {"pollingInterval":2000}
//vda1cs4850/c$/users/username/myprojects/project/node_modules: *new*
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/node_modules/@types:
  {"pollingInterval":500}
//vda1cs4850/c$/users/username/myprojects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
//vda1cs4850/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*
