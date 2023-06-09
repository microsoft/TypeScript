currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
//// [/lib.d.ts]
lib.d.ts-Text

//// [/lib.decorators.d.ts]
lib.decorators.d.ts-Text

//// [/lib.decorators.legacy.d.ts]
lib.decorators.legacy.d.ts-Text

//// [/tests/cases/fourslash/server/index.ts]
export class Foo {
    member: string;
    methodName(propName: SomeType): void {}
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

//// [/tests/cases/fourslash/server/indexdef.d.ts]
export declare class Foo {
    member: string;
    methodName(propName: SomeType): void;
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
//# sourceMappingURL=indexdef.d.ts.map

//// [/tests/cases/fourslash/server/indexdef.d.ts.map]
{"version":3,"file":"indexdef.d.ts","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA;IACI,MAAM,EAAE,MAAM,CAAC;IACf,UAAU,CAAC,QAAQ,EAAE,QAAQ,GAAG,IAAI;IACpC,WAAW;;;;;;;CAMd;AAED,MAAM,WAAW,QAAQ;IACrB,MAAM,EAAE,MAAM,CAAC;CAClB"}

//// [/tests/cases/fourslash/server/mymodule.ts]
import * as mod from "./indexdef";
const instance = new mod.Foo();
instance.methodName({member: 12});


Info seq  [hh:mm:ss:mss] request:
    {"seq":0,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/index.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/index.ts :: No config files found.
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /lib.decorators.legacy.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/index.ts SVC-1-0 "export class Foo {\n    member: string;\n    methodName(propName: SomeType): void {}\n    otherMethod() {\n        if (Math.random() > 0.5) {\n            return {x: 42};\n        }\n        return {y: \"yes\"};\n    }\n}\n\nexport interface SomeType {\n    member: number;\n}"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	index.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] request:
    {"seq":1,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/mymodule.ts"},"command":"open"}
Info seq  [hh:mm:ss:mss] Search path: /tests/cases/fourslash/server
Info seq  [hh:mm:ss:mss] For info: /tests/cases/fourslash/server/mymodule.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server 0 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/indexdef.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules 1 undefined Project: /dev/null/inferredProject2* WatchType: Failed Lookup Locations
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /tests/cases/fourslash/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)
	/lib.d.ts Text-1 lib.d.ts-Text
	/lib.decorators.d.ts Text-1 lib.decorators.d.ts-Text
	/lib.decorators.legacy.d.ts Text-1 lib.decorators.legacy.d.ts-Text
	/tests/cases/fourslash/server/indexdef.d.ts Text-1 "export declare class Foo {\n    member: string;\n    methodName(propName: SomeType): void;\n    otherMethod(): {\n        x: number;\n        y?: undefined;\n    } | {\n        y: string;\n        x?: undefined;\n    };\n}\nexport interface SomeType {\n    member: number;\n}\n//# sourceMappingURL=indexdef.d.ts.map"
	/tests/cases/fourslash/server/mymodule.ts SVC-1-0 "import * as mod from \"./indexdef\";\nconst instance = new mod.Foo();\ninstance.methodName({member: 12});"


	../../../../lib.d.ts
	  Default library for target 'es5'
	../../../../lib.decorators.d.ts
	  Library referenced via 'decorators' from file '../../../../lib.d.ts'
	../../../../lib.decorators.legacy.d.ts
	  Library referenced via 'decorators.legacy' from file '../../../../lib.d.ts'
	indexdef.d.ts
	  Imported via "./indexdef" from file 'mymodule.ts'
	mymodule.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject2*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (5)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/index.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] 	FileName: /tests/cases/fourslash/server/mymodule.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject2*
Info seq  [hh:mm:ss:mss] request:
    {"seq":2,"type":"request","arguments":{"file":"/tests/cases/fourslash/server/mymodule.ts","line":3,"offset":10},"command":"definitionAndBoundSpan"}
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /tests/cases/fourslash/server/indexdef.d.ts.map 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] response:
    {
     "seq": 0,
     "type": "response",
     "command": "definitionAndBoundSpan",
     "request_seq": 2,
     "success": true,
     "body": {
      "definitions": [
       {
        "file": "/tests/cases/fourslash/server/index.ts",
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