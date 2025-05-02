Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: true
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/project/a/file1.ts]
let x = 1;

//// [/user/username/projects/project/A/file2.ts]
let y = 2;

//// [/user/username/projects/project/b/file2.ts]
let x = 3;

//// [/user/username/projects/project/c/file3.ts]
let z = 4;

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


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "esnext"
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
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "es2015"
        },
        "projectRootPath": "/user/username/projects/project/a"
      },
      "seq": 2,
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
        "file": "/user/username/projects/project/a/file1.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es6.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file1.ts SVC-1-0 "let x = 1;"


	../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer
//// [/home/src/tslibs/TS/Lib/lib.es6.d.ts] *Lib*


PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/project/a/file1.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

TI:: [hh:mm:ss:mss] Global cache location '/home/src/Library/Caches/typescript', safe file path '/home/src/tslibs/TS/Lib/typingSafeList.json', types map path /home/src/tslibs/TS/Lib/typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Trying to find '/home/src/Library/Caches/typescript/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/home/src/Library/Caches/typescript'
TI:: [hh:mm:ss:mss] Npm config file: /home/src/Library/Caches/typescript/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/home/src/Library/Caches/typescript/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/home/src/Library/Caches/typescript/package.json]
{ "private": true }

//// [/home/src/Library/Caches/typescript/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
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
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/a/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 3,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file1.ts SVC-1-0 "let x = 1;"
	/user/username/projects/project/A/file2.ts SVC-1-0 "let y = 2;"


	../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	file1.ts
	  Root file specified for compilation
	../A/file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts",
        "/user/username/projects/project/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 2 *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/project/A/file2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts",
        "projectRootPath": "/user/username/projects/project/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject2*, currentDirectory: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/b/file2.ts SVC-1-0 "let x = 3;"


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject2*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/user/username/projects/project/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject2*",
      "files": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject2*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject2*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 5,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *Lib*


PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject2* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject2*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 6,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject3*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject3* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/c/file3.ts SVC-1-0 "let z = 4;"


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject3*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/home/src/Vscode/Projects/bin",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject3*",
      "files": [
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject3*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject3*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 6,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 2
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject2*
        /dev/null/inferredProject3* *new*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/user/username/projects/project/c/file3.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts"
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 7,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/a/file1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts"
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 8,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts: *new*
  {}
/user/username/projects/project/a/file1.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: true
    isOrphan: true *changed*
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
/user/username/projects/project/A/file2.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject2* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts"
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject3*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 9,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: true
    isOrphan: true
/dev/null/inferredProject2* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
/user/username/projects/project/A/file2.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject2* *deleted*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject3* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts"
      },
      "seq": 10,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 10,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 3
    projectProgramVersion: 2
    dirty: true
    isOrphan: true
/dev/null/inferredProject2* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject3* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-1
    containingProjects: 2
        /dev/null/inferredProject2*
        /dev/null/inferredProject3*
/user/username/projects/project/A/file2.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject3* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 11,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file1.ts SVC-1-0 "let x = 1;"


	../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject3*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/c/file3.ts


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject3*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject3*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject3* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject3*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject3* WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/b/file2.ts


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject2*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject2*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject2*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 11,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    isOrphan: false *changed*
/dev/null/inferredProject2* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject3* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *deleted*
    version: Text-1
    containingProjects: 0 *changed*
        /dev/null/inferredProject2* *deleted*
        /dev/null/inferredProject3* *deleted*
