currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:23.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/file.ts]
const x = 10;

//// [/user/username/projects/myproject/^app.ts]
const y = 10;

//// [/user/username/projects/myproject/tsconfig.json]
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


Info 1    [00:00:24.000] Search path: /user/username/projects/myproject
Info 2    [00:00:25.000] For info: /user/username/projects/myproject/file.ts :: Config file name: /user/username/projects/myproject/tsconfig.json
Info 3    [00:00:26.000] Creating configuration project /user/username/projects/myproject/tsconfig.json
Info 4    [00:00:27.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Config file
Info 5    [00:00:28.000] Config: /user/username/projects/myproject/tsconfig.json : {
 "rootNames": [
  "/user/username/projects/myproject/^app.ts",
  "/user/username/projects/myproject/file.ts"
 ],
 "options": {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
 }
}
Info 6    [00:00:29.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:30.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Config: /user/username/projects/myproject/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:31.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/^app.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:32.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json
Info 10   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 11   [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 12   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/tsconfig.json WatchType: Type roots
Info 13   [00:00:36.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 14   [00:00:37.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 15   [00:00:38.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/^app.ts Text-1 "const y = 10;"
	/user/username/projects/myproject/file.ts SVC-1-0 "const x = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	^app.ts
	  Matched by default include pattern '**/*'
	file.ts
	  Matched by default include pattern '**/*'

Info 16   [00:00:39.000] -----------------------------------------------
Info 17   [00:00:40.000] Project '/user/username/projects/myproject/tsconfig.json' (Configured)
Info 17   [00:00:41.000] 	Files (3)

Info 17   [00:00:42.000] -----------------------------------------------
Info 17   [00:00:43.000] Open files: 
Info 17   [00:00:44.000] 	FileName: /user/username/projects/myproject/file.ts ProjectRootPath: undefined
Info 17   [00:00:45.000] 		Projects: /user/username/projects/myproject/tsconfig.json