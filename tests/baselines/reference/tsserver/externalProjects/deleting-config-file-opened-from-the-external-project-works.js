currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
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

//// [/user/someuser/project/js/site.js]


//// [/user/someuser/project/tsconfig.json]
{}


Info 1    [00:00:22.000] Creating configuration project /user/someuser/project/tsconfig.json
Info 2    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 3    [00:00:24.000] Config: /user/someuser/project/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/someuser/project/tsconfig.json"
 }
}
Info 4    [00:00:25.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info 5    [00:00:26.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info 6    [00:00:27.000] Starting updateGraphWorker: Project: /user/someuser/project/tsconfig.json
Info 7    [00:00:28.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info 8    [00:00:29.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info 9    [00:00:30.000] Finishing updateGraphWorker: Project: /user/someuser/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 10   [00:00:31.000] Project '/user/someuser/project/tsconfig.json' (Configured)
Info 11   [00:00:32.000] 	Files (0)

Info 12   [00:00:33.000] -----------------------------------------------
Info 13   [00:00:35.000] FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 14   [00:00:36.000] `remove Project::
Info 15   [00:00:37.000] Project '/user/someuser/project/tsconfig.json' (Configured)
Info 16   [00:00:38.000] 	Files (0)



Info 17   [00:00:39.000] -----------------------------------------------
Info 18   [00:00:40.000] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info 19   [00:00:41.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info 20   [00:00:42.000] FileWatcher:: Close:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 21   [00:00:43.000] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info 22   [00:00:44.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info 23   [00:00:45.000] Elapsed:: *ms FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 24   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /user/someuser/project/js/site.js 500 undefined WatchType: Closed Script info
Info 25   [00:00:47.000] Starting updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj
Info 26   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 27   [00:00:49.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info 28   [00:00:50.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info 29   [00:00:51.000] Finishing updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 30   [00:00:52.000] Project '/user/someuser/project/WebApplication6.csproj' (External)
Info 31   [00:00:53.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/someuser/project/js/site.js Text-1 ""


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	js/site.js
	  Root file specified for compilation

Info 32   [00:00:54.000] -----------------------------------------------