/user/username/projects/project/A/file2.ts *deleted*
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts (Open) *changed*
    open: true *changed*
    version: SVC-1-0
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /dev/null/inferredProject1* *default* *new*
/user/username/projects/project/b/file2.ts *deleted*
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *deleted*
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts",
        "projectRootPath": "/user/username/projects/project/A",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 12,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject4*, currentDirectory: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject4* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-2 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/A/file2.ts SVC-2-0 "let y = 2;"


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject4*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/user/username/projects/project/A",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/A/bower_components",
        "/user/username/projects/project/A/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject4*",
      "files": [
        "/user/username/projects/project/A/bower_components",
        "/user/username/projects/project/A/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject4*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject4*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 12,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 3
    projectProgramVersion: 3
/dev/null/inferredProject4* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *new*
    version: Text-2
    containingProjects: 1
        /dev/null/inferredProject4*
/user/username/projects/project/A/file2.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts",
        "projectRootPath": "/user/username/projects/project/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 13,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject5*, currentDirectory: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject5* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-2 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/b/file2.ts SVC-2-0 "let x = 3;"


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject5*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/user/username/projects/project/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject5*",
      "files": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject5*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject5*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 13,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 3
    projectProgramVersion: 3
/dev/null/inferredProject4* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *changed*
    version: Text-2
    containingProjects: 2 *changed*
        /dev/null/inferredProject4*
        /dev/null/inferredProject5* *new*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject5* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 14,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject6*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject6* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-2 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/c/file3.ts SVC-2-0 "let z = 4;"


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject6*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/home/src/Vscode/Projects/bin",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject6*",
      "files": [
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject6*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject6*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 14,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 3
    projectProgramVersion: 3
/dev/null/inferredProject4* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject6* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *changed*
    version: Text-2
    containingProjects: 3 *changed*
        /dev/null/inferredProject4*
        /dev/null/inferredProject5*
        /dev/null/inferredProject6* *new*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject5* *default*
/user/username/projects/project/c/file3.ts (Open) *new*
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject6* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts"
      },
      "seq": 15,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 15,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/a/file1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*
    isOrphan: true *changed*
/dev/null/inferredProject4* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject6* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-2
    containingProjects: 3
        /dev/null/inferredProject4*
        /dev/null/inferredProject5*
        /dev/null/inferredProject6*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject4* *default*
/user/username/projects/project/a/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject5* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject6* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts"
      },
      "seq": 16,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject5*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 16,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts: *new*
  {}
/user/username/projects/project/a/file1.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 4
    projectProgramVersion: 3
    dirty: true
    isOrphan: true
/dev/null/inferredProject4* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject6* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-2
    containingProjects: 3
        /dev/null/inferredProject4*
        /dev/null/inferredProject5*
        /dev/null/inferredProject6*
/user/username/projects/project/A/file2.ts *changed*
    open: false *changed*
    version: SVC-2-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject4* *deleted*
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject5* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject6* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts"
      },
      "seq": 17,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject6*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 17,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 4
    projectProgramVersion: 3
    dirty: true
    isOrphan: true
/dev/null/inferredProject4* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject6* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-2
    containingProjects: 3
        /dev/null/inferredProject4*
        /dev/null/inferredProject5*
        /dev/null/inferredProject6*
/user/username/projects/project/A/file2.ts
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts *changed*
    open: false *changed*
    version: SVC-2-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject5* *deleted*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-2-0
    containingProjects: 1
        /dev/null/inferredProject6* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts"
      },
      "seq": 18,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 18,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 4
    projectProgramVersion: 3
    dirty: true
    isOrphan: true
/dev/null/inferredProject4* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject5* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject6* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-2
    containingProjects: 3
        /dev/null/inferredProject4*
        /dev/null/inferredProject5*
        /dev/null/inferredProject6*
/user/username/projects/project/A/file2.ts
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *changed*
    open: false *changed*
    version: SVC-2-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject6* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "compilerOptionsForInferredProjects",
      "arguments": {
        "options": {
          "allowJs": true,
          "target": "es2017"
        },
        "projectRootPath": "/user/username/projects/project/A"
      },
      "seq": 19,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Scheduled: /dev/null/inferredProject4*
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Timeout callback:: count: 1
1: /dev/null/inferredProject4* *new*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 20,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 4 projectProgramVersion: 3 structureChanged: false structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Same program as before
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject6*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/c/file3.ts


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject6*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject6*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject6* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject6*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject6* WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject4*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/A/file2.ts


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject4*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject4*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject4* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject4*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject4* WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject5*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/b/file2.ts


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject5*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject5*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject5* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject5*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject5* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 20,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4
    projectProgramVersion: 3
    dirty: false *changed*
    isOrphan: false *changed*
/dev/null/inferredProject4* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject5* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject6* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *deleted*
    version: Text-2
    containingProjects: 0 *changed*
        /dev/null/inferredProject4* *deleted*
        /dev/null/inferredProject5* *deleted*
        /dev/null/inferredProject6* *deleted*
