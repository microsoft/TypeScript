currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/project/mod.d.html.ts]
export declare class HtmlModuleThing {}

//// [/project/node_modules/package/mod.d.html.ts]
export declare class PackageHtmlModuleThing {}

//// [/project/usage.ts]
import { HtmlModuleThing } from "./";
import { PackageHtmlModuleThing } from "package/";


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/project/mod.d.html.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/mod.d.html.ts :: No config files found.
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
	/project/mod.d.html.ts SVC-1-0 "export declare class HtmlModuleThing {}"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	mod.d.html.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/mod.d.html.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/project/usage.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /project
Info seq  [hh:mm:ss:mss] For info: /project/usage.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/project/usage.ts SVC-1-0 "import { HtmlModuleThing } from \"./\";\nimport { PackageHtmlModuleThing } from \"package/\";"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	usage.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /project/mod.d.html.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /project/usage.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/project/usage.ts","line":1,"offset":36},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 2,
     "success": true,
     "body": {
      "isGlobalCompletion": false,
      "isMemberCompletion": false,
      "isNewIdentifierLocation": true,
      "entries": [
       {
        "name": "mod.html",
        "kind": "script",
        "kindModifiers": "",
        "sortText": "11"
       },
       {
        "name": "node_modules",
        "kind": "directory",
        "kindModifiers": "",
        "sortText": "11"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/project/usage.ts","line":1,"offset":36,"entryNames":[{"name":"mod.html"}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 3,
     "success": true,
     "body": [
      {
       "name": "mod.html",
       "kindModifiers": "",
       "kind": "script",
       "displayParts": [
        {
         "text": "mod.html",
         "kind": "text"
        }
       ],
       "tags": []
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/project/usage.ts","line":1,"offset":36,"entryNames":[{"name":"node_modules"}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "name": "node_modules",
       "kindModifiers": "",
       "kind": "directory",
       "displayParts": [
        {
         "text": "node_modules",
         "kind": "text"
        }
       ],
       "tags": []
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/project/usage.ts","line":2,"offset":49},"command":"completionInfo"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionInfo",
     "request_seq": 5,
     "success": true,
     "body": {
      "isGlobalCompletion": false,
      "isMemberCompletion": false,
      "isNewIdentifierLocation": true,
      "entries": [
       {
        "name": "mod.html",
        "kind": "script",
        "kindModifiers": "",
        "sortText": "11"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/project/usage.ts","line":2,"offset":49,"entryNames":[{"name":"mod.html"}]},"command":"completionEntryDetails-full"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "completionEntryDetails-full",
     "request_seq": 6,
     "success": true,
     "body": [
      {
       "name": "mod.html",
       "kindModifiers": "",
       "kind": "script",
       "displayParts": [
        {
         "text": "mod.html",
         "kind": "text"
        }
       ],
       "tags": []
      }
     ]
    }