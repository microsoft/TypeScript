currentDirectory:: / useCaseSensitiveFileNames: false
Info 0    [00:00:15.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/a/b/main.ts]
let x =1;

//// [/a/b/tsconfig.json]
{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }

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
Info 2    [00:00:17.000] For info: /a/b/main.ts :: Config file name: /a/b/tsconfig.json
Info 3    [00:00:18.000] Creating configuration project /a/b/tsconfig.json
Info 4    [00:00:19.000] FileWatcher:: Added:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 5    [00:00:20.000] Config: /a/b/tsconfig.json : {
 "rootNames": [
  "/a/b/main.ts"
 ],
 "options": {
  "target": 2,
  "configFilePath": "/a/b/tsconfig.json"
 }
}
Info 6    [00:00:21.000] Starting updateGraphWorker: Project: /a/b/tsconfig.json
Info 7    [00:00:22.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 8    [00:00:23.000] DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 9    [00:00:24.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 10   [00:00:25.000] Finishing updateGraphWorker: Project: /a/b/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 11   [00:00:26.000] Project '/a/b/tsconfig.json' (Configured)
Info 12   [00:00:27.000] 	Files (1)
	/a/b/main.ts SVC-1-0 "let x =1;"


	main.ts
	  Part of 'files' list in tsconfig.json

Info 13   [00:00:28.000] -----------------------------------------------
Info 14   [00:00:29.000] Project '/a/b/tsconfig.json' (Configured)
Info 14   [00:00:30.000] 	Files (1)

Info 14   [00:00:31.000] -----------------------------------------------
Info 14   [00:00:32.000] Open files: 
Info 14   [00:00:33.000] 	FileName: /a/b/main.ts ProjectRootPath: undefined
Info 14   [00:00:34.000] 		Projects: /a/b/tsconfig.json
Configured project: /a/b/tsconfig.json hasOpenRef:: true isClosed: false
Info 14   [00:00:35.000] FileWatcher:: Added:: WatchInfo: /a/b/main.ts 500 undefined WatchType: Closed Script info
Info 15   [00:00:36.000] Project '/a/b/tsconfig.json' (Configured)
Info 15   [00:00:37.000] 	Files (1)

Info 15   [00:00:38.000] -----------------------------------------------
Info 15   [00:00:39.000] Open files: 
Configured project: /a/b/tsconfig.json hasOpenRef:: false isClosed: false
Info 15   [00:00:40.000] Search path: /a/lib
Info 16   [00:00:41.000] For info: /a/lib/lib.d.ts :: No config files found.
Info 17   [00:00:42.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 18   [00:00:43.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 19   [00:00:44.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 20   [00:00:45.000] 	Files (1)
	/a/lib/lib.d.ts SVC-1-0 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"


	a/lib/lib.d.ts
	  Root file specified for compilation

Info 21   [00:00:46.000] -----------------------------------------------
Info 22   [00:00:47.000] `remove Project::
Info 23   [00:00:48.000] Project '/a/b/tsconfig.json' (Configured)
Info 24   [00:00:49.000] 	Files (1)
	/a/b/main.ts


	main.ts
	  Part of 'files' list in tsconfig.json

Info 25   [00:00:50.000] -----------------------------------------------
Info 26   [00:00:51.000] FileWatcher:: Close:: WatchInfo: /a/b/tsconfig.json 2000 undefined Project: /a/b/tsconfig.json WatchType: Config file
Info 27   [00:00:52.000] DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 28   [00:00:53.000] Elapsed:: *ms DirectoryWatcher:: Close:: WatchInfo: /a/b/node_modules/@types 1 undefined Project: /a/b/tsconfig.json WatchType: Type roots
Info 29   [00:00:54.000] FileWatcher:: Close:: WatchInfo: /a/lib/lib.es6.d.ts 500 undefined Project: /a/b/tsconfig.json WatchType: Missing file
Info 30   [00:00:55.000] FileWatcher:: Close:: WatchInfo: /a/b/main.ts 500 undefined WatchType: Closed Script info
Info 31   [00:00:56.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 31   [00:00:57.000] 	Files (1)

Info 31   [00:00:58.000] -----------------------------------------------
Info 31   [00:00:59.000] Open files: 
Info 31   [00:01:00.000] 	FileName: /a/lib/lib.d.ts ProjectRootPath: undefined
Info 31   [00:01:01.000] 		Projects: /dev/null/inferredProject1*