/user/username/projects/project/A/file2.ts *deleted*
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts (Open) *changed*
    open: true *changed*
    version: SVC-1-0
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /dev/null/inferredProject1* *default* *new*
/user/username/projects/project/b/file2.ts *deleted*
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *deleted*
    version: SVC-2-0
    pendingReloadFromDisk: true
    containingProjects: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 21,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 5 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file1.ts SVC-1-0 "let x = 1;"
	/user/username/projects/project/A/file2.ts SVC-3-0 "let y = 2;"


	../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	file1.ts
	  Root file specified for compilation
	../A/file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts",
        "/user/username/projects/project/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 21,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 4 *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/project/A/file2.ts (Open) *new*
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts",
        "projectRootPath": "/user/username/projects/project/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 22,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject7*, currentDirectory: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject7* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-3 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/b/file2.ts SVC-3-0 "let x = 3;"


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject7*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/user/username/projects/project/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject7*",
      "files": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject7*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject7*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 22,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 5
    projectProgramVersion: 4
/dev/null/inferredProject7* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *new*
    version: Text-3
    containingProjects: 1
        /dev/null/inferredProject7*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open) *new*
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject7* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 23,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject8*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject8* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-3 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/c/file3.ts SVC-3-0 "let z = 4;"


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject8*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/home/src/Vscode/Projects/bin",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject8*",
      "files": [
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject8*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject8*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 23,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 5
    projectProgramVersion: 4
/dev/null/inferredProject7* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject8* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *changed*
    version: Text-3
    containingProjects: 2 *changed*
        /dev/null/inferredProject7*
        /dev/null/inferredProject8* *new*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject7* *default*
/user/username/projects/project/c/file3.ts (Open) *new*
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject8* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts"
      },
      "seq": 24,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 24,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/a/file1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 6 *changed*
    projectProgramVersion: 4
    dirty: true *changed*
/dev/null/inferredProject7* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject8* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-3
    containingProjects: 2
        /dev/null/inferredProject7*
        /dev/null/inferredProject8*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/a/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject7* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject8* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts"
      },
      "seq": 25,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject7*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 25,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts: *new*
  {}
/user/username/projects/project/a/file1.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 6
    projectProgramVersion: 4
    dirty: true
    isOrphan: true *changed*
/dev/null/inferredProject7* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject8* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-3
    containingProjects: 2
        /dev/null/inferredProject7*
        /dev/null/inferredProject8*
/user/username/projects/project/A/file2.ts *changed*
    open: false *changed*
    version: SVC-3-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject7* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject8* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts"
      },
      "seq": 26,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject8*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 26,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 6
    projectProgramVersion: 4
    dirty: true
    isOrphan: true
/dev/null/inferredProject7* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject8* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-3
    containingProjects: 2
        /dev/null/inferredProject7*
        /dev/null/inferredProject8*
/user/username/projects/project/A/file2.ts
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts *changed*
    open: false *changed*
    version: SVC-3-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject7* *deleted*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-3-0
    containingProjects: 1
        /dev/null/inferredProject8* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts"
      },
      "seq": 27,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 27,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 6
    projectProgramVersion: 4
    dirty: true
    isOrphan: true
/dev/null/inferredProject7* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject8* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-3
    containingProjects: 2
        /dev/null/inferredProject7*
        /dev/null/inferredProject8*
/user/username/projects/project/A/file2.ts
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *changed*
    open: false *changed*
    version: SVC-3-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject8* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts",
        "projectRootPath": "/user/username/projects/project/a",
        "fileContent": "let x = 1;",
        "scriptKindName": "JS"
      },
      "seq": 28,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 6 projectProgramVersion: 4 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es6.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/a/file1.ts SVC-1-0 "let x = 1;"


	../../../../../home/src/tslibs/TS/Lib/lib.es6.d.ts
	  Default library for target 'es6'
	file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es6.d.ts",
        "/user/username/projects/project/a/file1.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
      "projectRootPath": "/user/username/projects/project/a",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/a/bower_components",
        "/user/username/projects/project/a/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*"
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject1*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 2,
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
          "allowJs": true,
          "target": 2,
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
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject8*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/c/file3.ts


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject8*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject8*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject8* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject8*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject8* WatchType: Type roots
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject7*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	/user/username/projects/project/b/file2.ts


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject7*'
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject7*",
      "files": []
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject7* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Closing file watchers for project '/dev/null/inferredProject7*' - done.
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject7* WatchType: Type roots
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 28,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

