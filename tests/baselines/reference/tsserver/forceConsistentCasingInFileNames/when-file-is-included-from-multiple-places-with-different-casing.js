Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
Before request
//// [/home/src/projects/project/src/struct.d.ts]
import * as xs1 from "fp-ts/lib/Struct";
import * as xs2 from "fp-ts/lib/struct";
import * as xs3 from "./Struct";
import * as xs4 from "./struct";


//// [/home/src/projects/project/src/anotherFile.ts]
import * as xs1 from "fp-ts/lib/Struct";
import * as xs2 from "fp-ts/lib/struct";
import * as xs3 from "./Struct";
import * as xs4 from "./struct";


//// [/home/src/projects/project/src/oneMore.ts]
import * as xs1 from "fp-ts/lib/Struct";
import * as xs2 from "fp-ts/lib/struct";
import * as xs3 from "./Struct";
import * as xs4 from "./struct";


//// [/home/src/projects/project/tsconfig.json]
{}

//// [/home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts]
export function foo(): void

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
        "file": "/home/src/projects/project/src/struct.d.ts",
        "projectRootPath": "/home/src/projects/project"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/projects/project/src/struct.d.ts ProjectRootPath: /home/src/projects/project:: Result: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/projects/project/tsconfig.json, currentDirectory: /home/src/projects/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/tsconfig.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/projects/project/tsconfig.json : {
 "rootNames": [
  "/home/src/projects/project/src/anotherFile.ts",
  "/home/src/projects/project/src/oneMore.ts",
  "/home/src/projects/project/src/struct.d.ts"
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
        "reason": "Creating possible configured project for /home/src/projects/project/src/struct.d.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project 1 undefined Config: /home/src/projects/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/src/anotherFile.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/src/oneMore.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/src 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/src 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/fp-ts/lib/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/fp-ts/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/project/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/projects/package.json 2000 undefined Project: /home/src/projects/project/tsconfig.json WatchType: File location affecting resolution
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/project/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/node_modules/@types 1 undefined Project: /home/src/projects/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts Text-1 "export function foo(): void"
	/home/src/projects/project/src/Struct.d.ts SVC-1-0 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/anotherFile.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/oneMore.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"


	../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	node_modules/fp-ts/lib/Struct.d.ts
	  Imported via "fp-ts/lib/Struct" from file 'src/anotherFile.ts'
	  Imported via "fp-ts/lib/struct" from file 'src/anotherFile.ts'
	  Imported via "fp-ts/lib/Struct" from file 'src/Struct.d.ts'
	  Imported via "fp-ts/lib/struct" from file 'src/Struct.d.ts'
	  Imported via "fp-ts/lib/Struct" from file 'src/oneMore.ts'
	  Imported via "fp-ts/lib/struct" from file 'src/oneMore.ts'
	src/Struct.d.ts
	  Imported via "./Struct" from file 'src/anotherFile.ts'
	  Imported via "./Struct" from file 'src/Struct.d.ts'
	  Imported via "./struct" from file 'src/Struct.d.ts'
	  Imported via "./struct" from file 'src/anotherFile.ts'
	  Imported via "./Struct" from file 'src/oneMore.ts'
	  Imported via "./struct" from file 'src/oneMore.ts'
	  Matched by default include pattern '**/*'
	src/anotherFile.ts
	  Matched by default include pattern '**/*'
	src/oneMore.ts
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
            "tsSize": 296,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 3,
            "dtsSize": 588,
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
        "triggerFile": "/home/src/projects/project/src/struct.d.ts",
        "configFile": "/home/src/projects/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/projects/project/src/struct.d.ts ProjectRootPath: /home/src/projects/project
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
/home/src/projects/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/fp-ts/lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/fp-ts/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/home/src/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/src/anotherFile.ts: *new*
  {}
/home/src/projects/project/src/oneMore.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}
/home/src/projects/project/node_modules: *new*
  {}
/home/src/projects/project/src: *new*
  {}

Projects::
/home/src/projects/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/src/struct.d.ts"
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
        "file": "/home/src/projects/project/src/struct.d.ts",
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
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 22
            },
            "end": {
              "line": 2,
              "offset": 40
            },
            "text": "File name '/home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts' differs from already included file name '/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts' only in casing.\n  The file is in the program because:\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/oneMore.ts'",
            "code": 1149,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 2,
                    "offset": 22
                  },
                  "end": {
                    "line": 2,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/Struct.d.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 2,
                    "offset": 22
                  },
                  "end": {
                    "line": 2,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              }
            ]
          },
          {
            "start": {
              "line": 4,
              "offset": 22
            },
            "end": {
              "line": 4,
              "offset": 32
            },
            "text": "File name '/home/src/projects/project/src/struct.d.ts' differs from already included file name '/home/src/projects/project/src/Struct.d.ts' only in casing.\n  The file is in the program because:\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Matched by default include pattern '**/*'",
            "code": 1149,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/Struct.d.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              }
            ]
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
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 41
            },
            "text": "'xs1' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 41
            },
            "text": "'xs2' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 1
            },
            "end": {
              "line": 3,
              "offset": 33
            },
            "text": "'xs3' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 4,
              "offset": 1
            },
            "end": {
              "line": 4,
              "offset": 33
            },
            "text": "'xs4' is declared but its value is never read.",
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
              "file": "/home/src/projects/project/src/struct.d.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/src/struct.d.ts",
            "textChanges": [
              {
                "newText": "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n\nexport const y = 10;",
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 5,
                  "offset": 1
                }
              }
            ]
          }
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open) *changed*
    version: SVC-1-1 *changed*
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "line": 1,
        "offset": 22
      },
      "seq": 4,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts Text-1 "export function foo(): void"
	/home/src/projects/project/src/Struct.d.ts SVC-1-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n\nexport const y = 10;"
	/home/src/projects/project/src/anotherFile.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/oneMore.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts",
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 28
          }
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 2
    projectProgramVersion: 1
    dirty: false *changed*
    documentPositionMappers: 1 *changed*
        /home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts *changed*
    version: Text-1
    sourceMapFilePath: false *changed*
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open)
    version: SVC-1-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/src/struct.d.ts",
            "textChanges": [
              {
                "newText": "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n\nexport const y = 10;\nexport const yy = 10;",
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 6,
                  "offset": 21
                }
              }
            ]
          }
        ]
      },
      "seq": 5,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open) *changed*
    version: SVC-1-2 *changed*
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/src/struct.d.ts"
        ]
      },
      "seq": 6,
      "type": "request"
    }
