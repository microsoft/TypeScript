currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/project/a.ts]
export const a = 0;

//// [/project/b.ts]
import "./a";

//// [/project/c.ts]
import {} from "./a";

//// [/project/d.ts]
import { a } from "/project/a";
type T = typeof import("./a").a;

//// [/project/tsconfig.json]
{}


Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 0,
      "type": "request",
      "arguments": {
        "file": "/project/tsconfig.json"
      },
      "command": "open"
    }
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/tsconfig.json :: Config file name: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/tsconfig.json 2000 undefined Project: /project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingStart",
      "body": {
        "projectName": "/project/tsconfig.json",
        "reason": "Creating possible configured project for /project/tsconfig.json to open"
      }
    }
Info seq  [hh:mm:ss:mss] Config: /project/tsconfig.json : {
 "rootNames": [
  "/project/a.ts",
  "/project/b.ts",
  "/project/c.ts",
  "/project/d.ts"
 ],
 "options": {
  "configFilePath": "/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project 1 undefined Config: /project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/c.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /project/d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/a.ts Text-1 "export const a = 0;"
	/project/b.ts Text-1 "import \"./a\";"
	/project/c.ts Text-1 "import {} from \"./a\";"
	/project/d.ts Text-1 "import { a } from \"/project/a\";\ntype T = typeof import(\"./a\").a;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	a.ts
	  Matched by default include pattern '**/*'
	  Imported via "./a" from file 'b.ts'
	  Imported via "./a" from file 'c.ts'
	  Imported via "/project/a" from file 'd.ts'
	  Imported via "./a" from file 'd.ts'
	b.ts
	  Matched by default include pattern '**/*'
	c.ts
	  Matched by default include pattern '**/*'
	d.ts
	  Matched by default include pattern '**/*'

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "projectLoadingFinish",
      "body": {
        "projectName": "/project/tsconfig.json"
      }
    }
Info seq  [hh:mm:ss:mss] event:
    {
      "seq": 0,
      "type": "event",
      "event": "configFileDiag",
      "body": {
        "triggerFile": "/project/tsconfig.json",
        "configFile": "/project/tsconfig.json",
        "diagnostics": []
      }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/tsconfig.json SVC-1-0 "{}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (7)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/project/a.ts: *new*
  {"pollingInterval":500}
/project/b.ts: *new*
  {"pollingInterval":500}
/project/c.ts: *new*
  {"pollingInterval":500}
/project/d.ts: *new*
  {"pollingInterval":500}
/project/tsconfig.json: *new*
  {"pollingInterval":2000}

watchedDirectoriesRecursive::
/project: *new*
  {}

Info seq  [hh:mm:ss:mss] request:
    {
      "seq": 1,
      "type": "request",
      "arguments": {
        "file": "/project/a.ts"
      },
      "command": "fileReferences"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "seq": 0,
      "type": "response",
      "command": "fileReferences",
      "request_seq": 1,
      "success": true,
      "body": {
        "refs": [
          {
            "file": "/project/b.ts",
            "start": {
              "line": 1,
              "offset": 9
            },
            "end": {
              "line": 1,
              "offset": 12
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 14
            },
            "lineText": "import \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/c.ts",
            "start": {
              "line": 1,
              "offset": 17
            },
            "end": {
              "line": 1,
              "offset": 20
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 22
            },
            "lineText": "import {} from \"./a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 1,
              "offset": 20
            },
            "end": {
              "line": 1,
              "offset": 30
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 32
            },
            "lineText": "import { a } from \"/project/a\";",
            "isWriteAccess": false
          },
          {
            "file": "/project/d.ts",
            "start": {
              "line": 2,
              "offset": 25
            },
            "end": {
              "line": 2,
              "offset": 28
            },
            "contextStart": {
              "line": 2,
              "offset": 1
            },
            "contextEnd": {
              "line": 2,
              "offset": 33
            },
            "lineText": "type T = typeof import(\"./a\").a;",
            "isWriteAccess": false
          }
        ],
        "symbolName": "\"/project/a.ts\""
      }
    }