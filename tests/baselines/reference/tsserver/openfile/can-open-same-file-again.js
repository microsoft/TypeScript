currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/someuser/projects/myproject/src/a.ts]
export const x = 0;

//// [/user/someuser/projects/myproject/tsconfig.json]
{}

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


Info 1    [00:00:24.000] Search path: /user/someuser/projects/myproject/src
Info 2    [00:00:25.000] For info: /user/someuser/projects/myproject/src/a.ts :: Config file name: /user/someuser/projects/myproject/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /user/someuser/projects/myproject/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/someuser/projects/myproject/tsconfig.json 2000 undefined Project: /user/someuser/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /user/someuser/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/someuser/projects/myproject/src/a.ts"
 ],
 "options": {
  "configFilePath": "/user/someuser/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/myproject 1 undefined Config: /user/someuser/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/myproject 1 undefined Config: /user/someuser/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] Starting updateGraphWorker: Project: /user/someuser/projects/myproject/tsconfig.json
Info 9    [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:33.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/myproject/node_modules/@types 1 undefined Project: /user/someuser/projects/myproject/tsconfig.json WatchType: Type roots
Info 11   [00:00:34.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/projects/myproject/node_modules/@types 1 undefined Project: /user/someuser/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] Finishing updateGraphWorker: Project: /user/someuser/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:36.000] Project '/user/someuser/projects/myproject/tsconfig.json' (Configured)
Info 14   [00:00:37.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/someuser/projects/myproject/src/a.ts SVC-1-0 "export const x = 0;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	src/a.ts
	  Matched by default include pattern '**/*'

Info 15   [00:00:38.000] -----------------------------------------------
Info 16   [00:00:39.000] Project '/user/someuser/projects/myproject/tsconfig.json' (Configured)
Info 16   [00:00:40.000] 	Files (2)

Info 16   [00:00:41.000] -----------------------------------------------
Info 16   [00:00:42.000] Open files: 
Info 16   [00:00:43.000] 	FileName: /user/someuser/projects/myproject/src/a.ts ProjectRootPath: /user/someuser/projects/myproject
Info 16   [00:00:44.000] 		Projects: /user/someuser/projects/myproject/tsconfig.json
aFileContent: export const x = 0;
Info 16   [00:00:45.000] Starting updateGraphWorker: Project: /user/someuser/projects/myproject/tsconfig.json
Info 17   [00:00:46.000] Finishing updateGraphWorker: Project: /user/someuser/projects/myproject/tsconfig.json Version: 2 structureChanged: false structureIsReused:: Completely Elapsed:: *ms
Info 18   [00:00:47.000] Project '/user/someuser/projects/myproject/tsconfig.json' (Configured)
Info 19   [00:00:48.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/someuser/projects/myproject/src/a.ts SVC-2-0 "export const x = 0;export const y = 10;"

Info 20   [00:00:49.000] -----------------------------------------------
Info 21   [00:00:50.000] Project '/user/someuser/projects/myproject/tsconfig.json' (Configured)
Info 21   [00:00:51.000] 	Files (2)

Info 21   [00:00:52.000] -----------------------------------------------
Info 21   [00:00:53.000] Open files: 
Info 21   [00:00:54.000] 	FileName: /user/someuser/projects/myproject/src/a.ts ProjectRootPath: /user/someuser/projects/myproject
Info 21   [00:00:55.000] 		Projects: /user/someuser/projects/myproject/tsconfig.json
aFileContent: export const x = 0;export const y = 10;