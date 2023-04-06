currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/file.ts]
const x = 10;

//// [/user/username/projects/myproject/^app.ts]
const y = 10;

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


Info 1    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file.ts 500 undefined WatchType: Closed Script info
Info 2    [00:00:23.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/^app.ts 500 undefined WatchType: Closed Script info
Info 3    [00:00:24.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/myproject.njsproj
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:26.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/myproject.njsproj WatchType: Type roots
Info 6    [00:00:27.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/myproject.njsproj WatchType: Type roots
Info 7    [00:00:28.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/myproject.njsproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:29.000] Project '/user/username/projects/myproject/myproject.njsproj' (External)
Info 9    [00:00:30.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file.ts Text-1 "const x = 10;"
	/user/username/projects/myproject/^app.ts Text-1 "const y = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file.ts
	  Root file specified for compilation
	^app.ts
	  Root file specified for compilation

Info 10   [00:00:31.000] -----------------------------------------------