FsWatches *deleted*::
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 6
    projectProgramVersion: 5 *changed*
    dirty: false *changed*
    isOrphan: false *changed*
/dev/null/inferredProject7* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*
/dev/null/inferredProject8* (Inferred) *deleted*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isClosed: true *changed*
    isOrphan: true
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *deleted*
    version: Text-3
    containingProjects: 0 *changed*
        /dev/null/inferredProject7* *deleted*
        /dev/null/inferredProject8* *deleted*
/user/username/projects/project/A/file2.ts *deleted*
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts (Open) *changed*
    open: true *changed*
    version: SVC-1-0
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /dev/null/inferredProject1* *default* *new*
/user/username/projects/project/b/file2.ts *deleted*
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *deleted*
    version: SVC-3-0
    pendingReloadFromDisk: true
    containingProjects: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts",
        "projectRootPath": "/user/username/projects/project/A",
        "fileContent": "let y = 2;",
        "scriptKindName": "JS"
      },
      "seq": 29,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject9*, currentDirectory: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.es2017.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject9* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject9* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/A/file2.ts SVC-4-0 "let y = 2;"


	../../../../../home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
	  Default library for target 'es2017'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject9*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts",
        "/user/username/projects/project/A/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
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
      "projectRootPath": "/user/username/projects/project/A",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/A/bower_components",
        "/user/username/projects/project/A/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject9*",
      "files": [
        "/user/username/projects/project/A/bower_components",
        "/user/username/projects/project/A/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/bower_components 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/A/node_modules 1 undefined Project: /dev/null/inferredProject9* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject9*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 4,
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
        "projectName": "/dev/null/inferredProject9*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 4,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 29,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request
//// [/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts] *Lib*


PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 6
    projectProgramVersion: 5
/dev/null/inferredProject9* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/project/A/file2.ts (Open) *new*
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject9* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts",
        "projectRootPath": "/user/username/projects/project/b",
        "fileContent": "let x = 3;",
        "scriptKindName": "JS"
      },
      "seq": 30,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject10*, currentDirectory: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject10*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject10* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject10* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-4 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/b/file2.ts SVC-4-0 "let x = 3;"


	../../../../../home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	file2.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject10*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/b/file2.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/user/username/projects/project/b",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject10*",
      "files": [
        "/user/username/projects/project/b/bower_components",
        "/user/username/projects/project/b/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject10* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/bower_components 1 undefined Project: /dev/null/inferredProject10* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject10* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/project/b/node_modules 1 undefined Project: /dev/null/inferredProject10* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject10*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject10*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject10*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 30,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 6
    projectProgramVersion: 5
/dev/null/inferredProject10* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *new*
    version: Text-4
    containingProjects: 1
        /dev/null/inferredProject10*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject9* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open) *new*
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject10* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts",
        "fileContent": "let z = 4;",
        "scriptKindName": "JS"
      },
      "seq": 31,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject11*, currentDirectory: /home/src/Vscode/Projects/bin
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject11*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/node_modules/@types 1 undefined Project: /dev/null/inferredProject11* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject11* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts Text-4 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/project/c/file3.ts SVC-4-0 "let z = 4;"


	../../../tslibs/TS/Lib/lib.esnext.full.d.ts
	  Default library for target 'esnext'
	../../../../../user/username/projects/project/c/file3.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject11*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts",
        "/user/username/projects/project/c/file3.ts"
      ],
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
      "projectRootPath": "/home/src/Vscode/Projects/bin",
      "kind": "discover"
    }
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
      "projectName": "/dev/null/inferredProject11*",
      "files": [
        "/home/src/Vscode/Projects/bin/bower_components",
        "/home/src/Vscode/Projects/bin/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject11* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/bower_components 1 undefined Project: /dev/null/inferredProject11* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject11* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/Vscode/Projects/bin/node_modules 1 undefined Project: /dev/null/inferredProject11* WatchType: Directory location for typing installer
TI:: [hh:mm:ss:mss] Sending response:
    {
      "projectName": "/dev/null/inferredProject11*",
      "typeAcquisition": {
        "enable": true,
        "include": [],
        "exclude": []
      },
      "compilerOptions": {
        "allowJs": true,
        "target": 99,
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
        "projectName": "/dev/null/inferredProject11*",
        "typeAcquisition": {
          "enable": true,
          "include": [],
          "exclude": []
        },
        "compilerOptions": {
          "allowJs": true,
          "target": 99,
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
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/a/file1.ts ProjectRootPath: /user/username/projects/project/a
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject10*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject11*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 31,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 6
    projectProgramVersion: 5
/dev/null/inferredProject10* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject11* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts *changed*
    version: Text-4
    containingProjects: 2 *changed*
        /dev/null/inferredProject10*
        /dev/null/inferredProject11* *new*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject9* *default*
/user/username/projects/project/a/file1.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject10* *default*
/user/username/projects/project/c/file3.ts (Open) *new*
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject11* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/a/file1.ts"
      },
      "seq": 32,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/a/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/a/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/A/file2.ts ProjectRootPath: /user/username/projects/project/A
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject9*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject10*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject11*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 32,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/a/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/a/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/a/file1.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 7 *changed*
    projectProgramVersion: 5
    dirty: true *changed*
    isOrphan: true *changed*
/dev/null/inferredProject10* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject11* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-4
    containingProjects: 2
        /dev/null/inferredProject10*
        /dev/null/inferredProject11*
/user/username/projects/project/A/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject9* *default*
/user/username/projects/project/a/file1.ts *changed*
    open: false *changed*
    version: SVC-1-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject10* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject11* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/A/file2.ts"
      },
      "seq": 33,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/A/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/A/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/b/file2.ts ProjectRootPath: /user/username/projects/project/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject10*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject11*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 33,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/A/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/A/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts: *new*
  {}
/user/username/projects/project/a/file1.ts:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 7
    projectProgramVersion: 5
    dirty: true
    isOrphan: true
/dev/null/inferredProject10* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject11* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-4
    containingProjects: 2
        /dev/null/inferredProject10*
        /dev/null/inferredProject11*
/user/username/projects/project/A/file2.ts *changed*
    open: false *changed*
    version: SVC-4-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject9* *deleted*
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject10* *default*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject11* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/b/file2.ts"
      },
      "seq": 34,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/b/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/b/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/project/c/file3.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject11*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 34,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/project/b/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/b/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 7
    projectProgramVersion: 5
    dirty: true
    isOrphan: true
/dev/null/inferredProject10* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject11* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-4
    containingProjects: 2
        /dev/null/inferredProject10*
        /dev/null/inferredProject11*
/user/username/projects/project/A/file2.ts
    version: SVC-4-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts *changed*
    open: false *changed*
    version: SVC-4-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject10* *deleted*
/user/username/projects/project/c/file3.ts (Open)
    version: SVC-4-0
    containingProjects: 1
        /dev/null/inferredProject11* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/project/c/file3.ts"
      },
      "seq": 35,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/c/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/project/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/project/c/file3.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject11*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject9*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject10*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 35,
      "success": true
    }
