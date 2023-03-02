Info 0    [00:00:29.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/node_modules/foo/index.d.ts]
export const foo: number;

//// [/a/node_modules/foo/package.json]
{"name":"foo","version":"1.2.3"}

//// [/b/node_modules/foo/index.d.ts]
export const foo: number;

//// [/b/node_modules/foo/package.json]
{"name":"foo","version":"1.2.3"}

//// [/a/user.ts]
import("foo");
foo

//// [/b/user.ts]
import("foo");
foo

//// [/tsconfig.json]
{}


Info 1    [00:00:30.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/user.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:31.000] Search path: /a
Info 3    [00:00:32.000] For info: /a/user.ts :: Config file name: /tsconfig.json
Info 4    [00:00:33.000] Creating configuration project /tsconfig.json
Info 5    [00:00:34.000] FileWatcher:: Added:: WatchInfo: /tsconfig.json 2000 undefined Project: /tsconfig.json WatchType: Config file
Info 6    [00:00:35.000] Config: /tsconfig.json : {
 "rootNames": [
  "/a/user.ts",
  "/b/user.ts"
 ],
 "options": {
  "configFilePath": "/tsconfig.json"
 }
}
Info 7    [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 8    [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo:  1 undefined Config: /tsconfig.json WatchType: Wild card directory
Info 9    [00:00:38.000] FileWatcher:: Added:: WatchInfo: /b/user.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:39.000] Starting updateGraphWorker: Project: /tsconfig.json
Info 11   [00:00:40.000] DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 12   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 13   [00:00:42.000] DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 14   [00:00:43.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b/node_modules 1 undefined WatchType: node_modules for closed script infos and package.jsons affecting module specifier cache
Info 15   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /a/node_modules/foo/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info 18   [00:00:47.000] DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:48.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /b 1 undefined Project: /tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:49.000] FileWatcher:: Added:: WatchInfo: /b/node_modules/foo/package.json 2000 undefined Project: /tsconfig.json WatchType: File location affecting resolution
Info 21   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined Project: /tsconfig.json WatchType: Missing file
Info 22   [00:00:51.000] Finishing updateGraphWorker: Project: /tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 23   [00:00:52.000] Project '/tsconfig.json' (Configured)
Info 24   [00:00:53.000] 	Files (4)
	/a/node_modules/foo/index.d.ts Text-1 "export const foo: number;"
	/a/user.ts SVC-1-0 "import(\"foo\");\nfoo"
	/b/node_modules/foo/index.d.ts Text-1 "export const foo: number;"
	/b/user.ts Text-1 "import(\"foo\");\nfoo"


	a/node_modules/foo/index.d.ts
	  Imported via "foo" from file 'a/user.ts' with packageId 'foo/index.d.ts@1.2.3'
	a/user.ts
	  Matched by default include pattern '**/*'
	b/node_modules/foo/index.d.ts
	  Imported via "foo" from file 'b/user.ts' with packageId 'foo/index.d.ts@1.2.3'
	  File redirects to file 'a/node_modules/foo/index.d.ts'
	b/user.ts
	  Matched by default include pattern '**/*'

Info 25   [00:00:54.000] -----------------------------------------------
Info 26   [00:00:55.000] Project '/tsconfig.json' (Configured)
Info 26   [00:00:56.000] 	Files (4)

Info 26   [00:00:57.000] -----------------------------------------------
Info 26   [00:00:58.000] Open files: 
Info 26   [00:00:59.000] 	FileName: /a/user.ts ProjectRootPath: undefined
Info 26   [00:01:00.000] 		Projects: /tsconfig.json
Info 26   [00:01:01.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts: *new*
  {"pollingInterval":500}

FsWatches::
/tsconfig.json: *new*
  {}
/b/user.ts: *new*
  {}
/a/node_modules/foo/package.json: *new*
  {}
/b/node_modules/foo/package.json: *new*
  {}

FsWatchesRecursive::
/: *new*
  {}
/a/node_modules: *new*
  {}
/b/node_modules: *new*
  {}
/a: *new*
  {}
/b: *new*
  {}

Before request

Info 27   [00:01:02.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/b/user.ts"
      },
      "seq": 2,
      "type": "request"
    }
Info 28   [00:01:03.000] FileWatcher:: Close:: WatchInfo: /b/user.ts 500 undefined WatchType: Closed Script info
Info 29   [00:01:04.000] Search path: /b
Info 30   [00:01:05.000] For info: /b/user.ts :: Config file name: /tsconfig.json
Info 31   [00:01:06.000] Project '/tsconfig.json' (Configured)
Info 31   [00:01:07.000] 	Files (4)

Info 31   [00:01:08.000] -----------------------------------------------
Info 31   [00:01:09.000] Open files: 
Info 31   [00:01:10.000] 	FileName: /a/user.ts ProjectRootPath: undefined
Info 31   [00:01:11.000] 		Projects: /tsconfig.json
Info 31   [00:01:12.000] 	FileName: /b/user.ts ProjectRootPath: undefined
Info 31   [00:01:13.000] 		Projects: /tsconfig.json
Info 31   [00:01:14.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.d.ts:
  {"pollingInterval":500}

FsWatches::
/tsconfig.json:
  {}
/a/node_modules/foo/package.json:
  {}
/b/node_modules/foo/package.json:
  {}

FsWatches *deleted*::
/b/user.ts:
  {}

FsWatchesRecursive::
/:
  {}
/a/node_modules:
  {}
/b/node_modules:
  {}
/a:
  {}
/b:
  {}

Before request

Info 32   [00:01:15.000] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/a/user.ts",
        "startLine": 2,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 3,
      "type": "request"
    }
Info 33   [00:01:16.000] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"foo\"",
          "changes": [
            {
              "fileName": "/a/user.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"foo\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request

Before request

Info 34   [00:01:17.000] request:
    {
      "command": "getCodeFixes",
      "arguments": {
        "file": "/b/user.ts",
        "startLine": 2,
        "startOffset": 1,
        "endLine": 2,
        "endOffset": 4,
        "errorCodes": [
          2304
        ]
      },
      "seq": 4,
      "type": "request"
    }
Info 35   [00:01:18.000] response:
    {
      "response": [
        {
          "fixName": "import",
          "description": "Add import from \"foo\"",
          "changes": [
            {
              "fileName": "/b/user.ts",
              "textChanges": [
                {
                  "start": {
                    "line": 1,
                    "offset": 1
                  },
                  "end": {
                    "line": 1,
                    "offset": 1
                  },
                  "newText": "import { foo } from \"foo\";\n\n"
                }
              ]
            }
          ]
        }
      ],
      "responseRequired": true
    }
After request