After request

Timeout callback:: count: 1
2: checkOne *new*

Before running Timeout callback:: count: 1
2: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 3 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts Text-1 "export function foo(): void"
	/home/src/projects/project/src/Struct.d.ts SVC-1-2 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n\nexport const y = 10;\nexport const yy = 10;"
	/home/src/projects/project/src/anotherFile.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/oneMore.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
3: semanticCheck *new*

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 3
    projectProgramVersion: 1
    dirty: false *changed*
    documentPositionMappers: 0 *changed*
        /home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts: identitySourceMapConsumer *deleted*
    autoImportProviderHost: false

Before running Immedidate callback:: count: 1
3: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 22
            },
            "end": {
              "line": 2,
              "offset": 40
            },
            "text": "File name '/home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts' differs from already included file name '/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts' only in casing.\n  The file is in the program because:\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"fp-ts/lib/Struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Imported via \"fp-ts/lib/struct\" from file '/home/src/projects/project/src/oneMore.ts'",
            "code": 1149,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 2,
                    "offset": 22
                  },
                  "end": {
                    "line": 2,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/Struct.d.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 1,
                    "offset": 22
                  },
                  "end": {
                    "line": 1,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 2,
                    "offset": 22
                  },
                  "end": {
                    "line": 2,
                    "offset": 40
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              }
            ]
          },
          {
            "start": {
              "line": 4,
              "offset": 22
            },
            "end": {
              "line": 4,
              "offset": 32
            },
            "text": "File name '/home/src/projects/project/src/struct.d.ts' differs from already included file name '/home/src/projects/project/src/Struct.d.ts' only in casing.\n  The file is in the program because:\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Matched by default include pattern '**/*'",
            "code": 1149,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/Struct.d.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              }
            ]
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
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 41
            },
            "text": "'xs1' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 41
            },
            "text": "'xs2' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 3,
              "offset": 1
            },
            "end": {
              "line": 3,
              "offset": 33
            },
            "text": "'xs3' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 4,
              "offset": 1
            },
            "end": {
              "line": 4,
              "offset": 33
            },
            "text": "'xs4' is declared but its value is never read.",
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
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/src/struct.d.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/src/struct.d.ts",
            "textChanges": [
              {
                "newText": "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\n",
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 7,
                  "offset": 22
                }
              }
            ]
          }
        ]
      },
      "seq": 7,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4 *changed*
    projectProgramVersion: 1
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open) *changed*
    version: SVC-1-3 *changed*
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "definition",
      "arguments": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "line": 1,
        "offset": 22
      },
      "seq": 8,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 4 projectProgramVersion: 1 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts Text-1 "export function foo(): void"
	/home/src/projects/project/src/Struct.d.ts SVC-1-3 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\n"
	/home/src/projects/project/src/anotherFile.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/oneMore.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "file": "/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts",
          "start": {
            "line": 1,
            "offset": 1
          },
          "end": {
            "line": 1,
            "offset": 28
          }
        }
      ],
      "responseRequired": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 4
    projectProgramVersion: 2 *changed*
    dirty: false *changed*
    documentPositionMappers: 1 *changed*
        /home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "updateOpen",
      "arguments": {
        "changedFiles": [
          {
            "fileName": "/home/src/projects/project/src/struct.d.ts",
            "textChanges": [
              {
                "newText": "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs3 from \"./struct\";\n",
                "start": {
                  "line": 1,
                  "offset": 1
                },
                "end": {
                  "line": 4,
                  "offset": 1
                }
              }
            ]
          }
        ]
      },
      "seq": 9,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5 *changed*
    projectProgramVersion: 2
    dirty: true *changed*
    autoImportProviderHost: false