After request

PolledWatches::
/home/src/Vscode/Projects/bin/bower_components:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules:
  {"pollingInterval":500}
/home/src/Vscode/Projects/bin/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/Projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/Vscode/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/A/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/A/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/a/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/b/bower_components:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules:
  {"pollingInterval":500}
/user/username/projects/project/b/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/project/c/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/c/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/project/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.es6.d.ts:
  {}
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts:
  {}
/user/username/projects/project/A/file2.ts:
  {}
/user/username/projects/project/a/file1.ts:
  {}
/user/username/projects/project/b/file2.ts:
  {}
/user/username/projects/project/c/file3.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 7
    projectProgramVersion: 5
    dirty: true
    isOrphan: true
/dev/null/inferredProject10* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false
/dev/null/inferredProject11* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    isOrphan: true *changed*
    autoImportProviderHost: false
/dev/null/inferredProject9* (Inferred)
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: true
    isOrphan: true
    autoImportProviderHost: false

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.es2017.full.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject9*
/home/src/tslibs/TS/Lib/lib.es6.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
    version: Text-4
    containingProjects: 2
        /dev/null/inferredProject10*
        /dev/null/inferredProject11*
/user/username/projects/project/A/file2.ts
    version: SVC-4-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/a/file1.ts
    version: SVC-1-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/b/file2.ts
    version: SVC-4-0
    pendingReloadFromDisk: true
    containingProjects: 0
/user/username/projects/project/c/file3.ts *changed*
    open: false *changed*
    version: SVC-4-0
    pendingReloadFromDisk: true *changed*
    containingProjects: 0 *changed*
        /dev/null/inferredProject11* *deleted*
