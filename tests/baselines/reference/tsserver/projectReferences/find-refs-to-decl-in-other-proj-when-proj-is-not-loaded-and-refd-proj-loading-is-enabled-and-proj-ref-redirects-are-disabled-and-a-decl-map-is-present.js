Info 0    [00:00:31.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:32.000] request:
    {
      "seq": 0,
      "type": "request",
      "command": "open",
      "arguments": {
        "file": "/user/username/projects/myproject/a/index.ts"
      }
    }
Before request
//// [/user/username/projects/myproject/a/tsconfig.json]
{
        "compilerOptions": {"disableReferencedProjectLoad":false,"disableSourceOfProjectReferenceRedirect":true,"composite":true},
        "references": [{ "path": "../b" }]
    }

//// [/user/username/projects/myproject/a/index.ts]
import { B } from "../b/lib";

const b: B = new B();

//// [/user/username/projects/myproject/b/tsconfig.json]
{
"compilerOptions": {
    "declarationMap": true,
    "outDir": "lib",
    "composite": true
}
}

//// [/user/username/projects/myproject/b/index.ts]
export class B {
    M() {}
}

//// [/user/username/projects/myproject/b/helper.ts]
import { B } from ".";

const b: B = new B();

//// [/user/username/projects/myproject/b/lib/index.d.ts]
export declare class B {
    M(): void;
}
//# sourceMappingURL=index.d.ts.map

