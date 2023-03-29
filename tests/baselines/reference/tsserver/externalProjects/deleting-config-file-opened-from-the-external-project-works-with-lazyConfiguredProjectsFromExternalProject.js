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
Info 3    [00:00:25.000] FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 4    [00:00:26.000] `remove Project::
Info 5    [00:00:27.000] Project '/user/someuser/project/tsconfig.json' (Configured)
Info 6    [00:00:28.000] 	Files (0) InitialLoadPending

Info 7    [00:00:29.000] -----------------------------------------------
Info 8    [00:00:30.000] FileWatcher:: Close:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 9    [00:00:31.000] Elapsed:: *ms FileWatcher:: Triggered with /user/someuser/project/tsconfig.json 2:: WatchInfo: /user/someuser/project/tsconfig.json 2000 undefined Project: /user/someuser/project/tsconfig.json WatchType: Config file
Info 10   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /user/someuser/project/js/site.js 500 undefined WatchType: Closed Script info
Info 11   [00:00:33.000] Starting updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj
Info 12   [00:00:34.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:35.000] DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info 14   [00:00:36.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/someuser/project/node_modules/@types 1 undefined Project: /user/someuser/project/WebApplication6.csproj WatchType: Type roots
Info 15   [00:00:37.000] Finishing updateGraphWorker: Project: /user/someuser/project/WebApplication6.csproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:38.000] Project '/user/someuser/project/WebApplication6.csproj' (External)
Info 17   [00:00:39.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/someuser/project/js/site.js Text-1 ""


	../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	js/site.js
	  Root file specified for compilation

Info 18   [00:00:40.000] -----------------------------------------------