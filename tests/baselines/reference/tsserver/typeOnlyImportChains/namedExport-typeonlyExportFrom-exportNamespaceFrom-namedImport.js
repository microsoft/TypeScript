currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:17.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a.ts]
export class A {}

//// [/b.ts]
export type { A } from './a';

//// [/c.ts]
export * as a from './b';

//// [/d.ts]
import { a } from './c'; new a.A();

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


Info 1    [00:00:18.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/d.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:19.000] Search path: /
Info 3    [00:00:20.000] For info: /d.ts :: No config files found.
Info 4    [00:00:21.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /c.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /b.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /a.ts 500 undefined WatchType: Closed Script info
Info 8    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:28.000] 	Files (5)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a.ts Text-1 "export class A {}"
	/b.ts Text-1 "export type { A } from './a';"
	/c.ts Text-1 "export * as a from './b';"
	/d.ts SVC-1-0 "import { a } from './c'; new a.A();"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	a.ts
	  Imported via './a' from file 'b.ts'
	b.ts
	  Imported via './b' from file 'c.ts'
	c.ts
	  Imported via './c' from file 'd.ts'
	d.ts
	  Root file specified for compilation

Info 12   [00:00:29.000] -----------------------------------------------
Info 13   [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:31.000] 	Files (5)

Info 13   [00:00:32.000] -----------------------------------------------
Info 13   [00:00:33.000] Open files: 
Info 13   [00:00:34.000] 	FileName: /d.ts ProjectRootPath: undefined
Info 13   [00:00:35.000] 		Projects: /dev/null/inferredProject1*
Info 13   [00:00:36.000] response:
    {
      "responseRequired": false
    }
After request

FsWatches::
/c.ts: *new*
  {}
/b.ts: *new*
  {}
/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Before request

Info 14   [00:00:37.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 15   [00:00:38.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 32
          },
          "end": {
            "line": 1,
            "offset": 33
          },
          "text": "Property 'A' does not exist on type 'typeof import(\"/b\")'.",
          "code": 2339,
          "category": "error"
        }
      ],
      "responseRequired": true
    }
After request
