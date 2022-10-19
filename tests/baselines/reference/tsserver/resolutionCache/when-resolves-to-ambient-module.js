Info 0    [00:00:33.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/typings/node.d.ts]

declare module "fs" {
    export interface something {
    }
}

//// [/user/username/projects/myproject/src/typings/electron.d.ts]

declare module 'original-fs' {
    import * as fs from 'fs';
    export = fs;
}

//// [/user/username/projects/myproject/src/somefolder/srcfile.ts]

import { x } from "somefolder/module1";
import { x } from "somefolder/module2";
const y = x;

//// [/user/username/projects/myproject/src/somefolder/module1.ts]

export const x = 10;

//// [/user/username/projects/myproject/src/tsconfig.json]
{"compilerOptions":{"module":"amd","moduleResolution":"classic","target":"es5","outDir":"../out","baseUrl":"./","typeRoots":["typings"]}}

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


PolledWatches::

FsWatches::

FsWatchesRecursive::

Info 1    [00:00:34.000] Search path: /user/username/projects/myproject/src/somefolder
Info 2    [00:00:35.000] For info: /user/username/projects/myproject/src/somefolder/srcfile.ts :: Config file name: /user/username/projects/myproject/src/tsconfig.json
Info 3    [00:00:36.000] Creating configuration project /user/username/projects/myproject/src/tsconfig.json
Info 4    [00:00:37.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Config file
Info 5    [00:00:38.000] Config: /user/username/projects/myproject/src/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/src/somefolder/module1.ts",
  "/user/username/projects/myproject/src/somefolder/srcfile.ts",
  "/user/username/projects/myproject/src/typings/electron.d.ts",
  "/user/username/projects/myproject/src/typings/node.d.ts"
 ],
 "options": {
  "module": 2,
  "moduleResolution": 1,
  "target": 1,
  "outDir": "/user/username/projects/myproject/out",
  "baseUrl": "/user/username/projects/myproject/src",
  "typeRoots": [
   "/user/username/projects/myproject/src/typings"
  ],
  "configFilePath": "/user/username/projects/myproject/src/tsconfig.json"
 }
}
Info 6    [00:00:39.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:40.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Config: /user/username/projects/myproject/src/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:41.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder/module1.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:42.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings/electron.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:43.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings/node.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:44.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json
Info 12   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:46.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 14   [00:00:47.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 15   [00:00:48.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 16   [00:00:49.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/somefolder 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 17   [00:00:50.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 18   [00:00:51.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 19   [00:00:52.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 20   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Failed Lookup Locations
Info 21   [00:00:54.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 22   [00:00:55.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/typings 1 undefined Project: /user/username/projects/myproject/src/tsconfig.json WatchType: Type roots
Info 23   [00:00:56.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 24   [00:00:57.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 25   [00:00:58.000] 	Files (5)
	/a/lib/lib.d.ts
	/user/username/projects/myproject/src/somefolder/module1.ts
	/user/username/projects/myproject/src/somefolder/srcfile.ts
	/user/username/projects/myproject/src/typings/electron.d.ts
	/user/username/projects/myproject/src/typings/node.d.ts


	../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	somefolder/module1.ts
	  Matched by default include pattern '**/*'
	  Imported via "somefolder/module1" from file 'somefolder/srcfile.ts'
	somefolder/srcfile.ts
	  Matched by default include pattern '**/*'
	typings/electron.d.ts
	  Matched by default include pattern '**/*'
	typings/node.d.ts
	  Matched by default include pattern '**/*'

Info 26   [00:00:59.000] -----------------------------------------------
Info 27   [00:01:00.000] Project '/user/username/projects/myproject/src/tsconfig.json' (Configured)
Info 27   [00:01:01.000] 	Files (5)

Info 27   [00:01:02.000] -----------------------------------------------
Info 27   [00:01:03.000] Open files: 
Info 27   [00:01:04.000] 	FileName: /user/username/projects/myproject/src/somefolder/srcfile.ts ProjectRootPath: /user/username/projects/myproject
Info 27   [00:01:05.000] 		Projects: /user/username/projects/myproject/src/tsconfig.json