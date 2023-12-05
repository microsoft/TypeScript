currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export class A {}

//// [/b.ts]
import type * as a from './a'; export { a };

//// [/c.ts]
import { a } from './b'; new a.A();

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }


Info seq  [hh:mm:ss:mss] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] Search path: /
Info seq  [hh:mm:ss:mss] For info: /c.ts :: No config files found.
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a.ts Text-1 "export class A {}"
	/b.ts Text-1 "import type * as a from './a'; export { a };"
	/c.ts SVC-1-0 "import { a } from './b'; new a.A();"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Imported via './a' from file 'b.ts'
	b.ts
	  Imported via './b' from file 'c.ts'
	c.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Project '/dev/null/inferredProject1*' (Inferred)
Info seq  [hh:mm:ss:mss] 	Files (4)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] Open files: 
Info seq  [hh:mm:ss:mss] 	FileName: /c.ts ProjectRootPath: undefined
Info seq  [hh:mm:ss:mss] 		Projects: /dev/null/inferredProject1*
Info seq  [hh:mm:ss:mss] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}
/b.ts: *new*
  {}

Before request

Info seq  [hh:mm:ss:mss] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info seq  [hh:mm:ss:mss] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 30
          },
          "end": {
            "line": 1,
            "offset": 31
          },
          "text": "'a' cannot be used as a value because it was imported using 'import type'.",
          "code": 1361,
          "category": "error",
          "relatedInformation": [
            {
              "span": {
                "start": {
                  "line": 1,
                  "offset": 18
                },
                "end": {
                  "line": 1,
                  "offset": 19
                },
                "file": "/b.ts"
              },
              "message": "'a' was imported here.",
              "category": "message",
              "code": 1376
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
