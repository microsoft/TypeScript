currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/src/ts.ts]


//// [/src/tsx.tsx]


//// [/src/moo.ts]


//// [/src/dts.d.ts]


//// [/src/jsx.jsx]


//// [/src/js.js]


//// [/src/badExtension.badExtension]


//// [/bin/ts.js]


//// [/tsconfig.json]
{
  "compilerOptions": {
    "allowJs": true
  },
  "include": [
    "src"
  ]
}


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/src/ts.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /src
Info seq  [hh:mm:ss:mss] For info: /src/ts.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/tsconfig.json",
        "reason": "Creating possible configured project for /src/ts.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/src/dts.d.ts",
  "/src/js.js",
  "/src/jsx.jsx",
  "/src/moo.ts",
  "/src/ts.ts",
  "/src/tsx.tsx"
 ],
 "options": {
  "allowJs": true,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src 1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/dts.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/js.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/jsx.jsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/moo.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /src/tsx.tsx 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/src/dts.d.ts Text-1 ""
	/src/js.js Text-1 ""
	/src/jsx.jsx Text-1 ""
	/src/moo.ts Text-1 ""
	/src/ts.ts SVC-1-0 ""
	/src/tsx.tsx Text-1 ""


	src/dts.d.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/js.js
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/jsx.jsx
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/moo.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/ts.ts
	  Matched by include pattern 'src' in 'tsconfig.json'
	src/tsx.tsx
	  Matched by include pattern 'src' in 'tsconfig.json'

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
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "aace87d7c1572ff43c6978074161b586788b4518c7a9d06c79c03e613b6ce5a3",
          "fileStats": {
            "js": 1,
            "jsSize": 0,
            "jsx": 1,
            "jsxSize": 0,
            "ts": 2,
            "tsSize": 0,
            "tsx": 1,
            "tsxSize": 0,
            "dts": 1,
            "dtsSize": 0,
            "deferred": 0,
            "deferredSize": 0
          },
          "compilerOptions": {
            "allowJs": true
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
        "triggerFile": "/src/ts.ts",
        "configFile": "/tsconfig.json",
        "diagnostics": [
          {
            "text": "Cannot write file '/src/js.js' because it would overwrite input file.",
            "code": 5055,
            "category": "error"
          },
          {
            "text": "File '/a/lib/lib.d.ts' not found.\n  The file is in the program because:\n    Default library for target 'es5'",
            "code": 6053,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Array'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Boolean'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Function'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'IArguments'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Number'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'Object'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'RegExp'.",
            "code": 2318,
            "category": "error"
          },
          {
            "text": "Cannot find global type 'String'.",
            "code": 2318,
            "category": "error"
          }
        ]
      }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /src/ts.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/src/dts.d.ts: *new*
  {}
/src/js.js: *new*
  {}
/src/jsx.jsx: *new*
  {}
/src/moo.ts: *new*
  {}
/src/tsx.tsx: *new*
  {}
/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/src: *new*
  {}
