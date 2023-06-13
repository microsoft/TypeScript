currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/dist/index.d.ts]
export declare class Foo {
    member: string;
    methodName(propName: SomeType): SomeType;
    otherMethod(): {
        x: number;
        y?: undefined;
    } | {
        y: string;
        x?: undefined;
    };
}
export interface SomeType {
    member: number;
}
//# sourceMappingURL=index.d.ts.map

//// [/dist/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"/","sources":["index.ts"],"names":[],"mappings":"AAAA,qBAAa,GAAG;IACZ,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,QAAQ;IACxC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}

//// [/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.methodName = function (propName) { return propName; };
    Foo.prototype.otherMethod = function () {
        if (Math.random() > 0.5) {
            return { x: 42 };
        }
        return { y: "yes" };
    };
    return Foo;
}());
exports.Foo = Foo;


//// [/index.ts]
export class Foo {
    member: string;
    methodName(propName: SomeType): SomeType { return propName; }
    otherMethod() {
        if (Math.random() > 0.5) {
            return {x: 42};
        }
        return {y: "yes"};
    }
}

export interface SomeType {
    member: number;
}

//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/mymodule.ts]
import * as mod from "/dist/index";
const instance = new mod.Foo();
instance.methodName({member: 12});

//// [/tsconfig.json]
{
    "compilerOptions": {
        "outDir": "./dist",
        "sourceRoot": "/",
        "declaration": true,
        "declarationMap": true,
        "newLine": "lf",
    },
    "files": ["/index.ts"],
}


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tsconfig.json"},"command":"open"}
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
  "/index.ts"
 ],
 "options": {
  "outDir": "/dist",
  "sourceRoot": "/",
  "declaration": true,
  "declarationMap": true,
  "newLine": 1,
  "configFilePath": "/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/index.ts Text-1 "export class Foo {\n    member: string;\n    methodName(propName: SomeType): SomeType { return propName; }\n    otherMethod() {\n        if (Math.random() > 0.5) {\n            return {x: 42};\n        }\n        return {y: \"yes\"};\n    }\n}\n\nexport interface SomeType {\n    member: number;\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

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
         "line": 4,
         "offset": 9
        },
        "end": {
         "line": 4,
         "offset": 21
        },
        "text": "Option 'sourceRoot can only be used when either option '--inlineSourceMap' or option '--sourceMap' is provided.",
        "code": 5051,
        "category": "error",
        "fileName": "/tsconfig.json"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tsconfig.json SVC-1-0 "{\n    \"compilerOptions\": {\n        \"outDir\": \"./dist\",\n        \"sourceRoot\": \"/\",\n        \"declaration\": true,\n        \"declarationMap\": true,\n        \"newLine\": \"lf\",\n    },\n    \"files\": [\"/index.ts\"],\n}"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	tsconfig.json
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
After Request
watchedFiles::
/index.ts: *new*
  {"pollingInterval":500}
/lib.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.d.ts: *new*
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts: *new*
  {"pollingInterval":500}
/tsconfig.json: *new*
  {"pollingInterval":2000}

Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /index.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /index.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
After Request
watchedFiles::
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

watchedFiles *deleted*::
/index.ts:
  {"pollingInterval":500}

Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/index.ts"},"command":"emit-output"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "emit-output",
     "request_seq": 2,
     "success": true,
     "body": {
      "outputFiles": [
       {
        "name": "/dist/index.js",
        "writeByteOrderMark": false,
        "text": "\"use strict\";\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Foo = void 0;\nvar Foo = /** @class */ (function () {\n    function Foo() {\n    }\n    Foo.prototype.methodName = function (propName) { return propName; };\n    Foo.prototype.otherMethod = function () {\n        if (Math.random() > 0.5) {\n            return { x: 42 };\n        }\n        return { y: \"yes\" };\n    };\n    return Foo;\n}());\nexports.Foo = Foo;\n"
       },
       {
        "name": "/dist/index.d.ts.map",
        "writeByteOrderMark": false,
        "text": "{\"version\":3,\"file\":\"index.d.ts\",\"sourceRoot\":\"/\",\"sources\":[\"index.ts\"],\"names\":[],\"mappings\":\"AAAA,qBAAa,GAAG;IACZ,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,QAAQ;IACxC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB\"}"
       },
       {
        "name": "/dist/index.d.ts",
        "writeByteOrderMark": false,
        "text": "export declare class Foo {\n    member: string;\n    methodName(propName: SomeType): SomeType;\n    otherMethod(): {\n        x: number;\n        y?: undefined;\n    } | {\n        y: string;\n        x?: undefined;\n    };\n}\nexport interface SomeType {\n    member: number;\n}\n//# sourceMappingURL=index.d.ts.map"
       }
      ],
      "emitSkipped": false,
      "diagnostics": []
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":3,"type":"request","arguments":{"file":"/mymodule.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /mymodule.ts :: Config file name: /tsconfig.json
Info seq  [hh:mm:ss:mss] event:
    {
     "seq": 0,
     "type": "event",
     "event": "configFileDiag",
     "body": {
      "triggerFile": "/mymodule.ts",
      "configFile": "/tsconfig.json",
      "diagnostics": [
       {
        "start": {
         "line": 4,
         "offset": 9
        },
        "end": {
         "line": 4,
         "offset": 21
        },
        "text": "Option 'sourceRoot can only be used when either option '--inlineSourceMap' or option '--sourceMap' is provided.",
        "code": 5051,
        "category": "error",
        "fileName": "/tsconfig.json"
       }
      ]
     }
    }
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /dist/index.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/dist/index.d.ts Text-1 "export declare class Foo {\n    member: string;\n    methodName(propName: SomeType): SomeType;\n    otherMethod(): {\n        x: number;\n        y?: undefined;\n    } | {\n        y: string;\n        x?: undefined;\n    };\n}\nexport interface SomeType {\n    member: number;\n}\n//# sourceMappingURL=index.d.ts.map"
	/mymodule.ts SVC-1-0 "import * as mod from \"/dist/index\";\nconst instance = new mod.Foo();\ninstance.methodName({member: 12});"


	lib.d.ts
	  Default library for target 'es5'
	lib.decorators.d.ts
	  Library referenced via 'decorators' from file 'lib.d.ts'
	lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file 'lib.d.ts'
	dist/index.d.ts
	  Imported via "/dist/index" from file 'mymodule.ts'
	mymodule.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tsconfig.json ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /tsconfig.json
Info seq  [hh:mm:ss:mss] 	FileName: /mymodule.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
After Request
watchedFiles::
/dist/index.d.ts: *new*
  {"pollingInterval":500}
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

Info seq  [hh:mm:ss:mss] request:
    {"seq":4,"type":"request","arguments":{"file":"/mymodule.ts","line":3,"offset":10},"command":"implementation"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /dist/index.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "implementation",
     "request_seq": 4,
     "success": true,
     "body": [
      {
       "file": "/index.ts",
       "start": {
        "line": 3,
        "offset": 5
       },
       "end": {
        "line": 3,
        "offset": 15
       },
       "contextStart": {
        "line": 3,
        "offset": 5
       },
       "contextEnd": {
        "line": 4,
        "offset": 5
       }
      }
     ]
    }
After Request
watchedFiles::
/dist/index.d.ts:
  {"pollingInterval":500}
/dist/index.d.ts.map: *new*
  {"pollingInterval":500}
/lib.d.ts:
  {"pollingInterval":500}
/lib.decorators.d.ts:
  {"pollingInterval":500}
/lib.decorators.legacy.d.ts:
  {"pollingInterval":500}
/tsconfig.json:
  {"pollingInterval":2000}

Info seq  [hh:mm:ss:mss] request:
    {"seq":5,"type":"request","arguments":{"file":"/mymodule.ts","line":3,"offset":10},"command":"typeDefinition"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "typeDefinition",
     "request_seq": 5,
     "success": true,
     "body": [
      {
       "file": "/index.ts",
       "start": {
        "line": 12,
        "offset": 18
       },
       "end": {
        "line": 12,
        "offset": 26
       },
       "contextStart": {
        "line": 12,
        "offset": 1
       },
       "contextEnd": {
        "line": 14,
        "offset": 2
       }
      }
     ]
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":6,"type":"request","arguments":{"file":"/mymodule.ts","line":3,"offset":10},"command":"definitionAndBoundSpan"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "definitionAndBoundSpan",
     "request_seq": 6,
     "success": true,
     "body": {
      "definitions": [
       {
        "file": "/index.ts",
        "start": {
         "line": 3,
         "offset": 5
        },
        "end": {
         "line": 3,
         "offset": 15
        },
        "contextStart": {
         "line": 3,
         "offset": 5
        },
        "contextEnd": {
         "line": 4,
         "offset": 5
        }
       }
      ],
      "textSpan": {
       "start": {
        "line": 3,
        "offset": 10
       },
       "end": {
        "line": 3,
        "offset": 20
       }
      }
     }
    }
Info seq  [hh:mm:ss:mss] request:
    {"seq":7,"type":"request","arguments":{"file":"/mymodule.ts","line":3,"offset":10},"command":"definition"}
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "definition",
     "request_seq": 7,
     "success": true,
     "body": [
      {
       "file": "/index.ts",
       "start": {
        "line": 3,
        "offset": 5
       },
       "end": {
        "line": 3,
        "offset": 15
       },
       "contextStart": {
        "line": 3,
        "offset": 5
       },
       "contextEnd": {
        "line": 4,
        "offset": 5
       }
      }
     ]
    }