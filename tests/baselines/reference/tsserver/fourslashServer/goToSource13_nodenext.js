currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/index.mts]
import leftPad = require("left-pad");
leftPad("", 4);

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/node_modules/left-pad/index.d.ts]
declare function leftPad(str: string|number, len: number, ch?: string|number): string;
declare namespace leftPad { }
export = leftPad;

//// [/node_modules/left-pad/index.js]
module.exports = leftPad;
function leftPad(str, len, ch) {}

//// [/node_modules/left-pad/package.json]
{
  "name": "left-pad",
  "version": "1.3.0",
  "description": "String left pad",
  "main": "index.js",
  "types": "index.d.ts"
}

//// [/tsconfig.json]
{
  "compilerOptions": {
      "module": "node16",
      "strict": true,
      "outDir": "./out",

  }
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/node_modules/left-pad/package.json"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /node_modules/left-pad
Info seq  [hh:mm:ss:mss] For info: /node_modules/left-pad/package.json :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/left-pad/package.json SVC-1-0 "{\n  \"name\": \"left-pad\",\n  \"version\": \"1.3.0\",\n  \"description\": \"String left pad\",\n  \"main\": \"index.js\",\n  \"types\": \"index.d.ts\"\n}"


	../../lib.d.ts
	  Default library for target 'es5'
	../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../lib.d.ts'
	../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../lib.d.ts'
	package.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/left-pad/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.mts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.mts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating possible configured project for /index.mts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [
  "/index.mts",
  "/lib.d.ts",
  "/lib.decorators.d.ts",
  "/lib.decorators.legacy.d.ts"
 ],
 "options": {
  "module": 100,
  "strict": true,
  "outDir": "/out",
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/left-pad/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/node_modules/left-pad/index.d.ts Text-1 "declare function leftPad(str: string|number, len: number, ch?: string|number): string;\ndeclare namespace leftPad { }\nexport = leftPad;"
	/index.mts SVC-1-0 "import leftPad = require(\"left-pad\");\nleftPad(\"\", 4);"
	/lib.d.ts Text-1 lib.d.ts-Text


	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	  Matched by default include pattern '**/*'
	node_modules/left-pad/index.d.ts
	  Imported via "left-pad" from file 'index.mts' with packageId 'left-pad/index.d.ts@1.3.0'
	  File is CommonJS module because 'node_modules/left-pad/package.json' does not have field "type"
	index.mts
	  Matched by default include pattern '**/*'
	lib.d.ts
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
      "triggerFile": "/index.mts",
      "configFile": "/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /node_modules/left-pad/package.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.mts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/index.mts","line":2,"offset":1},"command":"findSourceDefinition"}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/auxiliaryProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /node_modules/left-pad/index.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/auxiliaryProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/auxiliaryProject1*' (Auxiliary)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/node_modules/left-pad/index.js Text-1 "module.exports = leftPad;\nfunction leftPad(str, len, ch) {}"
	/index.mts SVC-1-0 "import leftPad = require(\"left-pad\");\nleftPad(\"\", 4);"


	node_modules/left-pad/index.js
	  Imported via "left-pad" from file 'index.mts' with packageId 'left-pad/index.js@1.3.0'
	  File is CommonJS module because 'node_modules/left-pad/package.json' does not have field "type"
	index.mts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "findSourceDefinition",
     "request_seq": 2,
     "success": true,
     "performanceData": {
      "updateGraphDurationMs": *
     },
     "body": [
      {
       "file": "/node_modules/left-pad/index.js",
       "start": {
        "line": 2,
        "offset": 10
       },
       "end": {
        "line": 2,
        "offset": 17
       },
       "contextStart": {
        "line": 2,
        "offset": 1
       },
       "contextEnd": {
        "line": 2,
        "offset": 34
       }
      }
     ]
    }