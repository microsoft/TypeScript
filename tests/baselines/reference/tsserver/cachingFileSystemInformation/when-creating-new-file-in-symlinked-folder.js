currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:31.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/client/folder1/module1.ts]
export class Module1Class { }

//// [/user/username/projects/myproject/folder2/module2.ts]
import * as M from "folder1/module1";

//// [/user/username/projects/myproject/client/linktofolder2] symlink(/user/username/projects/myproject/folder2)
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"baseUrl":"client","paths":{"*":["*"]}},"include":["client/**/*","folder2"]}

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


Info 1    [00:00:32.000] Search path: /user/username/projects/myproject/client/linktofolder2
Info 2    [00:00:33.000] For info: /user/username/projects/myproject/client/linktofolder2/module2.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:34.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:35.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:36.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/client/folder1/module1.ts",
  "/user/username/projects/myproject/client/linktofolder2/module2.ts"
 ],
 "options": {
  "baseUrl": "/user/username/projects/myproject/client",
  "paths": {
   "*": [
    "*"
   ]
  },
  "pathsBasePath": "/user/username/projects/myproject",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:37.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:38.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 9    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 10   [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client/folder1/module1.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:42.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 12   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:44.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 14   [00:00:45.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 15   [00:00:46.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:47.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:48.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/client/folder1/module1.ts Text-1 "export class Module1Class { }"
	/user/username/projects/myproject/client/linktofolder2/module2.ts SVC-1-0 "import * as M from \"folder1/module1\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	client/folder1/module1.ts
	  Matched by include pattern 'client/**/*' in 'tsconfig.json'
	  Imported via "folder1/module1" from file 'client/linktofolder2/module2.ts'
	client/linktofolder2/module2.ts
	  Matched by include pattern 'client/**/*' in 'tsconfig.json'

Info 18   [00:00:49.000] -----------------------------------------------
Info 19   [00:00:50.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 19   [00:00:51.000] 	Files (3)

Info 19   [00:00:52.000] -----------------------------------------------
Info 19   [00:00:53.000] Open files: 
Info 19   [00:00:54.000] 	FileName: /user/username/projects/myproject/client/linktofolder2/module2.ts ProjectRootPath: undefined
Info 19   [00:00:55.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 19   [00:00:59.000] DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.ts :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 20   [00:01:00.000] Scheduled: /user/username/projects/myproject/tsconfig.json
Info 21   [00:01:01.000] Scheduled: *ensureProjectForOpenFiles*
Info 22   [00:01:02.000] Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.ts :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Before running Timeout callback:: count: 2
1: /user/username/projects/myproject/tsconfig.json
2: *ensureProjectForOpenFiles*
//// [/user/username/projects/myproject/folder2/module3.ts]
import * as M from "folder1/module1";


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/client/folder1/module1.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/client: *new*
  {}
/user/username/projects/myproject/folder2: *new*
  {}

Info 23   [00:01:03.000] Running: /user/username/projects/myproject/tsconfig.json
Info 24   [00:01:04.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client/linktofolder2/module3.ts 500 undefined WatchType: Closed Script info
Info 25   [00:01:05.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 26   [00:01:06.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 27   [00:01:07.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 28   [00:01:08.000] 	Files (4)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/client/folder1/module1.ts Text-1 "export class Module1Class { }"
	/user/username/projects/myproject/client/linktofolder2/module2.ts SVC-1-0 "import * as M from \"folder1/module1\";"
	/user/username/projects/myproject/client/linktofolder2/module3.ts Text-1 "import * as M from \"folder1/module1\";"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	client/folder1/module1.ts
	  Matched by include pattern 'client/**/*' in 'tsconfig.json'
	  Imported via "folder1/module1" from file 'client/linktofolder2/module2.ts'
	  Imported via "folder1/module1" from file 'client/linktofolder2/module3.ts'
	client/linktofolder2/module2.ts
	  Matched by include pattern 'client/**/*' in 'tsconfig.json'
	client/linktofolder2/module3.ts
	  Matched by include pattern 'client/**/*' in 'tsconfig.json'

Info 29   [00:01:09.000] -----------------------------------------------
Info 30   [00:01:10.000] Running: *ensureProjectForOpenFiles*
Info 31   [00:01:11.000] Before ensureProjectForOpenFiles:
Info 32   [00:01:12.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 32   [00:01:13.000] 	Files (4)

Info 32   [00:01:14.000] -----------------------------------------------
Info 32   [00:01:15.000] Open files: 
Info 32   [00:01:16.000] 	FileName: /user/username/projects/myproject/client/linktofolder2/module2.ts ProjectRootPath: undefined
Info 32   [00:01:17.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 32   [00:01:18.000] After ensureProjectForOpenFiles:
Info 33   [00:01:19.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 33   [00:01:20.000] 	Files (4)

Info 33   [00:01:21.000] -----------------------------------------------
Info 33   [00:01:22.000] Open files: 
Info 33   [00:01:23.000] 	FileName: /user/username/projects/myproject/client/linktofolder2/module2.ts ProjectRootPath: undefined
Info 33   [00:01:24.000] 		Projects: /user/username/projects/myproject/tsconfig.json
After running Timeout callback:: count: 0

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/client/folder1/module1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/client/linktofolder2/module3.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/client:
  {}
/user/username/projects/myproject/folder2:
  {}
