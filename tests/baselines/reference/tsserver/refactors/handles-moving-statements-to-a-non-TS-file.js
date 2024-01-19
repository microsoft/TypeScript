currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/Foo/a.ts]
const x = 0;

//// [/Foo/b.txt]


//// [/Foo/tsconfig.json]
{ "files": ["./a.ts"] }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/Foo/a.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /Foo
Info seq  [hh:mm:ss:mss] For info: /Foo/a.ts :: Config file name: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /Foo/tsconfig.json 2000 undefined Project: /Foo/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/Foo/tsconfig.json",
        "reason": "Creating possible configured project for /Foo/a.ts to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /Foo/tsconfig.json : {
 "rootNames": [
  "/Foo/a.ts"
 ],
 "options": {
  "configFilePath": "/Foo/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /Foo/tsconfig.json WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /Foo/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/Foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)
	/Foo/a.ts SVC-1-0 "const x = 0;"


	a.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/Foo/tsconfig.json"
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
          "projectId": "863f3d855b84243a842bf5ce983e4ad447580eb747988e9f783d6b27955b8b91",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 12,
            "tsx": 0,
            "tsxSize": 0,
            "dts": 0,
            "dtsSize": 0,
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
          "files": true,
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
        "triggerFile": "/Foo/a.ts",
        "configFile": "/Foo/tsconfig.json",
        "diagnostics": [
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
Info seq  [hh:mm:ss:mss] Project '/Foo/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /Foo/a.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /Foo/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/Foo/tsconfig.json: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "getEditsForRefactor",
      "arguments": {
        "file": "/Foo/a.ts",
        "startLine": 1,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 12,
        "refactor": "Move to file",
        "action": "Move to file",
        "interactiveRefactorArguments": {
          "targetFile": "/Foo/b.txt"
        }
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": {
        "edits": [],
        "notApplicableReason": "Cannot move to file, selected file is invalid"
      },
      "responseRequired": true
    }
After request