//// [/user/username/projects/myproject/b/lib/index.d.ts.map]
{"version":3,"file":"index.d.ts","sourceRoot":"","sources":["../index.ts"],"names":[],"mappings":"AAAA,qBAAa,CAAC;IACV,CAAC;CACJ"}


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:33.000] Search path: /user/username/projects/myproject/a
Info 3    [00:00:34.000] For info: /user/username/projects/myproject/a/index.ts :: Config file name: /user/username/projects/myproject/a/tsconfig.json
Info 4    [00:00:35.000] Creating configuration project /user/username/projects/myproject/a/tsconfig.json
Info 5    [00:00:36.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Config file
Info 6    [00:00:37.000] Config: /user/username/projects/myproject/a/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/a/index.ts"
 ],
 "options": {
  "disableReferencedProjectLoad": false,
  "disableSourceOfProjectReferenceRedirect": true,
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/a/tsconfig.json"
 },
 "projectReferences": [
  {
   "path": "/user/username/projects/myproject/b",
   "originalPath": "../b"
  }
 ]
}
Info 7    [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a 1 undefined Config: /user/username/projects/myproject/a/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:40.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json
Info 10   [00:00:41.000] Config: /user/username/projects/myproject/b/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/b/helper.ts",
  "/user/username/projects/myproject/b/index.ts"
 ],
 "options": {
  "declarationMap": true,
  "outDir": "/user/username/projects/myproject/b/lib",
  "composite": true,
  "configFilePath": "/user/username/projects/myproject/b/tsconfig.json"
 }
}
Info 11   [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Config file
Info 12   [00:00:43.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 13   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Config: /user/username/projects/myproject/b/tsconfig.json WatchType: Wild card directory
Info 14   [00:00:45.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:46.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/lib/index.d.ts 500 undefined WatchType: Closed Script info
Info 17   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Missing file
Info 18   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 19   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/a/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 20   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 21   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/a/tsconfig.json WatchType: Type roots
Info 22   [00:00:53.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/a/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:54.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 24   [00:00:55.000] 	Files (2)
	/user/username/projects/myproject/b/lib/index.d.ts
	/user/username/projects/myproject/a/index.ts


	../b/lib/index.d.ts
	  Imported via "../b/lib" from file 'index.ts'
	index.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:56.000] -----------------------------------------------
Info 26   [00:00:57.000] Search path: /user/username/projects/myproject/a
Info 27   [00:00:58.000] For info: /user/username/projects/myproject/a/tsconfig.json :: No config files found.
Info 28   [00:00:59.000] Project '/user/username/projects/myproject/a/tsconfig.json' (Configured)
Info 28   [00:01:00.000] 	Files (2)

Info 28   [00:01:01.000] -----------------------------------------------
Info 28   [00:01:02.000] Open files: 
Info 28   [00:01:03.000] 	FileName: /user/username/projects/myproject/a/index.ts ProjectRootPath: undefined
Info 28   [00:01:04.000] 		Projects: /user/username/projects/myproject/a/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/b/lib/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/b:
  {}

Info 28   [00:01:05.000] response:
    {
      "responseRequired": false
    }
Info 29   [00:01:06.000] request:
    {
      "command": "references",
      "arguments": {
        "file": "/user/username/projects/myproject/a/index.ts",
        "line": 3,
        "offset": 10
      },
      "seq": 1,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/b/lib/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/b:
  {}

Info 30   [00:01:07.000] Finding references to /user/username/projects/myproject/a/index.ts position 40 in project /user/username/projects/myproject/a/tsconfig.json
Info 31   [00:01:08.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/lib/index.d.ts.map 500 undefined WatchType: Closed Script info
Info 32   [00:01:09.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/index.ts 500 undefined WatchType: Closed Script info
Info 33   [00:01:10.000] Search path: /user/username/projects/myproject/b
Info 34   [00:01:11.000] For info: /user/username/projects/myproject/b/index.ts :: Config file name: /user/username/projects/myproject/b/tsconfig.json
Info 35   [00:01:12.000] Creating configuration project /user/username/projects/myproject/b/tsconfig.json
Info 36   [00:01:13.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/helper.ts 500 undefined WatchType: Closed Script info
Info 37   [00:01:14.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json
Info 38   [00:01:15.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 0 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Failed Lookup Locations
Info 39   [00:01:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b 0 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Failed Lookup Locations
Info 40   [00:01:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Missing file
Info 41   [00:01:18.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 42   [00:01:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 43   [00:01:20.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 44   [00:01:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/b/tsconfig.json WatchType: Type roots
Info 45   [00:01:22.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 46   [00:01:23.000] Project '/user/username/projects/myproject/b/tsconfig.json' (Configured)
Info 47   [00:01:24.000] 	Files (2)
	/user/username/projects/myproject/b/index.ts
	/user/username/projects/myproject/b/helper.ts


	index.ts
	  Imported via "." from file 'helper.ts'
	  Matched by default include pattern '**/*'
	helper.ts
	  Matched by default include pattern '**/*'

Info 48   [00:01:25.000] -----------------------------------------------
Info 49   [00:01:26.000] Search path: /user/username/projects/myproject/b
Info 50   [00:01:27.000] For info: /user/username/projects/myproject/b/index.ts :: Config file name: /user/username/projects/myproject/b/tsconfig.json
Info 51   [00:01:28.000] Finding references to /user/username/projects/myproject/b/index.ts position 13 in project /user/username/projects/myproject/b/tsconfig.json
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/user/username/projects/myproject/a/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/a/tsconfig.json:
  {}
/user/username/projects/myproject/b/tsconfig.json:
  {}
/user/username/projects/myproject/b/lib/index.d.ts:
  {}
/user/username/projects/myproject/b/lib/index.d.ts.map:
  {}
/user/username/projects/myproject/b/index.ts:
  {}
/user/username/projects/myproject/b/helper.ts:
  {}
/user/username/projects/myproject/b:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/a:
  {}
/user/username/projects/myproject/b:
  {}

Info 52   [00:01:29.000] response:
    {
      "response": {
        "refs": [
          {
            "file": "/user/username/projects/myproject/a/index.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 30
            },
            "lineText": "import { B } from \"../b/lib\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/myproject/a/index.ts",
            "start": {
              "line": 3,
              "offset": 10
            },
            "end": {
              "line": 3,
              "offset": 11
            },
            "lineText": "const b: B = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/myproject/a/index.ts",
            "start": {
              "line": 3,
              "offset": 18
            },
            "end": {
              "line": 3,
              "offset": 19
            },
            "lineText": "const b: B = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/myproject/b/index.ts",
            "start": {
              "line": 1,
              "offset": 14
            },
            "end": {
              "line": 1,
              "offset": 15
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 3,
              "offset": 2
            },
            "lineText": "export class B {",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/myproject/b/helper.ts",
            "start": {
              "line": 1,
              "offset": 10
            },
            "end": {
              "line": 1,
              "offset": 11
            },
            "contextStart": {
              "line": 1,
              "offset": 1
            },
            "contextEnd": {
              "line": 1,
              "offset": 23
            },
            "lineText": "import { B } from \".\";",
            "isWriteAccess": true
          },
          {
            "file": "/user/username/projects/myproject/b/helper.ts",
            "start": {
              "line": 3,
              "offset": 10
            },
            "end": {
              "line": 3,
              "offset": 11
            },
            "lineText": "const b: B = new B();",
            "isWriteAccess": false
          },
          {
            "file": "/user/username/projects/myproject/b/helper.ts",
            "start": {
              "line": 3,
              "offset": 18
            },
            "end": {
              "line": 3,
              "offset": 19
            },
            "lineText": "const b: B = new B();",
            "isWriteAccess": false
          }
        ],
        "symbolName": "B",
        "symbolStartOffset": 10,
        "symbolDisplayString": "(alias) class B\nimport B"
      },
      "responseRequired": true
    }