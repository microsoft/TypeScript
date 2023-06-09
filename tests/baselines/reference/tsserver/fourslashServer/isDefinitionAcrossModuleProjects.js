currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/a/index.ts]
import { NS } from "../b";
import { I } from "../c";

declare module "../b" {
    export namespace NS {
        export function FA();
    }
}

declare module "../c" {
    export interface I {
        FA();
    }
}

const ia: I = {
    FA: NS.FA,
    FC() { },
};

//// [/a/tsconfig.json]
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

//// [/a2/index.ts]
import { NS } from "../b";
import { I } from "../c";

declare module "../b" {
    export namespace NS {
        export function FA();
    }
}

declare module "../c" {
    export interface I {
        FA();
    }
}

const ia: I = {
    FA: NS.FA,
    FC() { },
};

//// [/a2/tsconfig.json]
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

//// [/b/index.ts]
export namespace NS {
    export function FB() {}
}

export interface I {
    FB();
}

const ib: I = { FB() {} };

//// [/b/other.ts]
export const Other = 1;

//// [/b/tsconfig.json]
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
        "other.ts",
    ],
}

//// [/c/index.ts]
export namespace NS {
    export function FC() {}
}

export interface I {
    FC();
}

const ic: I = { FC() {} };

//// [/c/tsconfig.json]
{
    "extends": "../tsconfig.settings.json",
    "files": [
        "index.ts",
    ],
}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tsconfig.json]
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "a" },
        { "path": "a2" },
    ],
    "files": []
}

