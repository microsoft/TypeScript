currentDirectory:: / useCaseSensitiveFileNames: false
Info seq  [hh:mm:ss:mss] Provided types map file "/typesMap.json" doesn't exist
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


Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/file.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/^app.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] Starting updateGraphWorker: Project: /user/username/projects/myproject/myproject.njsproj
Info seq  [hh:mm:ss:mss] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info seq  [hh:mm:ss:mss] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/myproject.njsproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/myproject.njsproj WatchType: Type roots
Info seq  [hh:mm:ss:mss] Finishing updateGraphWorker: Project: /user/username/projects/myproject/myproject.njsproj Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info seq  [hh:mm:ss:mss] Project '/user/username/projects/myproject/myproject.njsproj' (External)
Info seq  [hh:mm:ss:mss] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/file.ts Text-1 "const x = 10;"
	/user/username/projects/myproject/^app.ts Text-1 "const y = 10;"


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	file.ts
	  Root file specified for compilation
	^app.ts
	  Root file specified for compilation

Info seq  [hh:mm:ss:mss] -----------------------------------------------