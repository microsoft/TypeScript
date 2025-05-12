Info seq  [hh:mm:ss:mss] currentDirectory:: /home/src/Vscode/Projects/bin useCaseSensitiveFileNames:: false
Info seq  [hh:mm:ss:mss] libs Location:: /home/src/tslibs/TS/Lib
Info seq  [hh:mm:ss:mss] globalTypingsCacheLocation:: /home/src/Library/Caches/typescript
Info seq  [hh:mm:ss:mss] Provided types map file "/home/src/tslibs/TS/Lib/typesMap.json" doesn't exist
//// [/home/src/tslibs/TS/Lib/lib.d.ts]
lib.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/home/src/workspaces/project/a/index.ts]
namespace NS {
    export function FA() {
        FB();
    }
}

interface I {
    FA();
}

const ia: I = {
    FA() { },
    FB() { },
    FC() { },
 };

//// [/home/src/workspaces/project/a/tsconfig.json]
{
    "extends": "../tsconfig.settings.json",
    "references": [
        { "path": "../b" },
        { "path": "../c" },
    ],
    "files": [
        "index.ts",
    ],
}

//// [/home/src/workspaces/project/b/index.ts]
namespace NS {
    export function FB() {}
}

interface I {
    FB();
}

const ib: I = { FB() {} };

//// [/home/src/workspaces/project/b/tsconfig.json]
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
    ],
}

//// [/home/src/workspaces/project/c/index.ts]
namespace NS {
    export function FC() {}
}

interface I {
    FC();
}

const ic: I = { FC() {} };

//// [/home/src/workspaces/project/c/tsconfig.json]
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
    ],
}

//// [/home/src/workspaces/project/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "a" },
    ],
    "files": []
}

