Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/c/3/c-impl/c/src/c.ts] Inode:: 9
export const c: string = 'test';

//// [/home/src/projects/c/3/c-impl/c/src/index.ts] Inode:: 10
export * from './c';

//// [/home/src/projects/c/3/c-impl/c/tsconfig.json] Inode:: 11
{
  "compilerOptions": {
    "outDir": "lib",
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/c/3/c-impl/c/package.json] Inode:: 12
{
  "name": "c",
  "version": "1.0.0",
  "types": "./lib/index.d.ts"
}

//// [/home/src/projects/c/4/unrelated/somefile.ts] Inode:: 15
export const a: string = 'test';

//// [/home/src/projects/a/1/a-impl/a/src/a.ts] Inode:: 21
export const a: string = 'test';

//// [/home/src/projects/a/1/a-impl/a/src/index.ts] Inode:: 22
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/tsconfig.json] Inode:: 23
{
  "compilerOptions": {
    "outDir": "lib",
    "declaration": true
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/a/1/a-impl/a/package.json] Inode:: 24
{
  "name": "a",
  "version": "1.0.0",
  "types": "./lib/index.d.ts"
}

//// [/home/src/projects/a/1/a-impl/a/node_modules/c] symlink(/home/src/projects/c/3/c-impl/c) Inode:: 26

//// [/home/src/projects/a/2/unrelated/somefile.ts] Inode:: 29
export const a: string = 'test';

//// [/home/src/projects/b/2/b-impl/b/src/index.ts] Inode:: 35
import { a } from 'a';

//// [/home/src/projects/b/2/b-impl/b/tsconfig.json] Inode:: 36
{
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": [
    "src/**/*.ts"
  ]
}

//// [/home/src/projects/b/2/b-impl/b/node_modules/a] symlink(/home/src/projects/a/1/a-impl/a) Inode:: 38

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 45
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined:: Result: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/b/2/b-impl/b/tsconfig.json, currentDirectory: /home/src/projects/b/2/b-impl/b
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/tsconfig.json 2000 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/b/2/b-impl/b/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/b/2/b-impl/b/src/index.ts"
 ],
 "options": {
  "outDir": "/home/src/projects/b/2/b-impl/b/lib",
  "configFilePath": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/projects/b/2/b-impl/b/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/projects/b/2/b-impl/b/src/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Config: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Config: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/src 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/package.json 2000 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/b/2/b-impl/b/src/index.ts SVC-1-0 "import { a } from 'a';"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/index.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/projects/b/2/b-impl/b/tsconfig.json"
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
          "projectId": "47a3eee7f422b3d80e72e793e496e03bfb4a45660dbd7d183c5ec9dc07f2bcd2",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 22,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 413,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "outDir": ""
          },
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
        "triggerFile": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "configFile": "/home/src/projects/b/2/b-impl/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
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
/home/src/projects/b/2/b-impl/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a: *new*
  {"inode":19}
/home/src/projects/a/1/a-impl/a/node_modules: *new*
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json: *new*
  {"inode":24}
/home/src/projects/a/1/a-impl/a/src: *new*
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules: *new*
  {"inode":37}
/home/src/projects/b/2/b-impl/b/node_modules/a: *new*
  {"inode":19}
/home/src/projects/b/2/b-impl/b/src: *new*
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json: *new*
  {"inode":36}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"inode":45}

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/b/2/b-impl/b/src/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 2,
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 19
            },
            "end": {
              "line": 1,
              "offset": 22
            },
            "text": "Cannot find module 'a' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 2,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

change in unrelated folder in a
Before running Timeout callback:: count: 0
//// [/home/src/projects/a/2/unrelated/somethingUnrelated.ts] Inode:: 143
export const a = 10;


After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 3,
      "type": "request"
    }
After request

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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 19
            },
            "end": {
              "line": 1,
              "offset": 22
            },
            "text": "Cannot find module 'a' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
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
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

change in unrelated folder in c
Before running Timeout callback:: count: 0
//// [/home/src/projects/c/4/unrelated/somethingUnrelated.ts] Inode:: 144
export const a = 10;