//// [/tsconfig.settings.json]
{
    "compilerOptions": {
        "composite": true,
        "skipLibCheck": true,
        "declarationMap": true,
        "module": "CommonJS",
        "emitDeclarationOnly": true,
    }
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/a/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/index.ts :: Config file name: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/a/tsconfig.json",
      "reason": "Creating possible configured project for /a/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /a/tsconfig.json : {
 "rootNames": [
  "/a/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 1,
  "emitDeclarationOnly": true,
  "configFilePath": "/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/b",
   "originalPath": "../b"
  },
  {
   "path": "/c",
   "originalPath": "../c"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.settings.json 2000 undefined Config: /a/tsconfig.json WatchType: Extended config file
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /b/tsconfig.json : {
 "rootNames": [
  "/b/index.ts",
  "/b/other.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 1,
  "emitDeclarationOnly": true,
  "configFilePath": "/b/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /c/tsconfig.json : {
 "rootNames": [
  "/c/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 1,
  "emitDeclarationOnly": true,
  "configFilePath": "/c/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/tsconfig.json 2000 undefined Project: /a/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/b/index.ts Text-1 "export namespace NS {\n    export function FB() {}\n}\n\nexport interface I {\n    FB();\n}\n\nconst ib: I = { FB() {} };"
	/c/index.ts Text-1 "export namespace NS {\n    export function FC() {}\n}\n\nexport interface I {\n    FC();\n}\n\nconst ic: I = { FC() {} };"
	/a/index.ts SVC-1-0 "import { NS } from \"../b\";\nimport { I } from \"../c\";\n\ndeclare module \"../b\" {\n    export namespace NS {\n        export function FA();\n    }\n}\n\ndeclare module \"../c\" {\n    export interface I {\n        FA();\n    }\n}\n\nconst ia: I = {\n    FA: NS.FA,\n    FC() { },\n};"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	../b/index.ts
	  Imported via "../b" from file 'index.ts'
	../c/index.ts
	  Imported via "../c" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/a/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/a/index.ts",
      "configFile": "/a/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /a
Info seq  [hh:mm:ss:mss] For info: /a/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0) InitialLoadPending

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/a/index.ts","line":6,"offset":25},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a/index.ts position 128 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Loading configured project /tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/tsconfig.json",
      "reason": "Creating project possibly referencing default composite project /a/tsconfig.json of open file /a/index.ts"
     }
    }
Info seq  [hh:mm:ss:mss] Config: /tsconfig.json : {
 "rootNames": [],
 "options": {
  "composite": true,
  "configFilePath": "/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/a",
   "originalPath": "a"
  },
  {
   "path": "/a2",
   "originalPath": "a2"
  }
 ]
}
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] Config: /a2/tsconfig.json : {
 "rootNames": [
  "/a2/index.ts"
 ],
 "options": {
  "composite": true,
  "skipLibCheck": true,
  "declarationMap": true,
  "module": 1,
  "emitDeclarationOnly": true,
  "configFilePath": "/a2/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/b",
   "originalPath": "../b"
  },
  {
   "path": "/c",
   "originalPath": "../c"
  }
 ]
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a2/tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

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
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/index.d.ts 2000 undefined Project: /a/tsconfig.json WatchType: Missing generated file
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
        "fileName": "/a/index.ts",
        "kind": "function",
        "name": "function NS.FA(): any",
        "textSpan": {
         "start": 128,
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
          "text": "any",
          "kind": "keyword"
         }
        ],
        "contextSpan": {
         "start": 112,
         "length": 21
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 128,
          "length": 2
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 112,
          "length": 21
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 242,
          "length": 2
         },
         "fileName": "/a/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/a/index.ts","line":11,"offset":22},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a/index.ts position 188 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /c/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/c/tsconfig.json",
      "reason": "Creating project for original file: /c/index.ts"
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /c/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/c/index.ts Text-1 "export namespace NS {\n    export function FC() {}\n}\n\nexport interface I {\n    FC();\n}\n\nconst ic: I = { FC() {} };"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/c/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/a2/tsconfig.json",
      "reason": "Creating project referenced by : /tsconfig.json as it references project /c/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a2/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /a2/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/a2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/b/index.ts Text-1 "export namespace NS {\n    export function FB() {}\n}\n\nexport interface I {\n    FB();\n}\n\nconst ib: I = { FB() {} };"
	/c/index.ts Text-1 "export namespace NS {\n    export function FC() {}\n}\n\nexport interface I {\n    FC();\n}\n\nconst ic: I = { FC() {} };"
	/a2/index.ts Text-1 "import { NS } from \"../b\";\nimport { I } from \"../c\";\n\ndeclare module \"../b\" {\n    export namespace NS {\n        export function FA();\n    }\n}\n\ndeclare module \"../c\" {\n    export interface I {\n        FA();\n    }\n}\n\nconst ia: I = {\n    FA: NS.FA,\n    FC() { },\n};"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	../b/index.ts
	  Imported via "../b" from file 'index.ts'
	../c/index.ts
	  Imported via "../c" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/a2/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
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
        "fileName": "/c/index.ts",
        "kind": "interface",
        "name": "interface I",
        "textSpan": {
         "start": 70,
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
         "start": 53,
         "length": 32
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 70,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 53,
          "length": 32
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 97,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a2/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/a/index.ts","line":12,"offset":9},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a/index.ts position 200 in project /a/tsconfig.json
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
        "fileName": "/a/index.ts",
        "kind": "method",
        "name": "(method) I.FA(): any",
        "textSpan": {
         "start": 200,
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
         "start": 200,
         "length": 5
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 200,
          "length": 2
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 200,
          "length": 5
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 235,
          "length": 2
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 235,
          "length": 9
         },
         "isWriteAccess": true,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/a2/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /a2/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /a2
Info seq  [hh:mm:ss:mss] For info: /a2/index.ts :: Config file name: /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /a2
Info seq  [hh:mm:ss:mss] For info: /a2/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a2/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/a2/index.ts","line":6,"offset":25},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a2/index.ts position 128 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a2/index.d.ts 2000 undefined Project: /a2/tsconfig.json WatchType: Missing generated file
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
        "fileName": "/a2/index.ts",
        "kind": "function",
        "name": "function NS.FA(): any",
        "textSpan": {
         "start": 128,
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
          "text": "any",
          "kind": "keyword"
         }
        ],
        "contextSpan": {
         "start": 112,
         "length": 21
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 128,
          "length": 2
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 112,
          "length": 21
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 242,
          "length": 2
         },
         "fileName": "/a2/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/a2/index.ts","line":11,"offset":22},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a2/index.ts position 188 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /c/tsconfig.json
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
        "fileName": "/c/index.ts",
        "kind": "interface",
        "name": "interface I",
        "textSpan": {
         "start": 70,
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
         "start": 53,
         "length": 32
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 70,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 53,
          "length": 32
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 97,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a2/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/a2/index.ts","line":12,"offset":9},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /a2/index.ts position 200 in project /a2/tsconfig.json
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
        "fileName": "/a2/index.ts",
        "kind": "method",
        "name": "(method) I.FA(): any",
        "textSpan": {
         "start": 200,
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
         "start": 200,
         "length": 5
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 200,
          "length": 2
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 200,
          "length": 5
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 235,
          "length": 2
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 235,
          "length": 9
         },
         "isWriteAccess": true,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":8,"type":"request","arguments":{"file":"/b/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /b/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Creating configuration project /b/tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingStart",
     "body": {
      "projectName": "/b/tsconfig.json",
      "reason": "Creating possible configured project for /b/index.ts to open"
     }
    }
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/other.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/b/index.ts Text-1 "export namespace NS {\n    export function FB() {}\n}\n\nexport interface I {\n    FB();\n}\n\nconst ib: I = { FB() {} };"
	/b/other.ts Text-1 "export const Other = 1;"


	../lib.d.ts
	  Default library for target 'es5'
	../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../lib.d.ts'
	../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../lib.d.ts'
	index.ts
	  Part of 'files' list in tsconfig.json
	other.ts
	  Part of 'files' list in tsconfig.json

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "projectLoadingFinish",
     "body": {
      "projectName": "/b/tsconfig.json"
     }
    }
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/b/index.ts",
      "configFile": "/b/tsconfig.json",
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a2/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json,/a2/tsconfig.json,/b/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":9,"type":"request","arguments":{"file":"/b/index.ts","line":2,"offset":21},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 42 in project /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 42 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 42 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b/index.d.ts 2000 undefined Project: /b/tsconfig.json WatchType: Missing generated file
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
        "fileName": "/b/index.ts",
        "kind": "function",
        "name": "function NS.FB(): void",
        "textSpan": {
         "start": 42,
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
         "start": 26,
         "length": 23
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 42,
          "length": 2
         },
         "fileName": "/b/index.ts",
         "contextSpan": {
          "start": 26,
          "length": 23
         },
         "isWriteAccess": true,
         "isDefinition": true
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":10,"type":"request","arguments":{"file":"/b/index.ts","line":5,"offset":18},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 70 in project /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 70 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 70 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
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
        "fileName": "/b/index.ts",
        "kind": "interface",
        "name": "interface I",
        "textSpan": {
         "start": 70,
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
         "start": 53,
         "length": 32
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 70,
          "length": 1
         },
         "fileName": "/b/index.ts",
         "contextSpan": {
          "start": 53,
          "length": 32
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 97,
          "length": 1
         },
         "fileName": "/b/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":11,"type":"request","arguments":{"file":"/b/index.ts","line":6,"offset":5},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 78 in project /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 78 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /b/index.ts position 78 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /b
