currentDirectory:: / useCaseSensitiveFileNames: true
Info 0    [00:00:25.000] Provided types map file "/typesMap.json" doesn't exist
Creating project service
//// [/user/username/projects/myproject/src/server/index.ts]
let x = 1

//// [/user/username/projects/myproject/src/server/tsconfig.json]
{"compiler":{"module":"commonjs","outDir":"../../build"},"include":["../src/**/*.ts"]}

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


Info 1    [00:00:26.000] Search path: /user/username/projects/myproject/src/server
Info 2    [00:00:27.000] For info: /user/username/projects/myproject/src/server/index.ts :: Config file name: /user/username/projects/myproject/src/server/tsconfig.json
Info 3    [00:00:28.000] Creating configuration project /user/username/projects/myproject/src/server/tsconfig.json
Info 4    [00:00:29.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/tsconfig.json 2000 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Config file
Info 5    [00:00:30.000] Config: /user/username/projects/myproject/src/server/tsconfig.json : {
 "rootNames": [],
 "options": {
  "configFilePath": "/user/username/projects/myproject/src/server/tsconfig.json"
 }
}
Info 6    [00:00:31.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/src 1 undefined Config: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Wild card directory
Info 7    [00:00:32.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/src 1 undefined Config: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Wild card directory
Info 8    [00:00:33.000] Starting updateGraphWorker: Project: /user/username/projects/myproject/src/server/tsconfig.json
Info 9    [00:00:34.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 10   [00:00:35.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 11   [00:00:36.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 12   [00:00:37.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 13   [00:00:38.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 14   [00:00:39.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /user/username/projects/myproject/src/server/tsconfig.json WatchType: Type roots
Info 15   [00:00:40.000] Finishing updateGraphWorker: Project: /user/username/projects/myproject/src/server/tsconfig.json Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 16   [00:00:41.000] Project '/user/username/projects/myproject/src/server/tsconfig.json' (Configured)
Info 17   [00:00:42.000] 	Files (0)

Info 18   [00:00:43.000] -----------------------------------------------
Info 19   [00:00:44.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 20   [00:00:45.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 21   [00:00:46.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 22   [00:00:47.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 23   [00:00:48.000] FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/jsconfig.json 2000 undefined WatchType: Config file for the inferred project root
Info 24   [00:00:49.000] Starting updateGraphWorker: Project: /dev/null/inferredProject1*
Info 25   [00:00:50.000] FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 500 undefined WatchType: Closed Script info
Info 26   [00:00:51.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 27   [00:00:52.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/server/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 28   [00:00:53.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 29   [00:00:54.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 30   [00:00:55.000] DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 31   [00:00:56.000] Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Project: /dev/null/inferredProject1* WatchType: Type roots
Info 32   [00:00:57.000] Finishing updateGraphWorker: Project: /dev/null/inferredProject1* Version: 1 structureChanged: true structureIsReused:: Not Elapsed:: *ms
Info 33   [00:00:58.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 34   [00:00:59.000] 	Files (2)
	/a/lib/lib.d.ts Text-1 "/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }"
	/user/username/projects/myproject/src/server/index.ts SVC-1-0 "let x = 1"


	../../../../../../a/lib/lib.d.ts
	  Default library for target 'es5'
	index.ts
	  Root file specified for compilation

Info 35   [00:01:00.000] -----------------------------------------------
Info 36   [00:01:01.000] Project '/user/username/projects/myproject/src/server/tsconfig.json' (Configured)
Info 36   [00:01:02.000] 	Files (0)

Info 36   [00:01:03.000] -----------------------------------------------
Info 36   [00:01:04.000] Project '/dev/null/inferredProject1*' (Inferred)
Info 36   [00:01:05.000] 	Files (2)

Info 36   [00:01:06.000] -----------------------------------------------
Info 36   [00:01:07.000] Open files: 
Info 36   [00:01:08.000] 	FileName: /user/username/projects/myproject/src/server/index.ts ProjectRootPath: undefined
Info 36   [00:01:09.000] 		Projects: /dev/null/inferredProject1*