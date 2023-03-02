Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/a.ts]
export function fnA() {}
export interface IfaceA {}
export const instanceA: IfaceA = {};

//// [/a/bin/a.d.ts.map]
{"version":3,"file":"a.d.ts","sourceRoot":"","sources":["../a.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAK;AACxB,MAAM,WAAW,MAAM;CAAG;AAC1B,eAAO,MAAM,SAAS,EAAE,MAAW,CAAC","sourcesContent":["export function fnA() {}\nexport interface IfaceA {}\nexport const instanceA: IfaceA = {};"]}

//// [/a/bin/a.d.ts]
export declare function fnA(): void;
export interface IfaceA {
}
export declare const instanceA: IfaceA;
//# sourceMappingURL=a.d.ts.map

//// [/b/b.ts]
export function fnB() {}

//// [/b/bin/b.d.ts.map]
{"version":3,"file":"b.d.ts","sourceRoot":"","sources":["../b.ts"],"names":[],"mappings":"AAAA,wBAAgB,GAAG,SAAK"}

//// [/b/bin/b.d.ts]
export declare function fnB(): void;
//# sourceMappingURL=b.d.ts.map

//// [/user/user.ts]
import * as a from "../a/bin/a";
import * as b from "../b/bin/b";
export function fnUser() { a.fnA(); b.fnB(); a.instanceA; }

//// [/dummy/dummy.ts]
let a = 10;


Info 1    [00:00:32.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:33.000] Search path: /user
Info 3    [00:00:34.000] For info: /user/user.ts :: No config files found.
Info 4    [00:00:35.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info 7    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 8    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 10   [00:00:41.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:42.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:43.000] 	Files (3)
	/a/bin/a.d.ts Text-1 "export declare function fnA(): void;\nexport interface IfaceA {\n}\nexport declare const instanceA: IfaceA;\n//# sourceMappingURL=a.d.ts.map"
	/b/bin/b.d.ts Text-1 "export declare function fnB(): void;\n//# sourceMappingURL=b.d.ts.map"
	/user/user.ts SVC-1-0 "import * as a from \"../a/bin/a\";\nimport * as b from \"../b/bin/b\";\nexport function fnUser() { a.fnA(); b.fnB(); a.instanceA; }"


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info 13   [00:00:44.000] -----------------------------------------------
Info 14   [00:00:45.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:46.000] 	Files (3)

Info 14   [00:00:47.000] -----------------------------------------------
Info 14   [00:00:48.000] Open files: 
Info 14   [00:00:49.000] 	FileName: /user/user.ts ProjectRootPath: undefined
Info 14   [00:00:50.000] 		Projects: /dev/null/inferredProject1*
Info 14   [00:00:51.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}
/user/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts: *new*
  {}
/b/bin/b.d.ts: *new*
  {}

Before request

Info 15   [00:00:52.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/user.ts",
        "line": 3,
        "offset": 30
      },
      "seq": 2,
      "type": "request"
    }
Info 16   [00:00:53.000] FileWatcher:: Added:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info 17   [00:00:54.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/a/bin/a.d.ts",
            "start": {
              "line": 1,
              "offset": 25
            },
            "end": {
              "line": 1,
              "offset": 28
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 37
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 30
          },
          "end": {
            "line": 3,
            "offset": 33
          }
        }
      },
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map: *new*
  {}

Before request

Info 18   [00:00:55.000] request:
    {
      "command": "definitionAndBoundSpan",
      "arguments": {
        "file": "/user/user.ts",
        "line": 3,
        "offset": 39
      },
      "seq": 3,
      "type": "request"
    }
Info 19   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info 20   [00:00:57.000] FileWatcher:: Added:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 21   [00:00:58.000] response:
    {
      "response": {
        "definitions": [
          {
            "file": "/b/b.ts",
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
              "offset": 25
            }
          }
        ],
        "textSpan": {
          "start": {
            "line": 3,
            "offset": 39
          },
          "end": {
            "line": 3,
            "offset": 42
          }
        }
      },
      "responseRequired": true
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/bin/b.d.ts.map: *new*
  {}
/b/b.ts: *new*
  {}

Before request

Info 22   [00:00:59.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/user/user.ts"
      },
      "seq": 4,
      "type": "request"
    }
Info 23   [00:01:00.000] FileWatcher:: Added:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info 24   [00:01:01.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 24   [00:01:02.000] 	Files (3)

Info 24   [00:01:03.000] -----------------------------------------------
Info 24   [00:01:04.000] Open files: 
Info 24   [00:01:05.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/bin/b.d.ts.map:
  {}
/b/b.ts:
  {}
/user/user.ts: *new*
  {}

Before request

Info 25   [00:01:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/dummy/dummy.ts"
      },
      "seq": 5,
      "type": "request"
    }
Info 26   [00:01:07.000] Search path: /dummy
Info 27   [00:01:08.000] For info: /dummy/dummy.ts :: No config files found.
Info 28   [00:01:09.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 29   [00:01:10.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 30   [00:01:11.000] DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 31   [00:01:12.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /dummy/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 32   [00:01:13.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 33   [00:01:14.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 34   [00:01:15.000] 	Files (1)
	/dummy/dummy.ts SVC-1-0 "let a = 10;"


	dummy.ts
	  Root file specified for compilation

Info 35   [00:01:16.000] -----------------------------------------------
Info 36   [00:01:17.000] `remove Project::
Info 37   [00:01:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 38   [00:01:19.000] 	Files (3)
	/a/bin/a.d.ts
	/b/bin/b.d.ts
	/user/user.ts


	../a/bin/a.d.ts
	  Imported via "../a/bin/a" from file 'user.ts'
	../b/bin/b.d.ts
	  Imported via "../b/bin/b" from file 'user.ts'
	user.ts
	  Root file specified for compilation

Info 39   [00:01:20.000] -----------------------------------------------
Info 40   [00:01:21.000] DirectoryWatcher:: Close:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 41   [00:01:22.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 42   [00:01:23.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 43   [00:01:24.000] FileWatcher:: Close:: WatchInfo: /user/user.ts 500 undefined WatchType: Closed Script info
Info 44   [00:01:25.000] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts 500 undefined WatchType: Closed Script info
Info 45   [00:01:26.000] FileWatcher:: Close:: WatchInfo: /b/bin/b.d.ts 500 undefined WatchType: Closed Script info
Info 46   [00:01:27.000] FileWatcher:: Close:: WatchInfo: /a/bin/a.d.ts.map 500 undefined WatchType: Closed Script info
Info 47   [00:01:28.000] FileWatcher:: Close:: WatchInfo: /b/bin/b.d.ts.map 500 undefined WatchType: Closed Script info
Info 48   [00:01:29.000] FileWatcher:: Close:: WatchInfo: /b/b.ts 500 undefined WatchType: Closed Script info
Info 49   [00:01:30.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 49   [00:01:31.000] 	Files (1)

Info 49   [00:01:32.000] -----------------------------------------------
Info 49   [00:01:33.000] Open files: 
Info 49   [00:01:34.000] 	FileName: /dummy/dummy.ts ProjectRootPath: undefined
Info 49   [00:01:35.000] 		Projects: /dev/null/inferredProject2*
Info 49   [00:01:36.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/dummy/node_modules/@types: *new*
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/node_modules/@types:
  {"pollingInterval":500}

FsWatches *deleted*::
/a/bin/a.d.ts:
  {}
/b/bin/b.d.ts:
  {}
/a/bin/a.d.ts.map:
  {}
/b/bin/b.d.ts.map:
  {}
/b/b.ts:
  {}
/user/user.ts:
  {}