Info seq  [hh:mm:ss:mss] For info: /b/index.ts :: Config file name: /b/tsconfig.json
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
        "fileName": "/b/index.ts",
        "kind": "method",
        "name": "(method) I.FB(): any",
        "textSpan": {
         "start": 78,
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
         "start": 78,
         "length": 5
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 78,
          "length": 2
         },
         "fileName": "/b/index.ts",
         "contextSpan": {
          "start": 78,
          "length": 5
         },
         "isWriteAccess": false,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 103,
          "length": 2
         },
         "fileName": "/b/index.ts",
         "contextSpan": {
          "start": 103,
          "length": 7
         },
         "isWriteAccess": true,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":12,"type":"request","arguments":{"file":"/c/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /c/index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/tsconfig.json :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /tsconfig.json :: No config files found.
Info seq  [hh:mm:ss:mss] Project '/a/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/c/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/a2/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (6)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/b/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /a/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /a2/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /b/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json,/a2/tsconfig.json,/b/tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /c/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /a/tsconfig.json,/c/tsconfig.json,/a2/tsconfig.json
Info seq  [hh:mm:ss:mss] request:
    {"seq":13,"type":"request","arguments":{"file":"/c/index.ts","line":2,"offset":21},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 42 in project /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 42 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 42 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /c/index.d.ts 2000 undefined Project: /c/tsconfig.json WatchType: Missing generated file
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "references-full",
     "request_seq": 13,
     "success": true,
     "body": [
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/c/index.ts",
        "kind": "function",
        "name": "function NS.FC(): void",
        "textSpan": {
         "start": 42,
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
         "start": 26,
         "length": 23
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 42,
          "length": 2
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 26,
          "length": 23
         },
         "isWriteAccess": true,
         "isDefinition": true
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":14,"type":"request","arguments":{"file":"/c/index.ts","line":5,"offset":18},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 70 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "references-full",
     "request_seq": 14,
     "success": true,
     "body": [
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/c/index.ts",
        "kind": "interface",
        "name": "interface I",
        "textSpan": {
         "start": 70,
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
         "start": 53,
         "length": 32
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 70,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 53,
          "length": 32
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 97,
          "length": 1
         },
         "fileName": "/c/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 188,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 171,
          "length": 40
         },
         "isWriteAccess": true,
         "isDefinition": true
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      },
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/a2/index.ts",
        "kind": "alias",
        "name": "(alias) interface I\nimport I",
        "textSpan": {
         "start": 36,
         "length": 1
        },
        "displayParts": [
         {
          "text": "(",
          "kind": "punctuation"
         },
         {
          "text": "alias",
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
          "text": "interface",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         },
         {
          "text": "\n",
          "kind": "lineBreak"
         },
         {
          "text": "import",
          "kind": "keyword"
         },
         {
          "text": " ",
          "kind": "space"
         },
         {
          "text": "I",
          "kind": "aliasName"
         }
        ],
        "contextSpan": {
         "start": 27,
         "length": 25
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 36,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 27,
          "length": 25
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 225,
          "length": 1
         },
         "fileName": "/a2/index.ts",
         "isWriteAccess": false,
         "isDefinition": false
        }
       ]
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":15,"type":"request","arguments":{"file":"/c/index.ts","line":6,"offset":5},"command":"references-full"}
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 78 in project /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 78 in project /a/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Finding references to /c/index.ts position 78 in project /a2/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] Search path: /c
Info seq  [hh:mm:ss:mss] For info: /c/index.ts :: Config file name: /c/tsconfig.json
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "references-full",
     "request_seq": 15,
     "success": true,
     "body": [
      {
       "definition": {
        "containerKind": "",
        "containerName": "",
        "fileName": "/c/index.ts",
        "kind": "method",
        "name": "(method) I.FC(): any",
        "textSpan": {
         "start": 78,
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
         "start": 78,
         "length": 5
        }
       },
       "references": [
        {
         "textSpan": {
          "start": 78,
          "length": 2
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 78,
          "length": 5
         },
         "isWriteAccess": false,
         "isDefinition": true
        },
        {
         "textSpan": {
          "start": 103,
          "length": 2
         },
         "fileName": "/c/index.ts",
         "contextSpan": {
          "start": 103,
          "length": 7
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 250,
          "length": 2
         },
         "fileName": "/a/index.ts",
         "contextSpan": {
          "start": 250,
          "length": 8
         },
         "isWriteAccess": true,
         "isDefinition": false
        },
        {
         "textSpan": {
          "start": 250,
          "length": 2
         },
         "fileName": "/a2/index.ts",
         "contextSpan": {
          "start": 250,
          "length": 8
         },
         "isWriteAccess": true,
         "isDefinition": false
        }
       ]
      }
     ]
    }