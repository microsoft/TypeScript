currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "openExternalProject",
      "arguments": {
        "rootFiles": [
          {
            "fileName": "^ScriptDocument1 file1.ts"
          }
        ],
        "options": {},
        "projectFileName": "^ScriptDocument1 file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: ^ScriptDocument1 file1.ts
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: ^ScriptDocument1 file1.ts WatchType: Missing file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: ^ScriptDocument1 file1.ts projectStateVersion: 1 projectProgramVersion: 0 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '^ScriptDocument1 file1.ts' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	^ScriptDocument1 file1.ts Text-1 ""


	^ScriptDocument1 file1.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "telemetry",
      "body": {
        "telemetryEventName": "projectInfo",
        "payload": {
          "projectId": "b0acf9b96319aac0eda3b488b70f3b770dbc8c8a990baaa18827a2f968bb61fb",
          "fileStats": {
            "js": 0,
            "jsSize": 0,
            "jsx": 0,
            "jsxSize": 0,
            "ts": 1,
            "tsSize": 0,
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
          "compileOnSave": true,
          "configFileName": "other",
          "projectType": "external",
          "languageServiceEnabled": true,
          "version": "FakeVersion"
        }
      }
    }
Info seq  [hh:mm:ss:mss] Project '^ScriptDocument1 file1.ts' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

Projects::
^ScriptDocument1 file1.ts (External) *new*
    projectStateVersion: 1
    projectProgramVersion: 1

ScriptInfos::
^ScriptDocument1 file1.ts (Dynamic) *new*
    version: Text-1
    containingProjects: 1
        ^ScriptDocument1 file1.ts

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "applyChangedToOpenFiles",
      "arguments": {
        "openFiles": [
          {
            "fileName": "^ScriptDocument1 file1.ts",
            "content": "let x =1;"
          }
        ]
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: ^ScriptDocument1 file1.ts
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: ^ScriptDocument1 file1.ts projectStateVersion: 2 projectProgramVersion: 1 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '^ScriptDocument1 file1.ts' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)
	^ScriptDocument1 file1.ts SVC-2-0 "let x =1;"

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '^ScriptDocument1 file1.ts' (External)
Info seq  [hh:mm:ss:mss] 	Files (1)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: ^ScriptDocument1 file1.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: ^ScriptDocument1 file1.ts
Info seq  [hh:mm:ss:mss] response:
    {
      "response": true,
      "responseRequired": true
    }
After request

Projects::
^ScriptDocument1 file1.ts (External) *changed*
    projectStateVersion: 2 *changed*
    projectProgramVersion: 1

ScriptInfos::
^ScriptDocument1 file1.ts (Dynamic) (Open) *changed*
    open: true *changed*
    version: SVC-2-0 *changed*
    containingProjects: 1
        ^ScriptDocument1 file1.ts *default*
