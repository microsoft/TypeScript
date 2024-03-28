currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/package.json]
{
  "type": "module",
  "imports": {
    "#is-browser": {
      "types": "./types/env/browser.d.ts",
      "default": "./not-dist-on-purpose/env/browser.js"
    }
  }
}

//// [/src/a.ts]
import {} from "";

//// [/src/env/browser.ts]
export const isBrowser = true;

//// [/tsconfig.json]
{
  "compilerOptions": {
    "module": "nodenext",
    "rootDir": "src",
    "outDir": "dist",
    "declarationDir": "types",
  }
}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/src/a.ts",
  "/src/env/browser.ts"
 ],
 "options": {
  "module": 199,
  "rootDir": "/src",
  "outDir": "/dist",
  "declarationDir": "/types",
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/env/browser.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib.d.ts Text-1 lib.d.ts-Text
	/src/a.ts Text-1 "import {} from \"\";"
	/src/env/browser.ts Text-1 "export const isBrowser = true;"


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'
	src/a.ts
	  Matched by default include pattern '**/*'
	  File is ECMAScript module because 'package.json' has field "type" with value "module"
	src/env/browser.ts
	  Matched by default include pattern '**/*'
	  File is ECMAScript module because 'package.json' has field "type" with value "module"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/tsconfig.json",
        "configFile": "/tsconfig.json",
        "diagnostics": [
          {
            "start": {
              "line": 6,
              "offset": 5
            },
            "end": {
              "line": 6,
              "offset": 21
            },
            "text": "Option 'declarationDir' cannot be specified without specifying option 'declaration' or option 'composite'.",
            "code": 5069,
            "category": "error",
            "fileName": "/tsconfig.json"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{\n  \"compilerOptions\": {\n    \"module\": \"nodenext\",\n    \"rootDir\": \"src\",\n    \"outDir\": \"dist\",\n    \"declarationDir\": \"types\",\n  }\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /package.json 250 undefined WatchType: package.json file
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/package.json: *new*
  {"pollingInterval":250}
/src/a.ts: *new*
  {"pollingInterval":500}
/src/env/browser.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
: *new*
  {}

Projects::
/dev/null/inferredProject1* (Inferred) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *new*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: true

ScriptInfos::
/lib.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts *new*
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/src/a.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/src/env/browser.ts *new*
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/tsconfig.json (Open) *new*
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/src/a.ts"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /src/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /src
Info seq  [hh:mm:ss:mss] For info: /src/a.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /src/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/package.json:
  {"pollingInterval":250}
/src/env/browser.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/src/a.ts:
  {"pollingInterval":500}

watchedDirectoriesRecursive::
:
  {}

Projects::
/dev/null/inferredProject1* (Inferred)
    projectStateVersion: 1
    projectProgramVersion: 1
/tsconfig.json (Configured) *changed*
    projectStateVersion: 1
    projectProgramVersion: 1
    noOpenRef: false *changed*

ScriptInfos::
/lib.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/lib.decorators.legacy.d.ts
    version: Text-1
    containingProjects: 2
        /tsconfig.json
        /dev/null/inferredProject1*
/src/a.ts (Open) *changed*
    open: true *changed*
    version: Text-1
    containingProjects: 1
        /tsconfig.json *default*
/src/env/browser.ts
    version: Text-1
    containingProjects: 1
        /tsconfig.json
/tsconfig.json (Open)
    version: SVC-1-0
    containingProjects: 1
        /dev/null/inferredProject1* *default*

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 2,
      "type": "request",
      "arguments": {
        "preferences": {}
      },
      "command": "configure"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "configure",
      "request_seq": 2,
      "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 3,
      "type": "request",
      "arguments": {
        "file": "/src/a.ts",
        "line": 1,
        "offset": 17
      },
      "command": "completionInfo"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "completionInfo",
      "request_seq": 3,
      "success": true,
      "body": {
        "isGlobalCompletion": false,
        "isMemberCompletion": false,
        "isNewIdentifierLocation": true,
        "entries": [
          {
            "name": "#is-browser",
            "kind": "script",
            "kindModifiers": "",
            "sortText": "11"
          }
        ]
      }
    }