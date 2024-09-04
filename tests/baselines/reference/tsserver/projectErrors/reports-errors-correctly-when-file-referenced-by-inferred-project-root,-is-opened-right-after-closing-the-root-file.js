Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/projects/myproject/src/client/app.js]


//// [/user/username/projects/myproject/src/server/utilities.js]
function getHostName() { return "hello"; } export { getHostName };

//// [/user/username/projects/myproject/test/backend/index.js]
import { getHostName } from '../../src/server/utilities';export default getHostName;

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
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/client/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/projects/myproject/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/src/client/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/src/client/app.js (Open) *new*
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
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/myproject/src/client/app.js"
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
      "projectRootPath": "/user/username/projects/myproject",
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
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
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
/user/username/projects/myproject/bower_components: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src: *new*
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
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject:: Result: undefined
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""
	/user/username/projects/myproject/src/server/utilities.js Text-1 "function getHostName() { return \"hello\"; } export { getHostName };"
	/user/username/projects/myproject/test/backend/index.js SVC-1-0 "import { getHostName } from '../../src/server/utilities';export default getHostName;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Imported via '../../src/server/utilities' from file 'test/backend/index.js'
	test/backend/index.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/myproject/src/client/app.js",
        "/user/username/projects/myproject/src/server/utilities.js",
        "/user/username/projects/myproject/test/backend/index.js"
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
      "projectRootPath": "/user/username/projects/myproject",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/src/server/bower_components",
        "/user/username/projects/myproject/src/server/node_modules",
        "/user/username/projects/myproject/test/backend/bower_components",
        "/user/username/projects/myproject/test/backend/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/src/server/bower_components",
        "/user/username/projects/myproject/src/server/node_modules",
        "/user/username/projects/myproject/test/backend/bower_components",
        "/user/username/projects/myproject/test/backend/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/test/backend/index.js ProjectRootPath: /user/username/projects/myproject
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
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 2 *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/src/client/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/myproject/src/server/utilities.js *new*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/test/backend/index.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/test/backend/index.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 3,
      "type": "request"
    }
After request

Timeout callback:: count: 1
1: checkOne *new*

Before running Timeout callback:: count: 1
1: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
1: semanticCheck *new*

Before running Immedidate callback:: count: 1
1: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
2: suggestionCheck *new*

Before running Immedidate callback:: count: 1
2: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/user/username/projects/myproject/test/backend/index.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 0

Timeout callback:: count: 1
2: checkOne *new*

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
3: semanticCheck *new*

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
4: suggestionCheck *new*

Before running Immedidate callback:: count: 1
4: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 3,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/user/username/projects/myproject/test/backend/index.js"
            },
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/user/username/projects/myproject/src/client/app.js"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/username/projects/myproject/test/backend/index.js"
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "close",
      "request_seq": 4,
      "success": true
    }
After request

PolledWatches::
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/test/backend/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/backend/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/test/tsconfig.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/test:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/src/client/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/myproject/src/server/utilities.js
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/test/backend/index.js *changed*
    open: false *changed*
    version: SVC-1-0
    containingProjects: 0 *changed*
        /dev/null/inferredProject1* *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "projectRootPath": "/user/username/projects/myproject"
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src/server/utilities.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject:: Result: undefined
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/src 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/myproject/src/client/app.js"
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
      "projectRootPath": "/user/username/projects/myproject",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/projects/myproject/src/client/app.js SVC-1-0 ""
	/user/username/projects/myproject/src/server/utilities.js Text-1 "function getHostName() { return \"hello\"; } export { getHostName };"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/client/app.js
	  Root file specified for compilation
	src/server/utilities.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/home/src/tslibs/TS/Lib/lib.d.ts",
        "/user/username/projects/myproject/src/client/app.js",
        "/user/username/projects/myproject/src/server/utilities.js"
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
      "projectRootPath": "/user/username/projects/myproject",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/src/server/bower_components",
        "/user/username/projects/myproject/src/server/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/projects/myproject/src/client/bower_components",
        "/user/username/projects/myproject/src/client/node_modules",
        "/user/username/projects/myproject/src/server/bower_components",
        "/user/username/projects/myproject/src/server/node_modules",
        "/user/username/projects/myproject/bower_components",
        "/user/username/projects/myproject/node_modules"
      ]
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
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/projects/myproject/test/backend/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (3)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/client/app.js ProjectRootPath: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/projects/myproject/src/server/utilities.js ProjectRootPath: /user/username/projects/myproject
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
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

PolledWatches::
/user/username/projects/myproject/bower_components:
  {"pollingInterval":500}
/user/username/projects/myproject/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/src/client/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/client/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/jsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/server/tsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/src/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/tsconfig.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/src/server/utilities.js:
  {}
/user/username/projects/myproject/test/backend/index.js:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/src:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/myproject/test:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1*
/user/username/projects/myproject/src/client/app.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/myproject/src/server/utilities.js (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/projects/myproject/test/backend/index.js *deleted*
    version: SVC-1-0
    containingProjects: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/user/username/projects/myproject/src/server/utilities.js",
          "/user/username/projects/myproject/src/client/app.js"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
5: semanticCheck *new*

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
6: suggestionCheck *new*

Before running Immedidate callback:: count: 1
6: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/server/utilities.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 0

Timeout callback:: count: 1
4: checkOne *new*

Before running Timeout callback:: count: 1
4: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
7: semanticCheck *new*

Before running Immedidate callback:: count: 1
7: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
8: suggestionCheck *new*

Before running Immedidate callback:: count: 1
8: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/user/username/projects/myproject/src/client/app.js",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 6,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/user/username/projects/myproject/src/server/utilities.js"
            },
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/user/username/projects/myproject/src/client/app.js"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
