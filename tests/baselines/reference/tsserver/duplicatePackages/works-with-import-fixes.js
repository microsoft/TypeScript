Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/a/node_modules/foo/index.d.ts]
export const foo: number;

//// [/home/src/projects/project/a/node_modules/foo/package.json]
{
  "name": "foo",
  "version": "1.2.3"
}

//// [/home/src/projects/project/b/node_modules/foo/index.d.ts]
export const foo: number;

//// [/home/src/projects/project/b/node_modules/foo/package.json]
{
  "name": "foo",
  "version": "1.2.3"
}

//// [/home/src/projects/project/a/user.ts]
import("foo");
foo

//// [/home/src/projects/project/b/user.ts]
import("foo");
foo

//// [/home/src/projects/project/tsconfig.json]
{}

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
        "file": "/home/src/projects/project/a/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/a/user.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/tsconfig.json, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/a/user.ts",
  "/home/src/projects/project/b/user.ts"
 ],
 "options": {
  "configFilePath": "/home/src/projects/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/project/a/user.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/a 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/a/node_modules/foo/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/b 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/b/node_modules/foo/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/a/node_modules/foo/index.d.ts Text-1 "export const foo: number;"
	/home/src/projects/project/a/user.ts SVC-1-0 "import(\"foo\");\nfoo"
	/home/src/projects/project/b/node_modules/foo/index.d.ts Text-1 "export const foo: number;"
	/home/src/projects/project/b/user.ts Text-1 "import(\"foo\");\nfoo"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	a/node_modules/foo/index.d.ts
	  Imported via "foo" from file 'a/user.ts' with packageId 'foo/index.d.ts@1.2.3'
	a/user.ts
	  Matched by default include pattern '**/*'
	b/node_modules/foo/index.d.ts
	  Imported via "foo" from file 'b/user.ts' with packageId 'foo/index.d.ts@1.2.3'
	  File redirects to file 'a/node_modules/foo/index.d.ts'
	b/user.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/project/tsconfig.json"
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
          "projectId": "1097a5f82e8323ba7aba7567ec06402f7ad4ea74abce44ec5efd223ac77ff169",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 36,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 463,
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
        "triggerFile": "/home/src/projects/project/a/user.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/user.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
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
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/node_modules/foo/package.json: *new*
  {}
/home/src/projects/project/b/node_modules/foo/package.json: *new*
  {}
/home/src/projects/project/b/user.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}
/home/src/projects/project/a: *new*
  {}
/home/src/projects/project/a/node_modules: *new*
  {}
/home/src/projects/project/b: *new*
  {}
/home/src/projects/project/b/node_modules: *new*
  {}

Projects::
/home/src/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/a/node_modules/foo/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/a/user.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/projects/project/b/node_modules/foo/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/b/user.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/home/src/projects/project/b/user.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/project/b/user.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/b/user.ts ProjectRootPath: undefined:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/a/user.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/b/user.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 2,
      "success": true
    }
After request

PolledWatches::
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/a/node_modules/foo/package.json:
  {}
/home/src/projects/project/b/node_modules/foo/package.json:
  {}
/home/src/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}

FsWatches *deleted*::
/home/src/projects/project/b/user.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project:
  {}
/home/src/projects/project/a:
  {}
/home/src/projects/project/a/node_modules:
  {}
/home/src/projects/project/b:
  {}
/home/src/projects/project/b/node_modules:
  {}

ScriptInfos::
/home/src/projects/project/a/node_modules/foo/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/a/user.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/projects/project/b/node_modules/foo/index.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/b/user.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/home/src/projects/project/a/user.ts",
        "startLine": 2,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"foo\"",
          "changes": [
            {
              "fileName": "/home/src/projects/project/a/user.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"foo\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/home/src/projects/project/b/user.ts",
        "startLine": 2,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"foo\"",
          "changes": [
            {
              "fileName": "/home/src/projects/project/b/user.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"foo\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