After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 4,
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 19
            },
            "end": {
              "line": 1,
              "offset": 22
            },
            "text": "Cannot find module 'a' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 4,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Build dependencies
Before running Timeout callback:: count: 1
5: timerToUpdateChildWatches
//// [/home/src/projects/c/3/c-impl/c/lib/c.js] Inode:: 146
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 'test';


//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts] Inode:: 147
export declare const c: string;


//// [/home/src/projects/c/3/c-impl/c/lib/index.js] Inode:: 148
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./c"), exports);


//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts] Inode:: 149
export * from './c';


//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo] Inode:: 150
{"root":["../src/c.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt] Inode:: 151
{
  "root": [
    "../src/c.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}

//// [/home/src/projects/a/1/a-impl/a/lib/a.js] Inode:: 153
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 'test';


//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts] Inode:: 154
export declare const a: string;


//// [/home/src/projects/a/1/a-impl/a/lib/index.js] Inode:: 155
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./a"), exports);
__exportStar(require("c"), exports);


//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts] Inode:: 156
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo] Inode:: 157
{"root":["../src/a.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt] Inode:: 158
{
  "root": [
    "../src/a.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}


Timeout callback:: count: 1
5: timerToUpdateChildWatches *new*

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
After running Timeout callback:: count: 1

PolledWatches::
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a:
  {"inode":19}
/home/src/projects/a/1/a-impl/a/lib: *new*
  {"inode":152}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/a/1/a-impl/a/src:
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {"inode":19}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

Timeout callback:: count: 1
7: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation *new*

Before running Timeout callback:: count: 1
7: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
8: /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
9: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

Before running Timeout callback:: count: 2
8: /home/src/projects/b/2/b-impl/b/tsconfig.json
9: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/a/1/a-impl/a/lib/a.d.ts Text-1 "export declare const a: string;\n"
	/home/src/projects/c/3/c-impl/c/lib/c.d.ts Text-1 "export declare const c: string;\n"
	/home/src/projects/c/3/c-impl/c/lib/index.d.ts Text-1 "export * from './c';\n"
	/home/src/projects/a/1/a-impl/a/lib/index.d.ts Text-1 "export * from './a';\nexport * from 'c';\n"
	/home/src/projects/b/2/b-impl/b/src/index.ts SVC-1-0 "import { a } from 'a';"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../a/1/a-impl/a/lib/a.d.ts
	  Imported via './a' from file '../../../../a/1/a-impl/a/lib/index.d.ts'
	../../../../c/3/c-impl/c/lib/c.d.ts
	  Imported via './c' from file '../../../../c/3/c-impl/c/lib/index.d.ts'
	../../../../c/3/c-impl/c/lib/index.d.ts
	  Imported via 'c' from file '../../../../a/1/a-impl/a/lib/index.d.ts' with packageId 'c/lib/index.d.ts@1.0.0'
	../../../../a/1/a-impl/a/lib/index.d.ts
	  Imported via 'a' from file 'src/index.ts' with packageId 'a/lib/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/b/2/b-impl/b/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/lib:
  {"inode":152}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts: *new*
  {"inode":154}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts: *new*
  {"inode":156}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/projects/c/3/c-impl/c/lib: *new*
  {"inode":145}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts: *new*
  {"inode":147}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts: *new*
  {"inode":149}
/home/src/projects/c/3/c-impl/c/package.json: *new*
  {"inode":12}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

FsWatches *deleted*::
/home/src/projects/a/1/a-impl/a:
  {"inode":19}
/home/src/projects/a/1/a-impl/a/src:
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {"inode":19}

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    autoImportProviderHost: undefined *changed*

ScriptInfos::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json
/home/src/projects/a/1/a-impl/a/lib/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json
/home/src/projects/b/2/b-impl/b/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json *default*
/home/src/projects/c/3/c-impl/c/lib/c.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json
/home/src/projects/c/3/c-impl/c/lib/index.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 5,
      "type": "request"
    }
After request

Timeout callback:: count: 1
10: checkOne *new*

Before running Timeout callback:: count: 1
10: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
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
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 5,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

change in unrelated folder in a
Before running Timeout callback:: count: 0
//// [/home/src/projects/a/2/unrelated/anotherFile.ts] Inode:: 159
export const a = 10;


After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 1
11: checkOne *new*

Before running Timeout callback:: count: 1
11: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
9: semanticCheck *new*

Before running Immedidate callback:: count: 1
9: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
10: suggestionCheck *new*

Before running Immedidate callback:: count: 1
10: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
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
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

change in unrelated folder in c
Before running Timeout callback:: count: 0
//// [/home/src/projects/c/4/unrelated/anotherFile.ts] Inode:: 160
export const a = 10;


After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 7,
      "type": "request"
    }
After request

Timeout callback:: count: 1
12: checkOne *new*

Before running Timeout callback:: count: 1
12: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
11: semanticCheck *new*

Before running Immedidate callback:: count: 1
11: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
12: suggestionCheck *new*

Before running Immedidate callback:: count: 1
12: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 7,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Clean dependencies build
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.js :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.js :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 2:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.js :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.js :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib :: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.js :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.js :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 2:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.js :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.js :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib :: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Before running Timeout callback:: count: 3
28: /home/src/projects/b/2/b-impl/b/tsconfig.json
29: *ensureProjectForOpenFiles*
34: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
//// [/home/src/projects/c/3/c-impl/c/lib/c.js] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/index.js] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo] deleted
//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/a.js] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/index.js] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo] deleted
//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt] deleted

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib: *new*
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts: *new*
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib: *new*
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts: *new*
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/projects/c/3/c-impl/c/package.json:
  {"inode":12}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

FsWatches *deleted*::
/home/src/projects/a/1/a-impl/a/lib:
  {"inode":152}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {"inode":154}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {"inode":156}
/home/src/projects/c/3/c-impl/c/lib:
  {"inode":145}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {"inode":147}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {"inode":149}

Timeout callback:: count: 3
28: /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
29: *ensureProjectForOpenFiles* *new*
34: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation *new*

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 2
    dirty: true *changed*

ScriptInfos::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *deleted*
/home/src/projects/a/1/a-impl/a/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *deleted*
/home/src/projects/b/2/b-impl/b/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json *default*
/home/src/projects/c/3/c-impl/c/lib/c.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *deleted*
/home/src/projects/c/3/c-impl/c/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true *changed*
    deferredDelete: true *changed*
    containingProjects: 0 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *deleted*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json projectStateVersion: 3 projectProgramVersion: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/b/2/b-impl/b/src/index.ts SVC-1-0 "import { a } from 'a';"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	src/index.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (2)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/b/2/b-impl/b/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {"pollingInterval":500}
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/a/1/a-impl/a/lib:
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/node_modules:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a: *new*
  {"inode":19}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/a/1/a-impl/a/src: *new*
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/node_modules/a: *new*
  {"inode":19}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

FsWatches *deleted*::
/home/src/projects/c/3/c-impl/c/package.json:
  {"inode":12}

Timeout callback:: count: 0
34: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation *deleted*

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 3 *changed*
    dirty: false *changed*

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 8,
      "type": "request"
    }
After request

Timeout callback:: count: 1
35: checkOne *new*

Before running Timeout callback:: count: 1
35: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
13: semanticCheck *new*

Before running Immedidate callback:: count: 1
13: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 19
            },
            "end": {
              "line": 1,
              "offset": 22
            },
            "text": "Cannot find module 'a' or its corresponding type declarations.",
            "code": 2307,
            "category": "error"
          }
        ]
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
14: suggestionCheck *new*

Before running Immedidate callback:: count: 1
14: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 8,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Build dependencies
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/c.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/c.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/c/3/c-impl/c/lib/index.d.ts 0:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/a.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/a.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/a/1/a-impl/a/lib/index.d.ts 0:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/index.d.ts 500 undefined WatchType: Closed Script info
Before running Timeout callback:: count: 1
37: timerToUpdateChildWatches
//// [/home/src/projects/c/3/c-impl/c/lib/c.js] Inode:: 162
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 'test';


//// [/home/src/projects/c/3/c-impl/c/lib/c.d.ts] Inode:: 163
export declare const c: string;


//// [/home/src/projects/c/3/c-impl/c/lib/index.js] Inode:: 164
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./c"), exports);


//// [/home/src/projects/c/3/c-impl/c/lib/index.d.ts] Inode:: 165
export * from './c';


//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo] Inode:: 166
{"root":["../src/c.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/c/3/c-impl/c/lib/tsconfig.tsbuildinfo.readable.baseline.txt] Inode:: 167
{
  "root": [
    "../src/c.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}

//// [/home/src/projects/a/1/a-impl/a/lib/a.js] Inode:: 169
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 'test';


//// [/home/src/projects/a/1/a-impl/a/lib/a.d.ts] Inode:: 170
export declare const a: string;


//// [/home/src/projects/a/1/a-impl/a/lib/index.js] Inode:: 171
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./a"), exports);
__exportStar(require("c"), exports);


//// [/home/src/projects/a/1/a-impl/a/lib/index.d.ts] Inode:: 172
export * from './a';
export * from 'c';


//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo] Inode:: 173
{"root":["../src/a.ts","../src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/a/1/a-impl/a/lib/tsconfig.tsbuildinfo.readable.baseline.txt] Inode:: 174
{
  "root": [
    "../src/a.ts",
    "../src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 68
}


PolledWatches::
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {"pollingInterval":500}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {"pollingInterval":500}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a:
  {"inode":19}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts: *new*
  {"inode":170}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts: *new*
  {"inode":172}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/a/1/a-impl/a/src:
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {"inode":19}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts: *new*
  {"inode":163}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts: *new*
  {"inode":165}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

Timeout callback:: count: 1
37: timerToUpdateChildWatches *new*

ScriptInfos::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/a/1/a-impl/a/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/b/2/b-impl/b/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json *default*
/home/src/projects/c/3/c-impl/c/lib/c.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/projects/c/3/c-impl/c/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: true
    deferredDelete: undefined *changed*
    containingProjects: 0
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json

Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation, Cancelled earlier one
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Triggered with /home/src/projects/b/2/b-impl/b/node_modules/a :: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
After running Timeout callback:: count: 1

PolledWatches::
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a:
  {"inode":19}
/home/src/projects/a/1/a-impl/a/lib: *new*
  {"inode":168}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {"inode":170}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {"inode":172}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/a/1/a-impl/a/src:
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {"inode":19}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {"inode":163}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {"inode":165}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

Timeout callback:: count: 1
39: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation *new*

Before running Timeout callback:: count: 1
39: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/b/2/b-impl/b/tsconfig.jsonFailedLookupInvalidation
Info seq  [hh:mm:ss:mss] Scheduled: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Scheduled: *ensureProjectForOpenFiles*
After running Timeout callback:: count: 2

Timeout callback:: count: 2
40: /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
41: *ensureProjectForOpenFiles* *new*

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 3
    dirty: true *changed*

Before running Timeout callback:: count: 2
40: /home/src/projects/b/2/b-impl/b/tsconfig.json
41: *ensureProjectForOpenFiles*

Info seq  [hh:mm:ss:mss] Running: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/lib 0 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/lib/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/a/1/a-impl/a/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/c/3/c-impl/c/package.json 2000 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/b/node_modules/a 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/b-impl/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/2/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/b/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /home/src/projects/node_modules 1 undefined Project: /home/src/projects/b/2/b-impl/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/b/2/b-impl/b/tsconfig.json projectStateVersion: 4 projectProgramVersion: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/a/1/a-impl/a/lib/a.d.ts Text-1 "export declare const a: string;\n"
	/home/src/projects/c/3/c-impl/c/lib/c.d.ts Text-1 "export declare const c: string;\n"
	/home/src/projects/c/3/c-impl/c/lib/index.d.ts Text-1 "export * from './c';\n"
	/home/src/projects/a/1/a-impl/a/lib/index.d.ts Text-1 "export * from './a';\nexport * from 'c';\n"
	/home/src/projects/b/2/b-impl/b/src/index.ts SVC-1-0 "import { a } from 'a';"


	../../../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../../a/1/a-impl/a/lib/a.d.ts
	  Imported via './a' from file '../../../../a/1/a-impl/a/lib/index.d.ts'
	../../../../c/3/c-impl/c/lib/c.d.ts
	  Imported via './c' from file '../../../../c/3/c-impl/c/lib/index.d.ts'
	../../../../c/3/c-impl/c/lib/index.d.ts
	  Imported via 'c' from file '../../../../a/1/a-impl/a/lib/index.d.ts' with packageId 'c/lib/index.d.ts@1.0.0'
	../../../../a/1/a-impl/a/lib/index.d.ts
	  Imported via 'a' from file 'src/index.ts' with packageId 'a/lib/index.d.ts@1.0.0'
	src/index.ts
	  Matched by include pattern 'src/**/*.ts' in 'tsconfig.json'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Running: *ensureProjectForOpenFiles*
Info seq  [hh:mm:ss:mss] Before ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] After ensureProjectForOpenFiles:
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/b/2/b-impl/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/b/2/b-impl/b/src/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/projects/b/2/b-impl/b/tsconfig.json
Info seq  [hh:mm:ss:mss] got projects updated in background /home/src/projects/b/2/b-impl/b/src/index.ts
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectsUpdatedInBackground",
      "body": {
        "openFiles": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      }
    }
After running Timeout callback:: count: 0

PolledWatches::
/home/src/projects/a/1/a-impl/a/lib/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/b-impl/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/b/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/home/src/projects/b/2/b-impl/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/2/node_modules:
  {"pollingInterval":500}
/home/src/projects/b/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/1/a-impl/a/lib:
  {"inode":168}
/home/src/projects/a/1/a-impl/a/lib/a.d.ts:
  {"inode":170}
/home/src/projects/a/1/a-impl/a/lib/index.d.ts:
  {"inode":172}
/home/src/projects/a/1/a-impl/a/node_modules:
  {"inode":25}
/home/src/projects/a/1/a-impl/a/package.json:
  {"inode":24}
/home/src/projects/b/2/b-impl/b/node_modules:
  {"inode":37}
/home/src/projects/b/2/b-impl/b/src:
  {"inode":34}
/home/src/projects/b/2/b-impl/b/tsconfig.json:
  {"inode":36}
/home/src/projects/c/3/c-impl/c/lib: *new*
  {"inode":161}
/home/src/projects/c/3/c-impl/c/lib/c.d.ts:
  {"inode":163}
/home/src/projects/c/3/c-impl/c/lib/index.d.ts:
  {"inode":165}
/home/src/projects/c/3/c-impl/c/package.json: *new*
  {"inode":12}
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"inode":45}

FsWatches *deleted*::
/home/src/projects/a/1/a-impl/a:
  {"inode":19}
/home/src/projects/a/1/a-impl/a/src:
  {"inode":20}
/home/src/projects/b/2/b-impl/b/node_modules/a:
  {"inode":19}

Projects::
/home/src/projects/b/2/b-impl/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 4 *changed*
    dirty: false *changed*

ScriptInfos::
/home/src/projects/a/1/a-impl/a/lib/a.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
/home/src/projects/a/1/a-impl/a/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
/home/src/projects/b/2/b-impl/b/src/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json *default*
/home/src/projects/c/3/c-impl/c/lib/c.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
/home/src/projects/c/3/c-impl/c/lib/index.d.ts *changed*
    version: Text-1
    pendingReloadFromDisk: false *changed*
    containingProjects: 1 *changed*
        /home/src/projects/b/2/b-impl/b/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/b/2/b-impl/b/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/b/2/b-impl/b/src/index.ts"
        ]
      },
      "seq": 9,
      "type": "request"
    }
After request

Timeout callback:: count: 1
42: checkOne *new*

Before running Timeout callback:: count: 1
42: checkOne

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
15: semanticCheck *new*

Before running Immedidate callback:: count: 1
15: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": []
      }
    }
After running Immedidate callback:: count: 1

Immedidate callback:: count: 1
16: suggestionCheck *new*

Before running Immedidate callback:: count: 1
16: suggestionCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "suggestionDiag",
      "body": {
        "file": "/home/src/projects/b/2/b-impl/b/src/index.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 23
            },
            "text": "'a' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "requestCompleted",
      "body": {
        "request_seq": 9,
        "performanceData": {
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/b/2/b-impl/b/src/index.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
