Info 0    [00:00:11.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:12.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/file1.js]

                /// <reference path="file2.d.ts" />
                var x = 1;

//// [/a/b/file2.d.ts]

                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:13.000] Search path: /a/b
Info 3    [00:00:14.000] For info: /a/b/file1.js :: No config files found.
Info 4    [00:00:15.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:16.000] FileWatcher:: Added:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 6    [00:00:17.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 7    [00:00:18.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:19.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 9    [00:00:20.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:22.000] 	Files (2)
	/a/b/file2.d.ts
	/a/b/file1.js


	file2.d.ts
	  Referenced via 'file2.d.ts' from file 'file1.js'
	file1.js
	  Root file specified for compilation

Info 12   [00:00:23.000] -----------------------------------------------
Info 13   [00:00:24.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:25.000] 	Files (2)

Info 13   [00:00:26.000] -----------------------------------------------
Info 13   [00:00:27.000] Open files: 
Info 13   [00:00:28.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 13   [00:00:29.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/file2.d.ts:
  {}

FsWatchesRecursive::

Info 13   [00:00:30.000] response:
    {
      "responseRequired": false
    }
Info 14   [00:00:31.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 2,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/b/file2.d.ts:
  {}

FsWatchesRecursive::

Info 15   [00:00:32.000] FileWatcher:: Close:: WatchInfo: /a/b/file2.d.ts 500 undefined WatchType: Closed Script info
Info 16   [00:00:33.000] Search path: /a/b
Info 17   [00:00:34.000] For info: /a/b/file2.d.ts :: No config files found.
Info 18   [00:00:35.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 18   [00:00:36.000] 	Files (2)

Info 18   [00:00:37.000] -----------------------------------------------
Info 18   [00:00:38.000] Open files: 
Info 18   [00:00:39.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 18   [00:00:40.000] 		Projects: /dev/null/inferredProject1*
Info 18   [00:00:41.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 18   [00:00:42.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 18   [00:00:43.000] response:
    {
      "responseRequired": false
    }
Info 19   [00:00:44.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 3,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 20   [00:00:45.000] response:
    {
      "response": [],
      "responseRequired": true
    }
Info 21   [00:00:46.000] request:
    {
      "command": "close",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 4,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 22   [00:00:47.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 23   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 24   [00:00:49.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 25   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 26   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:52.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 28   [00:00:53.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 29   [00:00:54.000] 	Files (1)
	/a/b/file2.d.ts


	file2.d.ts
	  Root file specified for compilation

Info 30   [00:00:55.000] -----------------------------------------------
Info 31   [00:00:56.000] FileWatcher:: Added:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 32   [00:00:57.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 32   [00:00:58.000] 	Files (1)

Info 32   [00:00:59.000] -----------------------------------------------
Info 32   [00:01:00.000] Open files: 
Info 32   [00:01:01.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 32   [00:01:02.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}

FsWatchesRecursive::

Info 32   [00:01:03.000] response:
    {
      "responseRequired": false
    }
Info 33   [00:01:04.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 5,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}

FsWatchesRecursive::

Info 34   [00:01:05.000] response:
    {
      "response": [
        {
          "start": {
            "line": 4,
            "offset": 18
          },
          "end": {
            "line": 4,
            "offset": 19
          },
          "text": "Statements are not allowed in ambient contexts.",
          "code": 1036,
          "category": "error"
        },
        {
          "start": {
            "line": 6,
            "offset": 21
          },
          "end": {
            "line": 6,
            "offset": 25
          },
          "text": "Subsequent property declarations must have the same type.  Property 'name' must be of type 'string', but here has type 'number'.",
          "code": 2717,
          "category": "error",
          "relatedInformation": [
            {
              "span": {
                "start": {
                  "line": 3,
                  "offset": 21
                },
                "end": {
                  "line": 3,
                  "offset": 25
                },
                "file": "/a/b/file2.d.ts"
              },
              "message": "'name' was also declared here.",
              "category": "message",
              "code": 6203
            }
          ]
        }
      ],
      "responseRequired": true
    }
Info 35   [00:01:06.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.js"
      },
      "seq": 6,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/file1.js:
  {}

FsWatchesRecursive::

Info 36   [00:01:07.000] FileWatcher:: Close:: WatchInfo: /a/b/file1.js 500 undefined WatchType: Closed Script info
Info 37   [00:01:08.000] Search path: /a/b
Info 38   [00:01:09.000] For info: /a/b/file1.js :: No config files found.
Info 39   [00:01:10.000] Starting updateGraphWorker: Project: /dev/null/inferredProject2*
Info 40   [00:01:11.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject2* WatchType: Missing file
Info 41   [00:01:12.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 42   [00:01:13.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject2* WatchType: Type roots
Info 43   [00:01:14.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject2* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 44   [00:01:15.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 45   [00:01:16.000] 	Files (2)
	/a/b/file2.d.ts
	/a/b/file1.js


	file2.d.ts
	  Referenced via 'file2.d.ts' from file 'file1.js'
	file1.js
	  Root file specified for compilation

Info 46   [00:01:17.000] -----------------------------------------------
Info 47   [00:01:18.000] `remove Project::
Info 48   [00:01:19.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 49   [00:01:20.000] 	Files (1)
	/a/b/file2.d.ts


	file2.d.ts
	  Root file specified for compilation

Info 50   [00:01:21.000] -----------------------------------------------
Info 51   [00:01:22.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 52   [00:01:23.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 53   [00:01:24.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 54   [00:01:25.000] Project '/dev/null/inferredProject2*' (Inferred)
Info 54   [00:01:26.000] 	Files (2)

Info 54   [00:01:27.000] -----------------------------------------------
Info 54   [00:01:28.000] Open files: 
Info 54   [00:01:29.000] 	FileName: /a/b/file2.d.ts ProjectRootPath: undefined
Info 54   [00:01:30.000] 		Projects: /dev/null/inferredProject2*
Info 54   [00:01:31.000] 	FileName: /a/b/file1.js ProjectRootPath: undefined
Info 54   [00:01:32.000] 		Projects: /dev/null/inferredProject2*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 54   [00:01:33.000] response:
    {
      "responseRequired": false
    }
Info 55   [00:01:34.000] request:
    {
      "command": "semanticDiagnosticsSync",
      "arguments": {
        "file": "/a/b/file2.d.ts"
      },
      "seq": 7,
      "type": "request"
    }
Before request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/bower_components:
  {"pollingInterval":500}
/a/b/node_modules:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 56   [00:01:35.000] response:
    {
      "response": [],
      "responseRequired": true
    }