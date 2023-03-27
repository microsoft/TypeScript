currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

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


Info 1    [00:00:16.000] Search path: /a/b
Info 2    [00:00:17.000] For info: /a/b/commonFile1.ts :: No config files found.
Info 3    [00:00:18.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:20.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 6    [00:00:21.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 7    [00:00:22.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 8    [00:00:23.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:24.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/a/b/commonFile1.ts SVC-1-0 "let x = 1"


	../lib/lib.d.ts
	  Default library for target 'es5'
	commonFile1.ts
	  Root file specified for compilation

Info 10   [00:00:25.000] -----------------------------------------------
Info 11   [00:00:26.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 11   [00:00:27.000] 	Files (2)

Info 11   [00:00:28.000] -----------------------------------------------
Info 11   [00:00:29.000] Open files: 
Info 11   [00:00:30.000] 	FileName: /a/b/commonFile1.ts ProjectRootPath: undefined
Info 11   [00:00:31.000] 		Projects: /dev/null/inferredProject1*
Info 11   [00:00:32.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile2.ts 500 undefined WatchType: Closed Script info
Info 12   [00:00:33.000] FileWatcher:: Added:: WatchInfo: /a/b/commonFile1.ts 500 undefined WatchType: Closed Script info
Info 13   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 13   [00:00:35.000] 	Files (2)

Info 13   [00:00:36.000] -----------------------------------------------
Info 13   [00:00:37.000] Open files: 