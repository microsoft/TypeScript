Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/user/username/workspace/projects/tsconfig.json]
{
  "include": [
    "**/*"
  ]
}

//// [/user/username/workspace/projects/project/tsconfig.json]
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "importHelpers": true
  }
}

//// [/user/username/workspace/projects/project/type.ts]

export type Foo {
    bar: number;
};

//// [/user/username/workspace/projects/project/file1.ts]

import { Foo } from "./type";
const a: Foo = { bar : 1 };
a.bar;

//// [/user/username/workspace/projects/project/file2.ts]

import { Foo } from "./type";
const a: Foo = { bar : 2 };
a.bar;

//// [/user/username/workspace/projects/file3.js]
console.log('noop');

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
        "file": "/user/username/workspace/projects/file3.js"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/workspace/projects/file3.js ProjectRootPath: undefined:: Result: /user/username/workspace/projects/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/workspace/projects/tsconfig.json, currentDirectory: /user/username/workspace/projects
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/tsconfig.json 2000 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/workspace/projects/tsconfig.json : {
 "rootNames": [
  "/user/username/workspace/projects/project/file1.ts",
  "/user/username/workspace/projects/project/file2.ts",
  "/user/username/workspace/projects/project/type.ts"
 ],
 "options": {
  "configFilePath": "/user/username/workspace/projects/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/workspace/projects/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/workspace/projects/file3.js to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/file2.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/type.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/workspace/projects/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/workspace/projects/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/workspace/projects/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/workspace/projects/project/type.ts Text-1 "\nexport type Foo {\n    bar: number;\n};"
	/user/username/workspace/projects/project/file1.ts Text-1 "\nimport { Foo } from \"./type\";\nconst a: Foo = { bar : 1 };\na.bar;"
	/user/username/workspace/projects/project/file2.ts Text-1 "\nimport { Foo } from \"./type\";\nconst a: Foo = { bar : 2 };\na.bar;"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	project/type.ts
	  Imported via "./type" from file 'project/file1.ts'
	  Imported via "./type" from file 'project/file2.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	project/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	project/file2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/workspace/projects/tsconfig.json"
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
          "projectId": "63321821a44120b7e9b36bb15dc7f2f73cc88fc4ee4b7b33d1a4a6b1af5b6e3c",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 168,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
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
          "include": true,
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
        "triggerFile": "/user/username/workspace/projects/file3.js",
        "configFile": "/user/username/workspace/projects/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/workspace/projects/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Creating InferredProject: /dev/null/inferredProject1*, currentDirectory: /user/username/workspace/projects
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/workspace/projects/file3.js SVC-1-0 "console.log('noop');"


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	file3.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
TI:: Creating typing installer

PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/projects/jsconfig.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/projects/project/file1.ts: *new*
  {}
/user/username/workspace/projects/project/file2.ts: *new*
  {}
/user/username/workspace/projects/project/type.ts: *new*
  {}
/user/username/workspace/projects/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/projects: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
/user/username/workspace/projects/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /user/username/workspace/projects/tsconfig.json
        /dev/null/inferredProject1*
/user/username/workspace/projects/file3.js (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/workspace/projects/project/file1.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/workspace/projects/tsconfig.json
/user/username/workspace/projects/project/file2.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/workspace/projects/tsconfig.json
/user/username/workspace/projects/project/type.ts *new*
    version: Text-1
    containingProjects: 1
        /user/username/workspace/projects/tsconfig.json

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
        "/user/username/workspace/projects/file3.js"
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
      "projectRootPath": "/user/username/workspace/projects",
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
        "/user/username/workspace/projects/bower_components",
        "/user/username/workspace/projects/node_modules"
      ]
    }
TI:: [hh:mm:ss:mss] Sending response:
    {
      "kind": "action::watchTypingLocations",
      "projectName": "/dev/null/inferredProject1*",
      "files": [
        "/user/username/workspace/projects/bower_components",
        "/user/username/workspace/projects/node_modules"
      ]
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/bower_components 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Directory location for typing installer
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
Info seq  [hh:mm:ss:mss] Project '/user/username/workspace/projects/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/workspace/projects/file3.js ProjectRootPath: undefined
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
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/bower_components: *new*
  {"pollingInterval":500}
/user/username/workspace/projects/jsconfig.json:
  {"pollingInterval":2000}
/user/username/workspace/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/workspace/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/projects/project/file1.ts:
  {}
/user/username/workspace/projects/project/file2.ts:
  {}
/user/username/workspace/projects/project/type.ts:
  {}
/user/username/workspace/projects/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/workspace/projects:
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    autoImportProviderHost: false *changed*
/user/username/workspace/projects/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/username/workspace/projects/project/file1.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/username/workspace/projects/project/file1.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /user/username/workspace/projects/project/file1.ts ProjectRootPath: undefined:: Result: /user/username/workspace/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /user/username/workspace/projects/project/tsconfig.json, currentDirectory: /user/username/workspace/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/tsconfig.json 2000 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/username/workspace/projects/project/tsconfig.json : {
 "rootNames": [
  "/user/username/workspace/projects/project/file1.ts",
  "/user/username/workspace/projects/project/file2.ts",
  "/user/username/workspace/projects/project/type.ts"
 ],
 "options": {
  "importHelpers": true,
  "configFilePath": "/user/username/workspace/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/tsconfig.json 2000 undefined Config: /user/username/workspace/projects/project/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/user/username/workspace/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /user/username/workspace/projects/project/file1.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/workspace/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/workspace/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/workspace/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/user/username/workspace/projects/project/type.ts Text-1 "\nexport type Foo {\n    bar: number;\n};"
	/user/username/workspace/projects/project/file1.ts Text-1 "\nimport { Foo } from \"./type\";\nconst a: Foo = { bar : 1 };\na.bar;"
	/user/username/workspace/projects/project/file2.ts Text-1 "\nimport { Foo } from \"./type\";\nconst a: Foo = { bar : 2 };\na.bar;"


	../../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	type.ts
	  Imported via "./type" from file 'file1.ts'
	  Imported via "./type" from file 'file2.ts'
	  Matched by include pattern '../**/*' in 'tsconfig.json'
	file1.ts
	  Matched by include pattern '../**/*' in 'tsconfig.json'
	file2.ts
	  Matched by include pattern '../**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/user/username/workspace/projects/project/tsconfig.json"
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
          "projectId": "cf7a03727cde5623dddf8c4ece4c949af329f99691dfe7c82fdc6b9a0d6063ae",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 3,
            "tsSize": 168,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "importHelpers": true
          },
          "typeAcquisition": {
            "enable": false,
            "include": false,
            "exclude": false
          },
          "extends": true,
          "files": false,
          "include": true,
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
        "triggerFile": "/user/username/workspace/projects/project/file1.ts",
        "configFile": "/user/username/workspace/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/username/workspace/projects/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts
	/user/username/workspace/projects/project/type.ts
	/user/username/workspace/projects/project/file1.ts
	/user/username/workspace/projects/project/file2.ts


	../../../../home/src/tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	project/type.ts
	  Imported via "./type" from file 'project/file1.ts'
	  Imported via "./type" from file 'project/file2.ts'
	  Matched by include pattern '**/*' in 'tsconfig.json'
	project/file1.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'
	project/file2.ts
	  Matched by include pattern '**/*' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/projects 1 undefined Config: /user/username/workspace/projects/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/projects/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/username/workspace/node_modules/@types 1 undefined Project: /user/username/workspace/projects/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Project '/user/username/workspace/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/workspace/projects/file3.js ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /user/username/workspace/projects/project/file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /user/username/workspace/projects/project/tsconfig.json
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
/user/username/workspace/node_modules: *new*
  {"pollingInterval":500}
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/bower_components:
  {"pollingInterval":500}
/user/username/workspace/projects/jsconfig.json:
  {"pollingInterval":2000}
/user/username/workspace/projects/node_modules:
  {"pollingInterval":500}
/user/username/workspace/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/project/node_modules: *new*
  {"pollingInterval":500}
/user/username/workspace/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/projects/project/file2.ts:
  {}
/user/username/workspace/projects/project/tsconfig.json: *new*
  {}
/user/username/workspace/projects/project/type.ts:
  {}
/user/username/workspace/projects/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/workspace/projects/project/file1.ts:
  {}

FsWatchesRecursive::
/user/username/workspace/projects:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/workspace/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/workspace/projects/tsconfig.json (Configured) *deleted*
    projectStateVersion: 1
    projectProgramVersion: 1
    isClosed: true *changed*
    noOpenRef: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /dev/null/inferredProject1*
        /user/username/workspace/projects/project/tsconfig.json *new*
        /user/username/workspace/projects/tsconfig.json *deleted*
/user/username/workspace/projects/file3.js (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*
/user/username/workspace/projects/project/file1.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /user/username/workspace/projects/project/tsconfig.json *default* *new*
        /user/username/workspace/projects/tsconfig.json *deleted*
/user/username/workspace/projects/project/file2.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /user/username/workspace/projects/project/tsconfig.json *new*
        /user/username/workspace/projects/tsconfig.json *deleted*
/user/username/workspace/projects/project/type.ts *changed*
    version: Text-1
    containingProjects: 1 *changed*
        /user/username/workspace/projects/project/tsconfig.json *new*
        /user/username/workspace/projects/tsconfig.json *deleted*

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/workspace/projects/project/file1.ts",
        "line": 4,
        "offset": 3
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Finding references to /user/username/workspace/projects/project/file1.ts position 61 in project /user/username/workspace/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/workspace/projects/project/type.d.ts 2000 undefined Project: /user/username/workspace/projects/project/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/workspace/projects/project/type.ts",
            "start": {
              "line": 3,
              "offset": 5
            },
            "end": {
              "line": 3,
              "offset": 8
            },
            "contextStart": {
              "line": 3,
              "offset": 5
            },
            "contextEnd": {
              "line": 3,
              "offset": 17
            },
            "lineText": "    bar: number;",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/workspace/projects/project/file1.ts",
            "start": {
              "line": 3,
              "offset": 18
            },
            "end": {
              "line": 3,
              "offset": 21
            },
            "contextStart": {
              "line": 3,
              "offset": 18
            },
            "contextEnd": {
              "line": 3,
              "offset": 25
            },
            "lineText": "const a: Foo = { bar : 1 };",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/workspace/projects/project/file1.ts",
            "start": {
              "line": 4,
              "offset": 3
            },
            "end": {
              "line": 4,
              "offset": 6
            },
            "lineText": "a.bar;",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/workspace/projects/project/file2.ts",
            "start": {
              "line": 3,
              "offset": 18
            },
            "end": {
              "line": 3,
              "offset": 21
            },
            "contextStart": {
              "line": 3,
              "offset": 18
            },
            "contextEnd": {
              "line": 3,
              "offset": 25
            },
            "lineText": "const a: Foo = { bar : 2 };",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/workspace/projects/project/file2.ts",
            "start": {
              "line": 4,
              "offset": 3
            },
            "end": {
              "line": 4,
              "offset": 6
            },
            "lineText": "a.bar;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "bar",
        "symbolStartOffset": 3,
        "symbolDisplayString": "(property) bar: number"
      },
      "responseRequired": true
    }
After request

PolledWatches::
/user/username/workspace/node_modules:
  {"pollingInterval":500}
/user/username/workspace/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/bower_components:
  {"pollingInterval":500}
/user/username/workspace/projects/jsconfig.json:
  {"pollingInterval":2000}
/user/username/workspace/projects/node_modules:
  {"pollingInterval":500}
/user/username/workspace/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/project/node_modules:
  {"pollingInterval":500}
/user/username/workspace/projects/project/node_modules/@types:
  {"pollingInterval":500}
/user/username/workspace/projects/project/type.d.ts: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/workspace/projects/project/file2.ts:
  {}
/user/username/workspace/projects/project/tsconfig.json:
  {}
/user/username/workspace/projects/project/type.ts:
  {}
/user/username/workspace/projects/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/workspace/projects:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/user/username/workspace/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /user/username/workspace/projects/project/type.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
