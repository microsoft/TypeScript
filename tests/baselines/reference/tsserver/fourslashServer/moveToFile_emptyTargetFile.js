currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/source.ts]
export const a = 1;
const b = 2;
console.log(a, b);

//// [/target.ts]
/** empty */

//// [/tsconfig.json]
/ { "compilerOptions": { "newLine": "lf" } }


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/source.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /source.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /source.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts",
  "/source.ts",
  "/target.ts"
 ],
 "options": {
  "newLine": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /target.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/lib.d.ts Text-1 lib.d.ts-Text
	/source.ts SVC-1-0 "export const a = 1;\nconst b = 2;\nconsole.log(a, b);"
	/target.ts Text-1 "/** empty */"


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.d.ts
	  Matched by default include pattern '**/*'
	source.ts
	  Matched by default include pattern '**/*'
	target.ts
	  Matched by default include pattern '**/*'

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
      "triggerFile": "/source.ts",
      "configFile": "/tsconfig.json",
      "diagnostics": [
       {
        "start": {
         "line": 1,
         "offset": 1
        },
        "end": {
         "line": 1,
         "offset": 2
        },
        "text": "'{' expected.",
        "code": 1005,
        "category": "error",
        "fileName": "/tsconfig.json"
       },
       {
        "start": {
         "line": 1,
         "offset": 3
        },
        "end": {
         "line": 1,
         "offset": 4
        },
        "text": "Property assignment expected.",
        "code": 1136,
        "category": "error",
        "fileName": "/tsconfig.json"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /source.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/target.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"preferences":{"allowTextChangesInNewFiles":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 1,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/source.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":20,"triggerReason":"implicit","includeInteractiveActions":true},"command":"getApplicableRefactors"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getApplicableRefactors",
     "request_seq": 2,
     "success": true,
     "body": [
      {
       "name": "Convert export",
       "description": "Convert named export to default export",
       "actions": [
        {
         "name": "Convert named export to default export",
         "description": "Convert named export to default export",
         "kind": "refactor.rewrite.export.default"
        }
       ]
      },
      {
       "name": "Move to a new file",
       "description": "Move to a new file",
       "actions": [
        {
         "name": "Move to a new file",
         "description": "Move to a new file",
         "kind": "refactor.move.newFile"
        }
       ]
      },
      {
       "name": "Move to file",
       "description": "Move to file",
       "actions": [
        {
         "name": "Move to file",
         "description": "Move to file",
         "kind": "refactor.move.file"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract function",
       "actions": [
        {
         "description": "Extract to function in module scope",
         "name": "function_scope_0",
         "kind": "refactor.extract.function"
        }
       ]
      },
      {
       "name": "Extract Symbol",
       "description": "Extract constant",
       "actions": [
        {
         "description": "Extract to constant in enclosing scope",
         "name": "constant_scope_0",
         "kind": "refactor.extract.constant"
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"preferences":{"allowTextChangesInNewFiles":true}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 3,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 4,
     "success": true
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/source.ts","startLine":1,"startOffset":1,"endLine":1,"endOffset":20,"refactor":"Move to file","action":"Move to file","interactiveRefactorArguments":{"targetFile":"/target.ts"}},"command":"getEditsForRefactor"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "getEditsForRefactor",
     "request_seq": 5,
     "success": true,
     "body": {
      "edits": [
       {
        "fileName": "/source.ts",
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
          "newText": "import { a } from \"./target\";\n\n"
         },
         {
          "start": {
           "line": 1,
           "offset": 1
          },
          "end": {
           "line": 2,
           "offset": 1
          },
          "newText": ""
         }
        ]
       },
       {
        "fileName": "/target.ts",
        "textChanges": [
         {
          "start": {
           "line": 1,
           "offset": 14
          },
          "end": {
           "line": 1,
           "offset": 14
          },
          "newText": "\nexport const a = 1;\n"
         }
        ]
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"preferences":{}},"command":"configure"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "configure",
     "request_seq": 6,
     "success": true
    }