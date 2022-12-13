Info 0    [00:00:09.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Info 1    [00:00:10.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/file1.ts"
      },
      "seq": 1,
      "type": "request"
    }
Before request
//// [/a/b/file1.ts]
let t1 = "div";
let t2 = "div";
let t3 = { "div": 123 };
let t4 = t3["div"];


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 2    [00:00:11.000] Search path: /a/b
Info 3    [00:00:12.000] For info: /a/b/file1.ts :: No config files found.
Info 4    [00:00:13.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 5    [00:00:14.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /dev/null/inferredProject1* WatchType: Missing file
Info 6    [00:00:15.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:16.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 8    [00:00:17.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 9    [00:00:18.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 10   [00:00:19.000] 	Files (1)
	/a/b/file1.ts


	file1.ts
	  Root file specified for compilation

Info 11   [00:00:20.000] -----------------------------------------------
Info 12   [00:00:21.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 12   [00:00:22.000] 	Files (1)

Info 12   [00:00:23.000] -----------------------------------------------
Info 12   [00:00:24.000] Open files: 
Info 12   [00:00:25.000] 	FileName: /a/b/file1.ts ProjectRootPath: undefined
Info 12   [00:00:26.000] 		Projects: /dev/null/inferredProject1*
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 12   [00:00:27.000] response:
    {
      "responseRequired": false
    }
Info 13   [00:00:28.000] request:
    {
      "command": "occurrences",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 1,
        "offset": 11
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

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 14   [00:00:29.000] response:
    {
      "response": [
        {
          "start": {
            "line": 1,
            "offset": 11
          },
          "end": {
            "line": 1,
            "offset": 14
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": false,
          "isInString": true
        },
        {
          "start": {
            "line": 2,
            "offset": 11
          },
          "end": {
            "line": 2,
            "offset": 14
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": false,
          "isInString": true
        },
        {
          "start": {
            "line": 3,
            "offset": 13
          },
          "end": {
            "line": 3,
            "offset": 16
          },
          "contextStart": {
            "line": 3,
            "offset": 12
          },
          "contextEnd": {
            "line": 3,
            "offset": 22
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": true,
          "isInString": true
        },
        {
          "start": {
            "line": 4,
            "offset": 14
          },
          "end": {
            "line": 4,
            "offset": 17
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": false,
          "isInString": true
        }
      ],
      "responseRequired": true
    }
Info 15   [00:00:30.000] request:
    {
      "command": "occurrences",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 3,
        "offset": 13
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

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 16   [00:00:31.000] response:
    {
      "response": [
        {
          "start": {
            "line": 3,
            "offset": 13
          },
          "end": {
            "line": 3,
            "offset": 16
          },
          "contextStart": {
            "line": 3,
            "offset": 12
          },
          "contextEnd": {
            "line": 3,
            "offset": 22
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": true
        },
        {
          "start": {
            "line": 4,
            "offset": 14
          },
          "end": {
            "line": 4,
            "offset": 17
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": false
        }
      ],
      "responseRequired": true
    }
Info 17   [00:00:32.000] request:
    {
      "command": "occurrences",
      "arguments": {
        "file": "/a/b/file1.ts",
        "line": 4,
        "offset": 14
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

FsWatches::

FsWatchesRecursive::

After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::

FsWatchesRecursive::

Info 18   [00:00:33.000] response:
    {
      "response": [
        {
          "start": {
            "line": 3,
            "offset": 13
          },
          "end": {
            "line": 3,
            "offset": 16
          },
          "contextStart": {
            "line": 3,
            "offset": 12
          },
          "contextEnd": {
            "line": 3,
            "offset": 22
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": true
        },
        {
          "start": {
            "line": 4,
            "offset": 14
          },
          "end": {
            "line": 4,
            "offset": 17
          },
          "file": "/a/b/file1.ts",
          "isWriteAccess": false
        }
      ],
      "responseRequired": true
    }