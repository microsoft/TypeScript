Info 0    [00:00:21.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/app.ts]

                import {f} from "./module"
                console.log(f)
                

//// [/user/username/projects/myproject/module.d.ts]
export let x: number

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


Info 1    [00:00:22.000] Search path: /user/username/projects/myproject
Info 2    [00:00:23.000] For info: /user/username/projects/myproject/app.ts :: No config files found.
Info 3    [00:00:24.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 4    [00:00:25.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 5    [00:00:26.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 6    [00:00:27.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 7    [00:00:28.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 0 undefined Project: /dev/null/inferredProject1* WatchType: Failed Lookup Locations
Info 8    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/module.d.ts 500 undefined WatchType: Closed Script info
Info 9    [00:00:30.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 10   [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 11   [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 12   [00:00:33.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 13   [00:00:34.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 14   [00:00:35.000] 	Files (3)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/module.d.ts Text-1 "export let x: number"
	/user/username/projects/myproject/app.ts SVC-1-0 "\n                import {f} from \"./module\"\n                console.log(f)\n                "


	../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	module.d.ts
	  Imported via "./module" from file 'app.ts'
	app.ts
	  Root file specified for compilation

Info 15   [00:00:36.000] -----------------------------------------------
Info 16   [00:00:37.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 16   [00:00:38.000] 	Files (3)

Info 16   [00:00:39.000] -----------------------------------------------
Info 16   [00:00:40.000] Open files: 
Info 16   [00:00:41.000] 	FileName: /user/username/projects/myproject/app.ts ProjectRootPath: undefined
Info 16   [00:00:42.000] 		Projects: /dev/null/inferredProject1*