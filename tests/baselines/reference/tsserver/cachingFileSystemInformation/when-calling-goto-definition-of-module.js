Info 0    [00:00:23.000] Provided types map file "/a/lib/typesMap.json" doesn't exist
Before request
//// [/a/b/controllers/vessels/client.ts]

                    import { Vessel } from '~/models/vessel';
                    const v = new Vessel();
                

//// [/a/b/utils/db.ts]
export class Bookshelf { }

//// [/a/b/models/vessel.ts]

                    import { Bookshelf } from '~/utils/db';
                    export class Vessel extends Bookshelf {}
                

//// [/a/b/tsconfig.json]
{"compilerOptions":{"target":"es6","module":"es6","baseUrl":"./","paths":{"~/*":["*"]}},"exclude":["api","build","node_modules","public","seeds","sql_updates","tests.build"]}


Info 1    [00:00:24.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/controllers/vessels/client.ts"
      },
      "seq": 1,
      "type": "request"
    }
Info 2    [00:00:25.000] Search path: /a/b/controllers/vessels
Info 3    [00:00:26.000] For info: /a/b/controllers/vessels/client.ts :: Config file name: /a/b/tsconfig.json
Info 4    [00:00:27.000] Creating configuration project /a/b/tsconfig.json
Info 5    [00:00:28.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 6    [00:00:29.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/controllers/vessels/client.ts",
  "/a/b/models/vessel.ts",
  "/a/b/utils/db.ts"
 ],
 "options": {
  "target": 2,
  "module": 5,
  "baseUrl": "/a/b",
  "paths": {
   "~/*": [
    "*"
   ]
  },
  "pathsBasePath": "/a/b",
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b 1 undefined Config: /a/b/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/b/utils/db.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 12   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 13   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 14   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 15   [00:00:38.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:39.000] Project '/a/b/tsconfig.json' (Configured)
Info 17   [00:00:40.000] 	Files (3)
	/a/b/utils/db.ts Text-1 "export class Bookshelf { }"
	/a/b/models/vessel.ts Text-1 "\n                    import { Bookshelf } from '~/utils/db';\n                    export class Vessel extends Bookshelf {}\n                "
	/a/b/controllers/vessels/client.ts SVC-1-0 "\n                    import { Vessel } from '~/models/vessel';\n                    const v = new Vessel();\n                "


	utils/db.ts
	  Imported via '~/utils/db' from file 'models/vessel.ts'
	  Matched by default include pattern '**/*'
	models/vessel.ts
	  Imported via '~/models/vessel' from file 'controllers/vessels/client.ts'
	  Matched by default include pattern '**/*'
	controllers/vessels/client.ts
	  Matched by default include pattern '**/*'

Info 18   [00:00:41.000] -----------------------------------------------
Info 19   [00:00:42.000] Project '/a/b/tsconfig.json' (Configured)
Info 19   [00:00:43.000] 	Files (3)

Info 19   [00:00:44.000] -----------------------------------------------
Info 19   [00:00:45.000] Open files: 
Info 19   [00:00:46.000] 	FileName: /a/b/controllers/vessels/client.ts ProjectRootPath: undefined
Info 19   [00:00:47.000] 		Projects: /a/b/tsconfig.json
Info 19   [00:00:48.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts: *new*
  {"pollingInterval":500}
/a/b/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json: *new*
  {}
/a/b/models/vessel.ts: *new*
  {}
/a/b/utils/db.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Before request

Info 20   [00:00:49.000] request:
    {
      "command": "definition",
      "arguments": {
        "file": "/a/b/controllers/vessels/client.ts",
        "position": 54
      },
      "seq": 2,
      "type": "request"
    }
Info 21   [00:00:50.000] response:
    {
      "response": [
        {
          "file": "/a/b/models/vessel.ts",
          "start": {
            "line": 2,
            "offset": 21
          },
          "end": {
            "line": 4,
            "offset": 17
          }
        }
      ],
      "responseRequired": true
    }
After request

Info 22   [00:00:51.000] fileExists:: []
Info 23   [00:00:52.000] directoryExists:: []
Info 24   [00:00:53.000] getDirectories:: []
Info 25   [00:00:54.000] readFile:: []
Info 26   [00:00:55.000] readDirectory:: []
Before request

Info 27   [00:00:56.000] request:
    {
      "command": "open",
      "arguments": {
        "file": "/a/b/models/vessel.ts"
      },
      "seq": 3,
      "type": "request"
    }
Info 28   [00:00:57.000] FileWatcher:: Close:: WatchInfo: /a/b/models/vessel.ts 500 undefined WatchType: Closed Script info
Info 29   [00:00:58.000] Search path: /a/b/models
Info 30   [00:00:59.000] For info: /a/b/models/vessel.ts :: Config file name: /a/b/tsconfig.json
Info 31   [00:01:00.000] Project '/a/b/tsconfig.json' (Configured)
Info 31   [00:01:01.000] 	Files (3)

Info 31   [00:01:02.000] -----------------------------------------------
Info 31   [00:01:03.000] Open files: 
Info 31   [00:01:04.000] 	FileName: /a/b/controllers/vessels/client.ts ProjectRootPath: undefined
Info 31   [00:01:05.000] 		Projects: /a/b/tsconfig.json
Info 31   [00:01:06.000] 	FileName: /a/b/models/vessel.ts ProjectRootPath: undefined
Info 31   [00:01:07.000] 		Projects: /a/b/tsconfig.json
Info 31   [00:01:08.000] response:
    {
      "responseRequired": false
    }
After request

PolledWatches::
/a/lib/lib.es6.d.ts:
  {"pollingInterval":500}
/a/b/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/b/tsconfig.json:
  {}
/a/b/utils/db.ts:
  {}

FsWatches *deleted*::
/a/b/models/vessel.ts:
  {}

FsWatchesRecursive::
/a/b:
  {}

Info 32   [00:01:09.000] fileExists:: [{"key":"/a/b/models/tsconfig.json","count":1},{"key":"/a/b/models/jsconfig.json","count":1}]
Info 33   [00:01:10.000] directoryExists:: []
Info 34   [00:01:11.000] getDirectories:: []
Info 35   [00:01:12.000] readFile:: []
Info 36   [00:01:13.000] readDirectory:: []