ScriptInfos::
/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts
    version: Text-1
    sourceMapFilePath: false
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/anotherFile.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/oneMore.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json
/home/src/projects/project/src/struct.d.ts (Open) *changed*
    version: SVC-1-4 *changed*
    containingProjects: 1
        /home/src/projects/project/tsconfig.json *default*
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 1
        /home/src/projects/project/tsconfig.json

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "geterr",
      "arguments": {
        "delay": 0,
        "files": [
          "/home/src/projects/project/src/struct.d.ts"
        ]
      },
      "seq": 10,
      "type": "request"
    }
After request

Timeout callback:: count: 1
3: checkOne *new*

Before running Timeout callback:: count: 1
3: checkOne

Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/projects/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/projects/project/tsconfig.json projectStateVersion: 5 projectProgramVersion: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/projects/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };"
	/home/src/projects/project/node_modules/fp-ts/lib/Struct.d.ts Text-1 "export function foo(): void"
	/home/src/projects/project/src/Struct.d.ts SVC-1-4 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs3 from \"./struct\";\n"
	/home/src/projects/project/src/anotherFile.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"
	/home/src/projects/project/src/oneMore.ts Text-1 "import * as xs1 from \"fp-ts/lib/Struct\";\nimport * as xs2 from \"fp-ts/lib/struct\";\nimport * as xs3 from \"./Struct\";\nimport * as xs4 from \"./struct\";\n"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "syntaxDiag",
      "body": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": []
      }
    }
After running Timeout callback:: count: 0

Immedidate callback:: count: 1
5: semanticCheck *new*

Projects::
/home/src/projects/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 5
    projectProgramVersion: 3 *changed*
    dirty: false *changed*
    documentPositionMappers: 0 *changed*
        /home/src/projects/project/node_modules/fp-ts/lib/struct.d.ts: identitySourceMapConsumer *deleted*
    autoImportProviderHost: false

Before running Immedidate callback:: count: 1
5: semanticCheck

Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "semanticDiag",
      "body": {
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 2,
              "offset": 22
            },
            "end": {
              "line": 2,
              "offset": 32
            },
            "text": "File name '/home/src/projects/project/src/struct.d.ts' differs from already included file name '/home/src/projects/project/src/Struct.d.ts' only in casing.\n  The file is in the program because:\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/Struct.d.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/anotherFile.ts'\n    Imported via \"./Struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Imported via \"./struct\" from file '/home/src/projects/project/src/oneMore.ts'\n    Matched by default include pattern '**/*'",
            "code": 1149,
            "category": "error",
            "relatedInformation": [
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/anotherFile.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 3,
                    "offset": 22
                  },
                  "end": {
                    "line": 3,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              },
              {
                "span": {
                  "start": {
                    "line": 4,
                    "offset": 22
                  },
                  "end": {
                    "line": 4,
                    "offset": 32
                  },
                  "file": "/home/src/projects/project/src/oneMore.ts"
                },
                "message": "File is included via import here.",
                "category": "message",
                "code": 1399
              }
            ]
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
        "file": "/home/src/projects/project/src/struct.d.ts",
        "diagnostics": [
          {
            "start": {
              "line": 1,
              "offset": 1
            },
            "end": {
              "line": 1,
              "offset": 41
            },
            "text": "'xs1' is declared but its value is never read.",
            "code": 6133,
            "category": "suggestion",
            "reportsUnnecessary": true
          },
          {
            "start": {
              "line": 2,
              "offset": 1
            },
            "end": {
              "line": 2,
              "offset": 33
            },
            "text": "'xs3' is declared but its value is never read.",
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
        "request_seq": 10,
        "performanceData": {
          "updateGraphDurationMs": *,
          "diagnosticsDuration": [
            {
              "syntaxDiag": *,
              "semanticDiag": *,
              "suggestionDiag": *,
              "file": "/home/src/projects/project/src/struct.d.ts"
            }
          ]
        }
      }
    }
After running Immedidate callback:: count: 0
