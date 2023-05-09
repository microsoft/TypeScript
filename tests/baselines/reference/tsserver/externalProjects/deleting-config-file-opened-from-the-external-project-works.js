currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] Creating configuration project /user/someuser/project/tsconfig.json
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] Config: /user/someuser/project/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/someuser/project/tsconfig.json"
 }
}
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/someuser/project/tsconfig.json
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/someuser/project/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/someuser/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)

Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] `remove Project::
Info seq  [hh:mm:ss:mss] Project '/user/someuser/project/tsconfig.json' (Configured)
Info seq  [hh:mm:ss:mss] 	Files (0)



Info seq  [hh:mm:ss:mss] -----------------------------------------------
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project 1 undefined Config: /user/someuser/project/tsconfig.json WatchType: Wild card directory
Info seq  [hh:mm:ss:mss] FileWatcher:: Close:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/tsconfig.json WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/someuser/project/js/site.js 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/someuser/project/WebApplication6.csproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/someuser/project/js/site.js Text-1 ""


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	js/site.js
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------