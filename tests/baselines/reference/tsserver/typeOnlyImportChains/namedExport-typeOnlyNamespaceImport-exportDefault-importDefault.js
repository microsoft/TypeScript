currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export class A {}

//// [/b.ts]
import type * as a from './a'; export default a;

//// [/c.ts]
import a from './b'; new a.A();

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


Info 1    [00:00:16.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:17.000] Search path: /
Info 3    [00:00:18.000] For info: /c.ts :: No config files found.
Info 4    [00:00:19.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:20.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:21.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:23.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:25.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a.ts Text-1 "export class A {}"
	/b.ts Text-1 "import type * as a from './a'; export default a;"
	/c.ts SVC-1-0 "import a from './b'; new a.A();"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Imported via './a' from file 'b.ts'
	b.ts
	  Imported via './b' from file 'c.ts'
	c.ts
	  Root file specified for compilation

Info 11   [00:00:26.000] -----------------------------------------------
Info 12   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:28.000] 	Files (4)

Info 12   [00:00:29.000] -----------------------------------------------
Info 12   [00:00:30.000] Open files: 
Info 12   [00:00:31.000] 	FileName: /c.ts ProjectRootPath: undefined
Info 12   [00:00:32.000] 		Projects: /dev/null/inferredProject1*
Info 12   [00:00:33.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/b.ts: *new*
  {}
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 13   [00:00:34.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/c.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 14   [00:00:35.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 26
          },
          "end": {
            "line": 1,
            "offset": 27
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
