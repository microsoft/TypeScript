currentDirectory:: / useCaseSensitiveFileNames: true
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

//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/a.ts]
let y = 10;


Info 1    [00:00:22.000] Search path: ^walkThroughSnippet:/Users/UserName/projects/someProject/out
Info 2    [00:00:23.000] For info: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js :: No config files found.
Info 3    [00:00:24.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 5    [00:00:26.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 6    [00:00:27.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 7    [00:00:28.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js SVC-1-0 "var x = 10;"


	a/lib/lib.d.ts
	  Default library for target 'es5'
	^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js
	  Root file specified for compilation

Info 8    [00:00:29.000] -----------------------------------------------
Info 9    [00:00:30.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 9    [00:00:31.000] 	Files (2)

Info 9    [00:00:32.000] -----------------------------------------------
Info 9    [00:00:33.000] Open files: 
Info 9    [00:00:34.000] 	FileName: ^walkThroughSnippet:/Users/UserName/projects/someProject/out/someFile#2.js ProjectRootPath: undefined
Info 9    [00:00:35.000] 		Projects: /dev/null/inferredProject1*