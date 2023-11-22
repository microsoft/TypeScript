currentDirectory:: / useCaseSensitiveFileNames: true
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
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

//// [/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js]
const x = 10


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js",
        "projectRootPath": "/a/b"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace
Info seq  [hh:mm:ss:mss] For info: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js SVC-1-0 "const x = 10"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	x.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/root/teams/VSCode68/Shared Documents/General/jsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/jsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/tsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/node_modules/@types: *new*
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/tsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/jsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/node_modules/@types: *new*
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/tsconfig.json: *new*
  {"pollingInterval":2000}
/root/teams/VSCode68/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}

TI:: [hh:mm:ss:mss] Global cache location '/a/data', safe file path '/safeList.json', types map path /typesMap.json
TI:: [hh:mm:ss:mss] Processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Trying to find '/a/data/package.json'...
TI:: [hh:mm:ss:mss] Finished processing cache location '/a/data'
TI:: [hh:mm:ss:mss] Npm config file: /a/data/package.json
TI:: [hh:mm:ss:mss] Npm config file: '/a/data/package.json' is missing, creating new one...
TI:: [hh:mm:ss:mss] Updating types-registry npm package...
TI:: [hh:mm:ss:mss] npm install --ignore-scripts types-registry@latest
TI:: [hh:mm:ss:mss] Updated types-registry npm package
TI:: typing installer creation complete
//// [/a/data/package.json]
{ "private": true }

//// [/a/data/node_modules/types-registry/index.json]
{
  "entries": {}
}


TI:: [hh:mm:ss:mss] Got install request
    {
      "projectName": "/dev/null/inferredProject1*",
      "fileNames": [
        "/a/lib/lib.d.ts",
        "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js"
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
      "projectRootPath": "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace",
      "kind": "discover"
    }
TI:: [hh:mm:ss:mss] Failed to load safelist from types map file '/typesMap.json'
TI:: [hh:mm:ss:mss] Explicitly included types: []
TI:: [hh:mm:ss:mss] Inferred typings from unresolved imports: []
TI:: [hh:mm:ss:mss] Finished typings discovery:
    {
      "cachedTypingPaths": [],
      "newTypingNames": [],
      "filesToWatch": [
        "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/bower_components",
        "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/bower_components",
        "/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
Info seq  [hh:mm:ss:mss] 	FileName: /root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js ProjectRootPath: /a/b
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/root/teams/VSCode68/Shared Documents/General/jsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/bower_components: *new*
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/jsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules: *new*
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/node_modules/@types:
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/tsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/General/node_modules/@types:
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/General/tsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/jsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/Shared Documents/node_modules/@types:
  {"pollingInterval":500}
/root/teams/VSCode68/Shared Documents/tsconfig.json:
  {"pollingInterval":2000}
/root/teams/VSCode68/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