//// [/home/src/workspaces/project/tsconfig.settings.json]
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "declarationMap": true,
        "module": "none",
        "emitDeclarationOnly": true,
    }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/a/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/a/tsconfig.json, currentDirectory: /home/src/workspaces/project/a
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/a/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/a/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 0,
  "emitDeclarationOnly": true,
  "configFilePath": "/home/src/workspaces/project/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/b",
   "originalPath": "../b"
  },
  {
   "path": "/home/src/workspaces/project/c",
   "originalPath": "../c"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.settings.json 2000 undefined Config: /home/src/workspaces/project/a/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/a/tsconfig.json",
        "reason": "Creating possible configured project for /home/src/workspaces/project/a/index.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/b/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/b/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 0,
  "emitDeclarationOnly": true,
  "configFilePath": "/home/src/workspaces/project/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/c/tsconfig.json : {
 "rootNames": [
  "/home/src/workspaces/project/c/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 0,
  "emitDeclarationOnly": true,
  "configFilePath": "/home/src/workspaces/project/c/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/a/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/b/index.ts Text-1 "namespace NS {\n    export function FB() {}\n}\n\ninterface I {\n    FB();\n}\n\nconst ib: I = { FB() {} };"
	/home/src/workspaces/project/c/index.ts Text-1 "namespace NS {\n    export function FC() {}\n}\n\ninterface I {\n    FC();\n}\n\nconst ic: I = { FC() {} };"
	/home/src/workspaces/project/a/index.ts SVC-1-0 "namespace NS {\n    export function FA() {\n        FB();\n    }\n}\n\ninterface I {\n    FA();\n}\n\nconst ia: I = {\n    FA() { },\n    FB() { },\n    FC() { },\n };"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../b/index.ts
	  Source from referenced project '../b/tsconfig.json' included because '--module' is specified as 'none'
	../c/index.ts
	  Source from referenced project '../c/tsconfig.json' included because '--module' is specified as 'none'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/a/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/a/index.ts",
        "configFile": "/home/src/workspaces/project/a/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/a/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/tsconfig.json, currentDirectory: /home/src/workspaces/project
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/tsconfig.json 2000 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 0,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      }
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/a/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/b/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.ts: *new*
  {"pollingInterval":500}
/home/src/workspaces/project/c/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules: *new*
  {}
/home/src/workspaces/node_modules/@types: *new*
  {}
/home/src/workspaces/project/a/node_modules: *new*
  {}
/home/src/workspaces/project/a/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules: *new*
  {}
/home/src/workspaces/project/node_modules/@types: *new*
  {}

Projects::
/home/src/workspaces/project/a/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 0
    dirty: true
    initialLoadPending: true

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json
/home/src/workspaces/project/a/index.ts (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json *default*
/home/src/workspaces/project/b/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json
/home/src/workspaces/project/c/index.ts *new*
    version: Text-1
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/a/index.ts",
        "line": 2,
        "offset": 21
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/a/index.ts position 35 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json",
        "reason": "Creating project possibly referencing default composite project /home/src/workspaces/project/a/tsconfig.json of open file /home/src/workspaces/project/a/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /home/src/workspaces/project/tsconfig.json : {
 "rootNames": [],
 "options": {
  "composite": true,
  "configFilePath": "/home/src/workspaces/project/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/home/src/workspaces/project/a",
   "originalPath": "a"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/tsconfig.json",
        "configFile": "/home/src/workspaces/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/a/index.d.ts 2000 undefined Project: /home/src/workspaces/project/a/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 1,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/a/index.ts",
            "kind": "function",
            "name": "function NS.FA(): void",
            "textSpan": {
              "start": 35,
              "length": 2
            },
            "displayParts": [
              {
                "text": "function",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "NS",
                "kind": "moduleName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FA",
                "kind": "functionName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "void",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 19,
              "length": 42
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 35,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 19,
                "length": 42
              },
              "isWriteAccess": true,
              "isDefinition": true
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {} *new*
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules:
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {} *new*

Projects::
/home/src/workspaces/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/a/index.d.ts: identitySourceMapConsumer *new*
    autoImportProviderHost: false
/home/src/workspaces/project/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1 *changed*
    dirty: false *changed*
    initialLoadPending: false *changed*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/a/index.ts",
        "line": 7,
        "offset": 11
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/a/index.ts position 75 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/b/tsconfig.json, currentDirectory: /home/src/workspaces/project/b
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/b/tsconfig.json",
        "reason": "Creating project for original file: /home/src/workspaces/project/b/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/b/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/b/index.ts Text-1 "namespace NS {\n    export function FB() {}\n}\n\ninterface I {\n    FB();\n}\n\nconst ib: I = { FB() {} };"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.d.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/b/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/b/index.ts",
        "configFile": "/home/src/workspaces/project/b/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating ConfiguredProject: /home/src/workspaces/project/c/tsconfig.json, currentDirectory: /home/src/workspaces/project/c
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/home/src/workspaces/project/c/tsconfig.json",
        "reason": "Creating project for original file: /home/src/workspaces/project/c/index.ts"
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/project/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/workspaces/node_modules/@types 1 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /home/src/workspaces/project/c/tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/home/src/tslibs/TS/Lib/lib.d.ts Text-1 lib.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/home/src/workspaces/project/c/index.ts Text-1 "namespace NS {\n    export function FC() {}\n}\n\ninterface I {\n    FC();\n}\n\nconst ic: I = { FC() {} };"


	../../../tslibs/TS/Lib/lib.d.ts
	  Default library for target 'es5'
	../../../tslibs/TS/Lib/lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../tslibs/TS/Lib/lib.d.ts'
	../../../tslibs/TS/Lib/lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../tslibs/TS/Lib/lib.d.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/home/src/workspaces/project/c/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/home/src/workspaces/project/c/index.ts",
        "configFile": "/home/src/workspaces/project/c/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 56 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 56 in project /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 2,
      "success": true,
      "performanceData": {
        "updateGraphDurationMs": *
      },
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/b/index.ts",
            "kind": "interface",
            "name": "interface I",
            "textSpan": {
              "start": 56,
              "length": 1
            },
            "displayParts": [
              {
                "text": "interface",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              }
            ],
            "contextSpan": {
              "start": 46,
              "length": 25
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 75,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 65,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 102,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {} *new*
  {} *new*
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {} *new*
  {} *new*
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/b/node_modules: *new*
  {}
/home/src/workspaces/project/b/node_modules/@types: *new*
  {}
/home/src/workspaces/project/c/node_modules: *new*
  {}
/home/src/workspaces/project/c/node_modules/@types: *new*
  {}
/home/src/workspaces/project/node_modules:
  {}
  {} *new*
  {} *new*
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {} *new*
  {} *new*

Projects::
/home/src/workspaces/project/a/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
    originalConfiguredProjects: 3 *changed*
        /home/src/workspaces/project/b/tsconfig.json *new*
        /home/src/workspaces/project/a/tsconfig.json *new*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/workspaces/project/b/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/c/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts *changed*
    version: Text-1
    containingProjects: 3 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
        /home/src/workspaces/project/c/tsconfig.json *new*
/home/src/workspaces/project/a/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json *default*
/home/src/workspaces/project/b/index.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *new*
/home/src/workspaces/project/c/index.ts *changed*
    version: Text-1
    containingProjects: 2 *changed*
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json *new*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/a/index.ts",
        "line": 8,
        "offset": 5
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/a/index.ts position 83 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 3,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/a/index.ts",
            "kind": "method",
            "name": "(method) I.FA(): any",
            "textSpan": {
              "start": 83,
              "length": 2
            },
            "displayParts": [
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": "method",
                "kind": "text"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FA",
                "kind": "methodName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "any",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 83,
              "length": 5
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 83,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 83,
                "length": 5
              },
              "isWriteAccess": false,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 112,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 112,
                "length": 8
              },
              "isWriteAccess": true,
              "isDefinition": false
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 4,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/b/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/b/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json,/home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 4,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/b/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {}
  {}
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/b/node_modules:
  {}
/home/src/workspaces/project/b/node_modules/@types:
  {}
/home/src/workspaces/project/c/node_modules:
  {}
/home/src/workspaces/project/c/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {}
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/workspaces/project/a/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json *default*
/home/src/workspaces/project/b/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *default*
/home/src/workspaces/project/c/index.ts
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 5,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/index.ts",
        "line": 2,
        "offset": 21
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 35 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 35 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/b/index.d.ts 2000 undefined Project: /home/src/workspaces/project/b/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 5,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/b/index.ts",
            "kind": "function",
            "name": "function NS.FB(): void",
            "textSpan": {
              "start": 35,
              "length": 2
            },
            "displayParts": [
              {
                "text": "function",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "NS",
                "kind": "moduleName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FB",
                "kind": "functionName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "void",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 19,
              "length": 23
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 35,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 19,
                "length": 23
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 50,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.d.ts: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {}
  {}
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/b/node_modules:
  {}
/home/src/workspaces/project/b/node_modules/@types:
  {}
/home/src/workspaces/project/c/node_modules:
  {}
/home/src/workspaces/project/c/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {}
  {}

Projects::
/home/src/workspaces/project/a/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
    originalConfiguredProjects: 3
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/workspaces/project/b/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/b/index.d.ts: identitySourceMapConsumer *new*
/home/src/workspaces/project/c/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 6,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/index.ts",
        "line": 5,
        "offset": 11
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 56 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 56 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 56 in project /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 6,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/b/index.ts",
            "kind": "interface",
            "name": "interface I",
            "textSpan": {
              "start": 56,
              "length": 1
            },
            "displayParts": [
              {
                "text": "interface",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              }
            ],
            "contextSpan": {
              "start": 46,
              "length": 25
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 75,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 65,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 102,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 7,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/b/index.ts",
        "line": 6,
        "offset": 5
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 64 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 64 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 7,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/b/index.ts",
            "kind": "method",
            "name": "(method) I.FB(): any",
            "textSpan": {
              "start": 64,
              "length": 2
            },
            "displayParts": [
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": "method",
                "kind": "text"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FB",
                "kind": "methodName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "any",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 64,
              "length": 5
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 64,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 64,
                "length": 5
              },
              "isWriteAccess": false,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 89,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 89,
                "length": 7
              },
              "isWriteAccess": true,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 126,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 126,
                "length": 8
              },
              "isWriteAccess": true,
              "isDefinition": false
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 8,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/c/index.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /home/src/workspaces/project/c/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined:: Result: /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/c/tsconfig.json ProjectRootPath: undefined:: Result: /home/src/workspaces/project/tsconfig.json
Info seq  [hh:mm:ss:mss] getConfigFileNameForFile:: File: /home/src/workspaces/project/tsconfig.json ProjectRootPath: undefined:: Result: undefined
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/home/src/workspaces/project/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json,/home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /home/src/workspaces/project/c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /home/src/workspaces/project/a/tsconfig.json,/home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "open",
      "request_seq": 8,
      "success": true
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/home/src/workspaces/project/c/index.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {}
  {}
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/b/node_modules:
  {}
/home/src/workspaces/project/b/node_modules/@types:
  {}
/home/src/workspaces/project/c/node_modules:
  {}
/home/src/workspaces/project/c/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {}
  {}

ScriptInfos::
/home/src/tslibs/TS/Lib/lib.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 3
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/workspaces/project/a/index.ts (Open)
    version: SVC-1-0
    containingProjects: 1
        /home/src/workspaces/project/a/tsconfig.json *default*
/home/src/workspaces/project/b/index.ts (Open)
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/b/tsconfig.json *default*
/home/src/workspaces/project/c/index.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 2
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 9,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/c/index.ts",
        "line": 2,
        "offset": 21
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 35 in project /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 35 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /home/src/workspaces/project/c/index.d.ts 2000 undefined Project: /home/src/workspaces/project/c/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 9,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/c/index.ts",
            "kind": "function",
            "name": "function NS.FC(): void",
            "textSpan": {
              "start": 35,
              "length": 2
            },
            "displayParts": [
              {
                "text": "function",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "NS",
                "kind": "moduleName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FC",
                "kind": "functionName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "void",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 19,
              "length": 23
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 35,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 19,
                "length": 23
              },
              "isWriteAccess": true,
              "isDefinition": true
            }
          ]
        }
      ]
    }
After Request
watchedFiles::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.d.ts:
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/home/src/workspaces/project/a/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/a/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/index.d.ts:
  {"pollingInterval":2000}
/home/src/workspaces/project/b/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/c/index.d.ts: *new*
  {"pollingInterval":2000}
/home/src/workspaces/project/c/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.json:
  {"pollingInterval":2000}
/home/src/workspaces/project/tsconfig.settings.json:
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/home/src/workspaces/node_modules:
  {}
  {}
  {}
/home/src/workspaces/node_modules/@types:
  {}
  {}
  {}
  {}
/home/src/workspaces/project/a/node_modules:
  {}
/home/src/workspaces/project/a/node_modules/@types:
  {}
/home/src/workspaces/project/b/node_modules:
  {}
/home/src/workspaces/project/b/node_modules/@types:
  {}
/home/src/workspaces/project/c/node_modules:
  {}
/home/src/workspaces/project/c/node_modules/@types:
  {}
/home/src/workspaces/project/node_modules:
  {}
  {}
  {}
/home/src/workspaces/project/node_modules/@types:
  {}
  {}
  {}
  {}

Projects::
/home/src/workspaces/project/a/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
    autoImportProviderHost: false
    originalConfiguredProjects: 3
        /home/src/workspaces/project/b/tsconfig.json
        /home/src/workspaces/project/a/tsconfig.json
        /home/src/workspaces/project/c/tsconfig.json
/home/src/workspaces/project/b/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1
/home/src/workspaces/project/c/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    documentPositionMappers: 1 *changed*
        /home/src/workspaces/project/c/index.d.ts: identitySourceMapConsumer *new*
/home/src/workspaces/project/tsconfig.json (Configured)
    projectStateVersion: 1
    projectProgramVersion: 1

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 10,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/c/index.ts",
        "line": 5,
        "offset": 11
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 56 in project /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 56 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/b/index.ts position 56 in project /home/src/workspaces/project/b/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 10,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/c/index.ts",
            "kind": "interface",
            "name": "interface I",
            "textSpan": {
              "start": 56,
              "length": 1
            },
            "displayParts": [
              {
                "text": "interface",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              }
            ],
            "contextSpan": {
              "start": 46,
              "length": 25
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            }
          ]
        },
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/b/index.ts",
            "kind": "interface",
            "name": "interface I",
            "textSpan": {
              "start": 56,
              "length": 1
            },
            "displayParts": [
              {
                "text": "interface",
                "kind": "keyword"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              }
            ],
            "contextSpan": {
              "start": 46,
              "length": 25
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 56,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "contextSpan": {
                "start": 46,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 83,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/b/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 75,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 65,
                "length": 25
              },
              "isWriteAccess": true,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 102,
                "length": 1
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "isWriteAccess": false,
              "isDefinition": false
            }
          ]
        }
      ]
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 11,
      "type": "request",
      "arguments": {
        "file": "/home/src/workspaces/project/c/index.ts",
        "line": 6,
        "offset": 5
      },
      "command": "references-full"
    }
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 64 in project /home/src/workspaces/project/c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /home/src/workspaces/project/c/index.ts position 64 in project /home/src/workspaces/project/a/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "references-full",
      "request_seq": 11,
      "success": true,
      "body": [
        {
          "definition": {
            "containerKind": "",
            "containerName": "",
            "fileName": "/home/src/workspaces/project/c/index.ts",
            "kind": "method",
            "name": "(method) I.FC(): any",
            "textSpan": {
              "start": 64,
              "length": 2
            },
            "displayParts": [
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": "method",
                "kind": "text"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "I",
                "kind": "interfaceName"
              },
              {
                "text": ".",
                "kind": "punctuation"
              },
              {
                "text": "FC",
                "kind": "methodName"
              },
              {
                "text": "(",
                "kind": "punctuation"
              },
              {
                "text": ")",
                "kind": "punctuation"
              },
              {
                "text": ":",
                "kind": "punctuation"
              },
              {
                "text": " ",
                "kind": "space"
              },
              {
                "text": "any",
                "kind": "keyword"
              }
            ],
            "contextSpan": {
              "start": 64,
              "length": 5
            }
          },
          "references": [
            {
              "textSpan": {
                "start": 64,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 64,
                "length": 5
              },
              "isWriteAccess": false,
              "isDefinition": true
            },
            {
              "textSpan": {
                "start": 89,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/c/index.ts",
              "contextSpan": {
                "start": 89,
                "length": 7
              },
              "isWriteAccess": true,
              "isDefinition": false
            },
            {
              "textSpan": {
                "start": 140,
                "length": 2
              },
              "fileName": "/home/src/workspaces/project/a/index.ts",
              "contextSpan": {
                "start": 140,
                "length": 8
              },
              "isWriteAccess": true,
              "isDefinition": false
            }
          ]
        }
      ]
    }