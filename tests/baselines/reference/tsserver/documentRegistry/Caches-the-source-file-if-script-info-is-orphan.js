currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/index.ts]
import {a} from "./module1"

//// [/user/username/projects/myproject/module1.d.ts]
export const a: number;

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

//// [/user/username/projects/myproject/tsconfig.json]
{"files":["index.ts"]}


Info 1    [00:00:24.000] Search path: /user/username/projects/myproject
Info 2    [00:00:25.000] For info: /user/username/projects/myproject/index.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/index.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:29.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 7    [00:00:30.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 8    [00:00:31.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Failed Lookup Locations
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/module1.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:38.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/module1.d.ts Text-1 "export const a: number;"
	/user/username/projects/myproject/index.ts SVC-1-0 "import {a} from \"./module1\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	module1.d.ts
	  Imported via "./module1" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 16   [00:00:39.000] -----------------------------------------------
Info 17   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:41.000] 	Files (3)

Info 17   [00:00:42.000] -----------------------------------------------
Info 17   [00:00:43.000] Open files: 
Info 17   [00:00:44.000] 	FileName: /user/username/projects/myproject/index.ts ProjectRootPath: undefined
Info 17   [00:00:45.000] 		Projects: /user/username/projects/myproject/tsconfig.json
Info 17   [00:00:46.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 18   [00:00:47.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 2 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 19   [00:00:48.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 20   [00:00:49.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/index.ts SVC-1-1 ""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 21   [00:00:50.000] -----------------------------------------------
Info 22   [00:00:51.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 23   [00:00:52.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 3 structureChanged: true structureIsReused:: SafeModules Elapsed:: *ms
Info 24   [00:00:53.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 25   [00:00:54.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/module1.d.ts Text-1 "export const a: number;"
	/user/username/projects/myproject/index.ts SVC-1-2 "import {a} from \"./module1\""


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	module1.d.ts
	  Imported via "./module1" from file 'index.ts'
	index.ts
	  Part of 'files' list in tsconfig.json

Info 26   [00:00:55.000] -----------------------------------------------